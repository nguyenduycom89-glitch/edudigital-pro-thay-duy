
export enum Subject {
  TOAN = "Toán",
  TIENG_VIET = "Tiếng Việt",
  TIENG_ANH = "Tiếng Anh",
  TU_NHIEN_XA_HOI = "Tự nhiên và Xã hội",
  KHOA_HOC = "Khoa học",
  LICH_SU_DIA_LI = "Lịch sử và Địa lí",
  DAO_DUC = "Đạo đức",
  CONG_NGHE = "Công nghệ",
  HOAT_DONG_TRAI_NGHIEM = "Hoạt động trải nghiệm",
  TIN_HOC = "Tin học"
}

export interface LessonActivity {
  phase: string;
  objective: string;
  teacherActions: string[];
  studentActions: string[];
  digitalIntegration: {
    toolName: string;
    description: string;
  };
}

export interface LessonPlan {
  id: string;
  subject: Subject;
  grade: string;
  lessonTitle: string;
  duration: string;
  executionDate: string;
  digitalCompetencies: string[];
  objectives: {
    specificCapacities: string[];
    generalCapacities: string[];
    qualities: string[];
    digitalInterpretation: string;
  };
  preparation: {
    teacher: string[];
    students: string[];
  };
  activities: LessonActivity[];
  adjustment: string;
  createdAt: number;
}

export interface LessonInput {
  subject: Subject;
  grade: string;
  lessonTitle: string;
  duration: string;
  digitalCompetencies: string[];
  oldContent?: string;
}
