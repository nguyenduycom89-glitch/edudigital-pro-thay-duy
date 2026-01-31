
import React, { useState, useMemo } from 'react';
import { Subject, LessonInput } from '../types';
import { ICONS, DIGITAL_COMPETENCIES_DATA, DigitalCompetencyIndicator } from '../constants';
import mammoth from 'mammoth';

interface LessonFormProps {
  onSubmit: (data: LessonInput) => void;
  isLoading: boolean;
}

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<LessonInput>({
    subject: Subject.TOAN,
    grade: '4',
    lessonTitle: '',
    duration: '1 tiết (35 phút)',
    digitalCompetencies: [],
    oldContent: ''
  });
  const [isExtracting, setIsExtracting] = useState(false);

  const subjects = Object.values(Subject);
  const grades = ['1', '2', '3', '4', '5'];

  // Xác định bậc CB1 hoặc CB2 dựa trên khối lớp
  const currentLevel = useMemo(() => {
    const g = parseInt(formData.grade);
    return g <= 3 ? 'CB1' : 'CB2';
  }, [formData.grade]);

  // Lọc danh sách chỉ báo theo bậc và phân nhóm theo lĩnh vực
  const groupedCompetencies = useMemo(() => {
    const filtered = DIGITAL_COMPETENCIES_DATA.filter(c => c.level === currentLevel);
    const groups: Record<string, DigitalCompetencyIndicator[]> = {};
    filtered.forEach(c => {
      if (!groups[c.domain]) groups[c.domain] = [];
      groups[c.domain].push(c);
    });
    return groups;
  }, [currentLevel]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
      if (file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setFormData(prev => ({ ...prev, oldContent: result.value }));
      } else if (file.name.endsWith('.txt')) {
        const text = await file.text();
        setFormData(prev => ({ ...prev, oldContent: text }));
      }
    } catch (error) {
      alert("Lỗi khi đọc tệp.");
    } finally {
      setIsExtracting(false);
      e.target.value = '';
    }
  };

  const toggleCompetency = (code: string) => {
    setFormData(prev => {
      const current = prev.digitalCompetencies;
      const isSelected = current.some(c => c.startsWith(code));
      if (isSelected) {
        return { ...prev, digitalCompetencies: current.filter(c => !c.startsWith(code)) };
      } else {
        const fullDesc = DIGITAL_COMPETENCIES_DATA.find(d => d.code === code);
        return { ...prev, digitalCompetencies: [...current, `${code}: ${fullDesc?.name}`] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.lessonTitle.trim() && formData.digitalCompetencies.length > 0) {
      onSubmit(formData);
    } else if (formData.digitalCompetencies.length === 0) {
      alert("Vui lòng chọn ít nhất một mã chỉ báo Năng lực số (CV 3456).");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-[0_32px_80px_-20px_rgba(99,102,241,0.15)] border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-vibrant-gradient p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
            <ICONS.Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sáng tạo bởi Thầy Nguyễn Đức Duy</span>
          </div>
          <h2 className="text-4xl font-black mb-3 tracking-tight leading-tight">Số hóa giáo án 5.0 Platinum</h2>
          <p className="text-indigo-50 font-medium text-lg opacity-90">Tích hợp Năng lực số chuẩn Công văn 3456/BGDĐT-GDPT.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-12 space-y-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider">Khối lớp</label>
            <select
              className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value, digitalCompetencies: [] })}
            >
              {grades.map((g) => <option key={g} value={g}>Lớp {g}</option>)}
            </select>
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="text-[11px] font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider">Môn học</label>
            <select
              className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value as Subject })}
            >
              {subjects.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Tên bài học</label>
          <input
            type="text"
            required
            className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-black text-slate-900"
            placeholder="Nhập tên bài học..."
            value={formData.lessonTitle}
            onChange={(e) => setFormData({ ...formData, lessonTitle: e.target.value })}
          />
        </div>

        {/* CẢI TIẾN: Bảng chọn Mã chỉ báo NLS theo CV 3456 */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <label className="text-[11px] font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider">
              Chọn Mã chỉ báo NLS mục tiêu ({currentLevel})
            </label>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full italic">Chuẩn CV 3456</span>
          </div>
          
          <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin">
            {/* Added type assertion to ensure items is recognized as DigitalCompetencyIndicator[] */}
            {(Object.entries(groupedCompetencies) as [string, DigitalCompetencyIndicator[]][]).map(([domain, items]) => (
              <div key={domain} className="space-y-4">
                <h4 className="text-xs font-black text-indigo-900 flex items-center gap-2">
                  <div className="w-1 h-4 bg-indigo-600 rounded-full" />
                  {domain}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((comp) => (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => toggleCompetency(comp.code)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        formData.digitalCompetencies.some(c => c.startsWith(comp.code))
                          ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-100'
                          : 'border-slate-100 bg-slate-50 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${
                          formData.digitalCompetencies.some(c => c.startsWith(comp.code)) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                        }`}>
                          {formData.digitalCompetencies.some(c => c.startsWith(comp.code)) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-indigo-700 mb-1">{comp.code}</p>
                          <p className="text-xs font-bold text-slate-900">{comp.name}</p>
                          <p className="text-[9px] text-slate-500 leading-tight mt-1 italic">{comp.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex justify-between items-center">
             <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Giáo án cũ / Ghi chú chuyên môn</label>
             <label className="cursor-pointer px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                <ICONS.FileWord className="w-3.5 h-3.5" /> TẢI FILE WORD
                <input type="file" accept=".docx" onChange={handleFileUpload} className="hidden" />
             </label>
           </div>
           <textarea
              className="w-full px-5 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 min-h-[150px] text-sm font-medium"
              placeholder="Dán nội dung hoặc tải file để AI tích hợp NLS..."
              value={formData.oldContent}
              onChange={(e) => setFormData({ ...formData, oldContent: e.target.value })}
            />
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.lessonTitle || isExtracting || formData.digitalCompetencies.length === 0}
          className="w-full py-5 rounded-2xl flex items-center justify-center gap-4 font-black text-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all disabled:bg-slate-300"
        >
          {isLoading ? "ĐANG SỐ HÓA BẢN PLATINUM..." : "BẮT ĐẦU SỐ HÓA KHBD " + formData.grade + ".0"}
        </button>
      </form>
    </div>
  );
};

export default LessonForm;
