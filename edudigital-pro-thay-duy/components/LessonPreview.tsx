
import React from 'react';
import { LessonPlan } from '../types';
import { ICONS } from '../constants';

interface LessonPreviewProps {
  plan: LessonPlan;
  onSave?: () => void;
  onBack?: () => void;
}

const LessonPreview: React.FC<LessonPreviewProps> = ({ plan, onSave, onBack }) => {
  const exportToWord = () => {
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>KHBD - ${plan.lessonTitle}</title>
      <style>
        body { font-family: 'Times New Roman', serif; line-height: 1.4; margin: 2cm; }
        h1, h2 { text-align: center; font-weight: bold; text-transform: uppercase; margin: 5px 0; }
        .bold { font-weight: bold; }
        .italic { font-style: italic; }
        table { width: 100%; border-collapse: collapse; border: 0.5pt solid black; margin: 10px 0; table-layout: fixed; }
        th, td { border: 0.5pt solid black; padding: 6pt; vertical-align: top; font-size: 11pt; word-wrap: break-word; }
        .bg-gray { background-color: #f2f2f2; font-weight: bold; }
        .footer { margin-top: 30pt; width: 100%; }
        .footer td { border: none !important; text-align: center; font-weight: bold; }
      </style>
      </head><body>
    `;
    const footer = "</body></html>";
    
    const contentHtml = `
      <div style="text-align: center; font-weight: bold; margin-bottom: 20pt;">
        <p style="margin: 0; font-size: 14pt;">KẾ HOẠCH BÀI DẠY</p>
        <p style="margin: 0; font-style: italic; font-weight: normal; font-size: 10pt;">(Theo Công văn số 2345/BGDĐT-GDTH ngày 07/6/2021)</p>
        <p style="margin: 10pt 0 0 0;">Môn học/Hoạt động giáo dục: ${plan.subject}; Lớp: ${plan.grade}</p>
        <p style="margin: 0;">Tên bài học: ${plan.lessonTitle}; Số tiết: ${plan.duration}</p>
        <p style="margin: 0; font-style: italic; font-weight: normal;">Thời gian thực hiện: ......................................................</p>
      </div>

      <p class="bold">I. Yêu cầu cần đạt:</p>
      <div style="margin-left: 15pt;">
        <p><span class="bold">1. Năng lực:</span></p>
        <p class="italic">* Năng lực đặc thù: ${plan.objectives.specificCapacities.join(', ')}.</p>
        <p class="italic">* Năng lực chung: ${plan.objectives.generalCapacities.join(', ')}.</p>
        <p><span class="bold">2. Phẩm chất:</span> <span class="italic">${plan.objectives.qualities.join(', ')}.</span></p>
        <p class="bold">👉 TÍCH HỢP NĂNG LỰC SỐ (THNLS):</p>
        <p style="margin-left: 10pt;"><span class="bold">Trọng tâm:</span> ${plan.digitalCompetencies.join(', ')}.</p>
        <p style="margin-left: 10pt; font-style: italic;">${plan.objectives.digitalInterpretation}</p>
      </div>

      <p class="bold">II. Đồ dùng dạy học:</p>
      <table>
        <tr class="bg-gray">
          <td style="width: 50%;">1. Đối với giáo viên</td>
          <td style="width: 50%;">2. Đối với học sinh</td>
        </tr>
        <tr>
          <td><ul>${plan.preparation.teacher.map(t => `<li>${t}</li>`).join('')}</ul></td>
          <td><ul>${plan.preparation.students.map(s => `<li>${s}</li>`).join('')}</ul></td>
        </tr>
      </table>

      <p class="bold">III. Các hoạt động dạy học chủ yếu:</p>
      <table>
        <tr class="bg-gray" style="text-align: center;">
          <td style="width: 30%;">Hoạt động của Giáo viên</td>
          <td style="width: 30%;">Hoạt động của Học sinh</td>
          <td style="width: 40%;">Tích hợp Năng lực số / Công cụ AI</td>
        </tr>
        ${plan.activities.map((act, idx) => `
          <tr class="bg-gray"><td colspan="3">${idx + 1}. Hoạt động ${act.phase}: ( ${act.objective} )</td></tr>
          <tr>
            <td>${act.teacherActions.map((a, i) => `<p><b style="color:blue">Bước ${i+1}:</b> ${a}</p>`).join('')}</td>
            <td>${act.studentActions.map((a, i) => `<p><b style="color:blue">Bước ${i+1}:</b> ${a}</p>`).join('')}</td>
            <td style="background-color: #f9f9f9; font-style: italic;">
              <p><b>Công cụ: ${act.digitalIntegration.toolName}</b></p>
              <p>${act.digitalIntegration.description}</p>
            </td>
          </tr>
        `).join('')}
      </table>
      <p style="font-size: 10pt; font-style: italic;">* Lưu ý: GV nhắc HS xem trước bài tiếp theo.</p>

      <p class="bold">IV. Điều chỉnh sau bài dạy:</p>
      <p style="height: 40pt;">....................................................................................................................................................................................</p>

      <table class="footer">
        <tr>
          <td>Ban Giám hiệu</td>
          <td>Tổ trưởng chuyên môn</td>
          <td>Giáo viên thực hiện</td>
        </tr>
        <tr style="height: 60pt;"><td></td><td></td><td></td></tr>
        <tr><td>(Ký tên, đóng dấu)</td><td>(Ký tên)</td><td>(Ký tên)</td></tr>
      </table>
      
      <div style="margin-top: 40pt; text-align: center; font-size: 9pt; color: #555; border-top: 1pt solid #ddd; padding-top: 10pt;">
        <b>Sản phẩm AI chuyên sâu bởi thầy Nguyễn Đức Duy - Chuyên gia GD Lớp ${plan.grade}</b><br/>
        <i>Ứng dụng hỗ trợ tích hợp Năng lực số Tiểu học 5.0 Platinum</i>
      </div>
    `;

    const source = header + contentHtml + footer;
    const blob = new Blob(['\ufeff', source], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KHBD_Lop${plan.grade}_${plan.lessonTitle.replace(/\s+/g, '_')}_ThayDuy.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto mb-20 animate-in fade-in duration-700">
      {/* Control Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 no-print bg-white/95 p-6 rounded-[32px] shadow-2xl border border-indigo-50 sticky top-6 z-50 backdrop-blur-xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 font-bold transition-all group px-4 py-2"
        >
          <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-indigo-100 transition-colors">
            <ICONS.ChevronRight className="w-5 h-5 rotate-180" />
          </div>
          Quay lại chỉnh sửa
        </button>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={exportToWord}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <ICONS.Download className="w-5 h-5" />
            XUẤT FILE WORD (.DOC)
          </button>
          {onSave && (
            <button 
              onClick={onSave} 
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
            >
              LƯU VÀO KHO CÁ NHÂN
            </button>
          )}
        </div>
      </div>

      {/* Main Document Content */}
      <div className="bg-white p-12 md:p-16 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.12)] border border-slate-100 rounded-[56px] min-h-[11in] text-slate-800 print:shadow-none print:border-none print:p-0 relative overflow-hidden">
        
        {/* Ownership watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] pointer-events-none opacity-[0.03] text-6xl font-black text-slate-900 select-none no-print uppercase text-center leading-tight">
          Thầy Nguyễn Đức Duy<br/>Chuyên gia Giáo dục Tiểu học<br/>Trường TH Nguyễn Bỉnh Khiêm
        </div>

        {/* Document Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">KHBD Platinum Lớp ${plan.grade} v5.0</div>
          <h1 className="text-3xl font-black uppercase mb-3 tracking-tight text-slate-900">KẾ HOẠCH BÀI DẠY</h1>
          <p className="text-sm italic text-indigo-400 mb-8 uppercase tracking-[0.2em] font-bold">(Chuẩn Công văn số 2345/BGDĐT-GDTH)</p>
          <div className="space-y-3 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
            <p className="font-bold text-xl uppercase text-slate-700">Môn học: <span className="text-indigo-600">{plan.subject}</span> | Lớp: {plan.grade}</p>
            <p className="font-black text-2xl text-slate-900 leading-tight">Bài: {plan.lessonTitle}</p>
            <p className="text-slate-500 font-bold italic tracking-wide">Thời lượng: {plan.duration}</p>
          </div>
        </div>

        {/* Section I */}
        <section className="mb-14">
          <h2 className="text-xl font-black mb-8 flex items-center gap-4 text-slate-900">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 font-serif text-xl">I</div>
            YÊU CẦU CẦN ĐẠT:
          </h2>
          <div className="ml-16 space-y-6">
            <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
              <p className="font-black text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                1. Năng lực
              </p>
              <div className="ml-5 space-y-4">
                <p className="leading-relaxed"><span className="font-black text-indigo-600 italic tracking-wide uppercase text-[10px] bg-indigo-50 px-2 py-1 rounded-md mr-2">* Năng lực đặc thù:</span> {plan.objectives.specificCapacities.join(', ')}.</p>
                <p className="leading-relaxed"><span className="font-black text-indigo-600 italic tracking-wide uppercase text-[10px] bg-indigo-50 px-2 py-1 rounded-md mr-2">* Năng lực chung:</span> {plan.objectives.generalCapacities.join(', ')}.</p>
              </div>
            </div>
            <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
              <p className="font-black text-slate-800 mb-2 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                2. Phẩm chất
              </p>
              <p className="ml-5 italic font-medium text-slate-600 leading-relaxed">{plan.objectives.qualities.join(', ')}.</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-8 rounded-[40px] shadow-2xl shadow-indigo-200 relative overflow-hidden group">
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-1000" />
               <p className="font-black text-white flex items-center gap-3 mb-4 text-lg tracking-wide">
                 <ICONS.Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                 👉 TÍCH HỢP NĂNG LỰC SỐ (THNLS):
               </p>
               <div className="ml-5 space-y-3">
                 <p className="text-white font-black text-xs uppercase tracking-widest border-b border-white/20 pb-1">Trọng tâm: {plan.digitalCompetencies.join(', ')}</p>
                 <p className="text-indigo-50 font-medium italic leading-relaxed text-base border-l-2 border-indigo-400/50 pl-5">{plan.objectives.digitalInterpretation}</p>
               </div>
            </div>
          </div>
        </section>

        {/* Section II */}
        <section className="mb-14">
          <h2 className="text-xl font-black mb-8 flex items-center gap-4 text-slate-900">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 font-serif text-xl">II</div>
            ĐỒ DÙNG DẠY HỌC:
          </h2>
          <div className="ml-16 overflow-hidden border-2 border-slate-100 rounded-[40px] shadow-sm bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="w-1/2 p-6 text-left font-black italic tracking-wider">1. Đối với giáo viên</th>
                  <th className="w-1/2 p-6 text-left font-black italic tracking-wider border-l border-white/10">2. Đối với học sinh</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-8 align-top">
                    <ul className="list-disc ml-6 space-y-3 text-sm font-bold text-slate-600">
                      {plan.preparation.teacher.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </td>
                  <td className="p-8 align-top border-l border-slate-100">
                    <ul className="list-disc ml-6 space-y-3 text-sm font-bold text-slate-600">
                      {plan.preparation.students.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section III */}
        <section className="mb-14">
          <h2 className="text-xl font-black mb-10 flex items-center gap-4 text-slate-900">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 font-serif text-xl">III</div>
            CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (CHI TIẾT):
          </h2>
          
          <div className="overflow-hidden border-2 border-slate-200 rounded-[48px] shadow-2xl shadow-indigo-50 bg-white">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-[0.25em]">
                  <th className="w-[30%] p-6 text-center font-black border-r border-white/10">Hoạt động Giáo viên</th>
                  <th className="w-[30%] p-6 text-center font-black border-r border-white/10">Hoạt động Học sinh</th>
                  <th className="w-[40%] p-6 text-center font-black bg-indigo-800 shadow-[inset_0_0_30px_rgba(0,0,0,0.15)]">Tích hợp NLS / Công cụ AI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {plan.activities.map((act, idx) => (
                  <React.Fragment key={idx}>
                    <tr className="bg-indigo-50/70 border-b border-slate-200">
                      <td colSpan={3} className="p-5 pl-10 font-black text-indigo-900 uppercase text-xs tracking-[0.15em] flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        {idx + 1}. Hoạt động ${act.phase}: ( ${act.objective} )
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                      <td className="p-8 border-r border-slate-100 align-top space-y-6 font-bold text-slate-700 leading-relaxed">
                        {act.teacherActions.map((action, i) => (
                          <div key={i} className="flex gap-3">
                             <span className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-[10px] font-black">B{i+1}</span>
                             <p>{action}</p>
                          </div>
                        ))}
                      </td>
                      <td className="p-8 border-r border-slate-100 align-top space-y-6 font-bold text-slate-700 leading-relaxed">
                        {act.studentActions.map((action, i) => (
                          <div key={i} className="flex gap-3">
                             <span className="shrink-0 w-8 h-8 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center text-[10px] font-black">B{i+1}</span>
                             <p>{action}</p>
                          </div>
                        ))}
                      </td>
                      <td className="p-8 align-top italic text-indigo-900 bg-indigo-50/30 border-l-4 border-l-indigo-500">
                        <div className="mb-5">
                          <span className="inline-block px-5 py-2 bg-indigo-800 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-indigo-100 flex items-center gap-2 w-fit">
                            <ICONS.Sparkles className="w-3 h-3" />
                            {act.digitalIntegration.toolName}
                          </span>
                        </div>
                        <div className="text-xs leading-relaxed font-bold border-l-2 border-indigo-200 pl-4 py-1">
                          {act.digitalIntegration.description}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-[11px] italic font-black text-indigo-300 uppercase tracking-[0.4em] text-center animate-pulse">
            *** GV nhắc học sinh xem trước bài học tiếp theo ***
          </p>
        </section>

        {/* Section IV */}
        <section className="mb-24">
          <h2 className="text-xl font-black mb-8 flex items-center gap-4 text-slate-900">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 font-serif text-xl">IV</div>
            ĐIỀU CHỈNH SAU BÀI DẠY:
          </h2>
          <div className="min-h-[140px] p-10 border-4 border-dashed border-indigo-50 rounded-[40px] text-slate-300 italic font-bold leading-loose">
            {plan.adjustment || "Ghi chú điều chỉnh về tiến trình, phương pháp hoặc đồ dùng sau khi thực hiện tiết dạy thực tế...................................................................................................................................................................................................................................."}
          </div>
        </section>

        {/* Footer Signature Area */}
        <div className="mt-32 grid grid-cols-3 gap-12 text-center text-sm font-black uppercase tracking-tight text-slate-800">
          <div className="space-y-28">
            <p>Ban Giám hiệu</p>
            <p className="font-bold text-[10px] text-slate-400 normal-case border-t border-slate-100 pt-5">(Ký tên, đóng dấu)</p>
          </div>
          <div className="space-y-28">
            <p>Tổ trưởng chuyên môn</p>
            <p className="font-bold text-[10px] text-slate-400 normal-case border-t border-slate-100 pt-5">(Ký tên)</p>
          </div>
          <div className="space-y-28">
            <div className="group">
               <p className="mb-1 text-slate-900">Giáo viên thực hiện</p>
               <p className="text-[11px] italic font-black text-indigo-600 normal-case mb-1 bg-indigo-50 py-1 rounded-full">Thầy Nguyễn Đức Duy</p>
            </div>
            <p className="font-bold text-[10px] text-slate-400 normal-case border-t border-slate-100 pt-5">(Ký tên)</p>
          </div>
        </div>

        {/* Final Branding */}
        <div className="mt-40 pt-10 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] no-print">
           <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl">
             <ICONS.Sparkles className="w-5 h-5 text-indigo-500" />
             <span>EduDigital Platinum v5.0 Master</span>
           </div>
           <span className="text-indigo-500 bg-indigo-50 px-8 py-3 rounded-full border border-indigo-100 shadow-sm">
             TỐI ƯU BỞI THẦY NGUYỄN ĐỨC DUY - TRƯỜNG TH NGUYỄN BỈNH KHIÊM
           </span>
        </div>
      </div>
    </div>
  );
};

export default LessonPreview;
