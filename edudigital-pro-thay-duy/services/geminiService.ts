
import { GoogleGenAI, Type } from "@google/genai";
import { LessonInput, LessonPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (input: LessonInput): Promise<LessonPlan> => {
  const systemInstruction = `
    Bạn là một Giáo viên Tiểu học ưu tú với 28 năm kinh nghiệm và là chuyên gia chuyển đổi số giáo dục hàng đầu.
    
    NHIỆM VỤ: Tích hợp Năng lực số (NLS) vào Kế hoạch bài dạy (KHBD) theo chuẩn Công văn 2345 và Công văn 3456/BGDĐT-GDPT, bám sát Khung NLS học sinh tiểu học mới nhất (6/2024).
    
    KIẾN THỨC CHUYÊN MÔN (Dựa trên Phụ lục 2 - Gợi ý tình huống sư phạm):
    - Khối 1, 2, 3 (Bậc CB1): Ưu tiên các trò chơi trực quan như "Truy tìm kho báu" (tìm kiếm hình ảnh/giọng nói), kể chuyện số đơn giản, làm quen thiết bị cảm ứng, lưu bài bằng biểu tượng.
    - Khối 4, 5 (Bậc CB2): Tăng cường tính tự chủ. HS tự nhập từ khóa, phân biệt tin giả/thật, tạo "Viên nang kiến thức" (video ngắn giải thích khái niệm), thảo luận nhóm trên Google Docs/Canva, quản lý "Dấu vết số" (digital footprint).

    QUY TẮC CẦN TUÂN THỦ:
    - BẮT BUỘC sử dụng các mã chỉ báo NLS Thầy Duy đã chọn: ${input.digitalCompetencies.join(', ')}.
    - Triển khai hoạt động theo đúng 4 bước CV 2345: Khởi động, Khám phá, Luyện tập, Vận dụng.
    - Trong mỗi bước, phải ghi rõ GV chuyển giao nhiệm vụ gì, HS thao tác thiết bị/phần mềm nào cụ thể.

    PHONG CÁCH: Ngôn ngữ sư phạm chuẩn mực, hiện đại, truyền cảm hứng.
  `;

  const prompt = `
    Thiết kế/Số hóa bài dạy Platinum v5.5:
    - Môn: ${input.subject} | Khối: ${input.grade} | Tên bài: ${input.lessonTitle}
    - Thời lượng: ${input.duration}
    - Mã chỉ báo NLS trọng tâm (Chuẩn 3456): ${input.digitalCompetencies.join(', ')}
    ${input.oldContent ? `- NỘI DUNG GỐC CẦN SỐ HÓA: ${input.oldContent}` : "- Soạn mới hoàn toàn bám sát CV 2345 và Khung NLS 6/2024."}

    YÊU CẦU: Đầu ra JSON chính xác. Các bước hoạt động phải phản ánh đúng tinh thần của Phụ lục 2 (Tình huống sư phạm) tương ứng với khối lớp.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
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
            required: ["specificCapacities", "generalCapacities", "qualities", "digitalInterpretation"]
          },
          preparation: {
            type: Type.OBJECT,
            properties: {
              teacher: { type: Type.ARRAY, items: { type: Type.STRING } },
              students: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["teacher", "students"]
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
                    description: { type: Type.STRING }
                  },
                  required: ["toolName", "description"]
                }
              },
              required: ["phase", "objective", "teacherActions", "studentActions", "digitalIntegration"]
            }
          },
          adjustment: { type: Type.STRING }
        },
        required: ["lessonTitle", "subject", "duration", "objectives", "preparation", "activities", "adjustment"]
      }
    }
  });

  const jsonStr = (response.text || '{}').trim();
  const parsed = JSON.parse(jsonStr);
  
  return {
    ...parsed,
    id: crypto.randomUUID(),
    grade: input.grade,
    subject: input.subject,
    digitalCompetencies: input.digitalCompetencies,
    createdAt: Date.now()
  };
};
