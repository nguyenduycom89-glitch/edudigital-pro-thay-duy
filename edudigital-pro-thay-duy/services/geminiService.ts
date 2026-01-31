// src/services/geminiService.ts
import { GoogleGenAI, Type } from "@google/genai";
import type { LessonInput, LessonPlan } from "../types";

/**
 * Vite exposes env vars only via import.meta.env and only if prefixed with VITE_
 * -> Set VITE_GEMINI_API_KEY in Vercel Environment Variables
 */
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;

/** Friendly, non-technical error for UI */
export class GeminiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiConfigError";
  }
}

export class GeminiResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiResponseError";
  }
}

function getClient(): GoogleGenAI {
  if (!API_KEY || !API_KEY.trim()) {
    // Do not crash with cryptic SDK error; throw a clear message
    throw new GeminiConfigError(
      "Thiếu API Key Gemini. Hãy cấu hình biến môi trường VITE_GEMINI_API_KEY trên Vercel (Settings → Environment Variables) và redeploy."
    );
  }
  return new GoogleGenAI({ apiKey: API_KEY.trim() });
}

/** Remove ```json fences and extract the first valid JSON object if extra text exists */
function extractJsonObject(raw: string): string {
  const text = raw.trim();

  // Remove markdown fences if present
  const unfenced = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  // If it's already a pure JSON object
  if (unfenced.startsWith("{") && unfenced.endsWith("}")) return unfenced;

  // Otherwise, try to find the first {...} block
  const firstBrace = unfenced.indexOf("{");
  const lastBrace = unfenced.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return unfenced.slice(firstBrace, lastBrace + 1);
  }

  // Give up with explicit error
  throw new GeminiResponseError(
    "AI trả về dữ liệu không đúng định dạng JSON. Hãy thử lại hoặc đổi prompt ngắn hơn."
  );
}

/** Basic shape hardening so downstream UI won't crash */
function normalizeLessonPlan(parsed: any, input: LessonInput): LessonPlan {
  const safe = parsed ?? {};

  const lessonTitle = String(safe.lessonTitle ?? input.lessonTitle ?? "").trim();
  const subject = String(safe.subject ?? input.subject ?? "").trim();
  const duration = String(safe.duration ?? input.duration ?? "").trim();

  if (!lessonTitle || !subject || !duration) {
    throw new GeminiResponseError("Thiếu trường bắt buộc trong JSON (lessonTitle/subject/duration).");
  }

  // Ensure objects/arrays exist
  const objectives = safe.objectives ?? {};
  const preparation = safe.preparation ?? {};
  const activities = Array.isArray(safe.activities) ? safe.activities : [];

  // Minimal defaults to avoid undefined in UI
  const normalized: LessonPlan = {
    ...safe,
    lessonTitle,
    subject,
    duration,
    objectives: {
      specificCapacities: Array.isArray(objectives.specificCapacities) ? objectives.specificCapacities : [],
      generalCapacities: Array.isArray(objectives.generalCapacities) ? objectives.generalCapacities : [],
      qualities: Array.isArray(objectives.qualities) ? objectives.qualities : [],
      digitalInterpretation: String(objectives.digitalInterpretation ?? ""),
    },
    preparation: {
      teacher: Array.isArray(preparation.teacher) ? preparation.teacher : [],
      students: Array.isArray(preparation.students) ? preparation.students : [],
    },
    activities: activities.map((a: any) => ({
      phase: String(a?.phase ?? ""),
      objective: String(a?.objective ?? ""),
      teacherActions: Array.isArray(a?.teacherActions) ? a.teacherActions : [],
      studentActions: Array.isArray(a?.studentActions) ? a.studentActions : [],
      digitalIntegration: {
        toolName: String(a?.digitalIntegration?.toolName ?? ""),
        description: String(a?.digitalIntegration?.description ?? ""),
      },
    })),
    adjustment: String(safe.adjustment ?? ""),
    // App-specific fields:
    id: crypto.randomUUID(),
    grade: input.grade,
    digitalCompetencies: input.digitalCompetencies,
    createdAt: Date.now(),
  };

  return normalized;
}

/** Promise timeout to avoid hanging UI */
function withTimeout<T>(promise: Promise<T>, ms = 60000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("Quá thời gian phản hồi từ AI. Vui lòng thử lại.")), ms);
    promise
      .then((v) => {
        clearTimeout(t);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(t);
        reject(e);
      });
  });
}

export async function generateLessonPlan(input: LessonInput): Promise<LessonPlan> {
  const ai = getClient();

  const systemInstruction = `
Bạn là một Giáo viên Tiểu học ưu tú với 28 năm kinh nghiệm và là chuyên gia chuyển đổi số giáo dục hàng đầu.

NHIỆM VỤ: Tích hợp Năng lực số (NLS) vào Kế hoạch bài dạy (KHBD) theo chuẩn Công văn 2345 và Công văn 3456/BGDĐT-GDPT, bám sát Khung NLS học sinh tiểu học mới nhất (6/2024).

KIẾN THỨC CHUYÊN MÔN (Dựa trên Phụ lục 2 - Gợi ý tình huống sư phạm):
- Khối 1, 2, 3 (Bậc CB1): Ưu tiên các trò chơi trực quan như "Truy tìm kho báu" (tìm kiếm hình ảnh/giọng nói), kể chuyện số đơn giản, làm quen thiết bị cảm ứng, lưu bài bằng biểu tượng.
- Khối 4, 5 (Bậc CB2): Tăng cường tính tự chủ. HS tự nhập từ khóa, phân biệt tin giả/thật, tạo "Viên nang kiến thức" (video ngắn giải thích khái niệm), thảo luận nhóm trên Google Docs/Canva, quản lý "Dấu vết số" (digital footprint).

QUY TẮC CẦN TUÂN THỦ:
- BẮT BUỘC sử dụng các mã chỉ báo NLS Thầy Duy đã chọn: ${input.digitalCompetencies.join(", ")}.
- Triển khai hoạt động theo đúng 4 bước CV 2345: Khởi động, Khám phá, Luyện tập, Vận dụng.
- Trong mỗi bước, phải ghi rõ GV chuyển giao nhiệm vụ gì, HS thao tác thiết bị/phần mềm nào cụ thể.

PHONG CÁCH: Ngôn ngữ sư phạm chuẩn mực, hiện đại, truyền cảm hứng.
  `.trim();

  const prompt = `
Thiết kế/Số hóa bài dạy Platinum v5.5:
- Môn: ${input.subject} | Khối: ${input.grade} | Tên bài: ${input.lessonTitle}
- Thời lượng: ${input.duration}
- Mã chỉ báo NLS trọng tâm (Chuẩn 3456): ${input.digitalCompetencies.join(", ")}
${
  input.oldContent
    ? `- NỘI DUNG GỐC CẦN SỐ HÓA: ${input.oldContent}`
    : "- Soạn mới hoàn toàn bám sát CV 2345 và Khung NLS 6/2024."
}

YÊU CẦU: Trả về JSON chính xác theo schema. Không kèm giải thích ngoài JSON.
  `.trim();

  // NOTE: If "gemini-3-pro-preview" is unavailable for your key/region, switch to a stable model name.
  const modelName = "gemini-2.5-pro"; // bạn có thể đổi lại nếu cần

  const response = await withTimeout(
    ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          reminder: "Trả về JSON đúng schema, không kèm markdown/code fence.",
          type: Type.OBJECT,
          properties: {
            lessonTitle: { type: Type.STRING },
            subject: { type: Type.STRING },
            duration: { type: Type.STRING },
            objectives: {
              type: Type.OBJECT,
              properties: {
                specificCapacities: { type: Type.ARRAY, items: { type: Type.STRING } },
                generalCapacities: { type: Type.ARRAY, items: { type: Type.STRING } },
                qualities: { type: Type.ARRAY, items: { type: Type.STRING } },
                digitalInterpretation: { type: Type.STRING },
              },
              required: ["specificCapacities", "generalCapacities", "qualities", "digitalInterpretation"],
            },
            preparation: {
              type: Type.OBJECT,
              properties: {
                teacher: { type: Type.ARRAY, items: { type: Type.STRING } },
                students: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["teacher", "students"],
            },
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  objective: { type: Type.STRING },
                  teacherActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  studentActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  digitalIntegration: {
                    type: Type.OBJECT,
                    properties: {
                      toolName: { type: Type.STRING },
                      description: { type: Type.STRING },
                    },
                    required: ["toolName", "description"],
                  },
                },
                required: ["phase", "objective", "teacherActions", "studentActions", "digitalIntegration"],
              },
            },
            adjustment: { type: Type.STRING },
          },
          required: ["lessonTitle", "subject", "duration", "objectives", "preparation", "activities", "adjustment"],
        },
      },
    }),
    60000
  );

  const raw = String((response as any)?.text ?? "").trim();
  if (!raw) {
    throw new GeminiResponseError("AI không trả về nội dung. Vui lòng thử lại.");
  }

  const jsonStr = extractJsonObject(raw);

  let parsed: any;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    // Helpful debug hint without leaking key
    throw new GeminiResponseError("Không parse được JSON từ AI. Vui lòng thử lại (hoặc giảm độ dài nội dung gốc).");
  }

  return normalizeLessonPlan(parsed, input);
}
