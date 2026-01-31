
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import LessonForm from './components/LessonForm';
import LessonPreview from './components/LessonPreview';
import { LessonInput, LessonPlan, Subject } from './types';
import { generateLessonPlan } from './services/geminiService';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'library'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [library, setLibrary] = useState<LessonPlan[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('edudigital_library');
    if (saved) {
      try {
        setLibrary(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse library", e);
      }
    }
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateLesson = async (input: LessonInput) => {
    setIsLoading(true);
    try {
      const plan = await generateLessonPlan(input);
      setCurrentPlan(plan);
      setCurrentView('create');
    } catch (error) {
      console.error("Generation failed", error);
      alert("Đã có lỗi xảy ra khi tạo bài dạy. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = () => {
    if (currentPlan) {
      const updatedLibrary = [currentPlan, ...library];
      setLibrary(updatedLibrary);
      localStorage.setItem('edudigital_library', JSON.stringify(updatedLibrary));
      showNotification("Đã lưu bài dạy vào kho!");
    }
  };

  const handleDeletePlan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc muốn xóa bài dạy này?")) {
      const updatedLibrary = library.filter(p => p.id !== id);
      setLibrary(updatedLibrary);
      localStorage.setItem('edudigital_library', JSON.stringify(updatedLibrary));
      showNotification("Đã xóa bài dạy khỏi kho.");
    }
  };

  const renderHome = () => (
    <div className="space-y-16 py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-vibrant-gradient p-16 rounded-[64px] shadow-[0_48px_100px_-24px_rgba(99,102,241,0.4)] text-white relative overflow-hidden group">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-8 animate-bounce">
            <ICONS.Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-black uppercase tracking-widest">Sản phẩm AI của Thầy Nguyễn Đức Duy</span>
          </div>
          <h1 className="text-6xl font-[900] mb-6 leading-[1.1] tracking-tight">
            EduDigital Pro <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-300">
              Siêu Trợ Lý Số Hóa Giáo Án 4.0
            </span>
          </h1>
          <p className="text-indigo-50 text-xl mb-10 opacity-90 leading-relaxed font-medium">
            Phù phép giáo án cũ thành chuẩn Công văn 2345. Tự động tích hợp Năng lực số và công cụ AI đỉnh cao chỉ trong 1 nốt nhạc.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => setCurrentView('create')}
              className="bg-white text-indigo-600 px-10 py-5 rounded-[24px] font-[900] text-lg flex items-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-all group/btn"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:text-white transition-colors">
                <ICONS.Plus className="w-6 h-6" />
              </div>
              BẮT ĐẦU SỐ HÓA NGAY
            </button>
            <div className="flex items-center gap-4 px-8 py-5 bg-white/10 rounded-[24px] backdrop-blur-md border border-white/20">
               <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-black text-xs shadow-lg">AI</div>
               <div>
                 <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Techno-Assistant</p>
                 <span className="text-sm font-black">Powered by Gemini 3.0 Pro</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 hidden xl:block w-80 h-80">
           <div className="absolute inset-0 bg-white/10 rounded-[48px] rotate-12 blur-2xl animate-pulse" />
           <div className="absolute inset-0 bg-indigo-400/20 rounded-[48px] -rotate-12 blur-3xl animate-bounce duration-[4s]" />
           <ICONS.Sparkles className="w-full h-full text-white/40 drop-shadow-2xl animate-spin-slow" />
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-[120px] group-hover:bg-white/20 transition-all duration-1000"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px] group-hover:bg-indigo-400/30 transition-all duration-1000"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { icon: ICONS.Book, color: 'bg-amber-50 text-amber-600 border-amber-100', title: 'CHỈNH CHU 2345', desc: 'Bố cục 3 cột chuẩn Bộ Giáo dục, chuyên nghiệp đến từng con chữ.' },
          { icon: ICONS.Sparkles, color: 'bg-indigo-50 text-indigo-600 border-indigo-100', title: 'BÙNG NỔ CÔNG NGHỆ', desc: 'Tự động gợi ý Quizizz, Plickers, Canva... phù hợp từng bài dạy.' },
          { icon: ICONS.Download, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', title: 'XUẤT WORD PRO', desc: 'File .doc đầy đủ định dạng, in ấn ngay, không cần căn chỉnh lại.' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-500 group">
            <div className={`w-20 h-20 ${item.color} rounded-[28px] border-2 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              <item.icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-[900] text-slate-900 mb-4 tracking-tight uppercase">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium text-lg">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Recent Lessons */}
      <div className="bg-white rounded-[56px] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 relative z-10">
          <h2 className="text-3xl font-[900] text-slate-900 flex items-center gap-6">
            <div className="w-3 h-12 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200"></div>
            KHO BÀI DẠY MỚI NHẤT
          </h2>
          {library.length > 0 && (
             <button 
               onClick={() => setCurrentView('library')} 
               className="px-6 py-3 bg-indigo-50 text-indigo-600 font-black rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
             >
               Xem toàn bộ thư viện ({library.length})
             </button>
          )}
        </div>
        
        {library.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {library.slice(0, 3).map((plan) => (
              <div 
                key={plan.id}
                onClick={() => {
                  setCurrentPlan(plan);
                  setCurrentView('create');
                }}
                className="group bg-slate-50/50 border border-slate-100 p-8 rounded-[40px] hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(99,102,241,0.15)] transition-all duration-500 cursor-pointer relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-full tracking-widest">
                    {plan.subject}
                  </span>
                  <button onClick={(e) => handleDeletePlan(plan.id, e)} className="text-slate-200 hover:text-rose-500 transition-colors p-2 bg-white rounded-xl shadow-sm">
                    <ICONS.Trash className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-6 line-clamp-2 h-16 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                  {plan.lessonTitle}
                </h3>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                   <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                    <ICONS.Library className="w-4 h-4" />
                    <span>{new Date(plan.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     <ICONS.ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-4 border-dashed border-slate-100 rounded-[48px] p-24 text-center">
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl">
               <ICONS.Library className="w-12 h-12 text-slate-200" />
            </div>
            <p className="text-slate-400 font-black text-2xl uppercase tracking-tighter">Bạn chưa có bài dạy nào trong kho.</p>
            <p className="text-slate-300 font-bold mt-2">Hãy bắt đầu số hóa bằng nút "Bắt đầu ngay" ở trên!</p>
          </div>
        )}
      </div>
      
      {/* Footer Signature */}
      <footer className="pt-16 pb-10 border-t-2 border-slate-100 text-center relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8">
            <ICONS.Sparkles className="w-8 h-8 text-indigo-600 animate-spin-slow" />
         </div>
         <p className="text-slate-300 font-black text-xs tracking-[0.5em] uppercase mb-4">EduDigital Pro 5.0 Platinum</p>
         <div className="space-y-2">
           <p className="text-slate-900 font-[900] text-xl tracking-tight">
              Sản phẩm AI của <span className="text-indigo-600">Thầy Nguyễn Đức Duy</span>
           </p>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Trường Tiểu học Nguyễn Bỉnh Khiêm</p>
         </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex">
      <Sidebar currentView={currentView} onNavigate={(view) => {
        if (view === 'create') setCurrentPlan(null);
        setCurrentView(view);
      }} />

      <main className="flex-1 ml-64 p-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {currentView === 'home' && renderHome()}
          
          {currentView === 'create' && (
            <div className="py-6">
              {!currentPlan ? (
                <div className="animate-in fade-in zoom-in-95 duration-700">
                  <LessonForm onSubmit={handleCreateLesson} isLoading={isLoading} />
                  <div className="mt-12 text-center text-slate-400 font-black text-sm uppercase tracking-widest">
                    <p className="flex items-center justify-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                       Sản phẩm AI sáng tạo bởi thầy Nguyễn Đức Duy
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    </p>
                  </div>
                </div>
              ) : (
                <LessonPreview 
                  plan={currentPlan} 
                  onSave={handleSavePlan} 
                  onBack={() => setCurrentPlan(null)} 
                />
              )}
            </div>
          )}

          {currentView === 'library' && (
             <div className="py-6 animate-in fade-in duration-700">
                <header className="mb-16 flex justify-between items-end">
                  <div>
                    <h1 className="text-5xl font-[900] text-slate-900 mb-4 tracking-tight uppercase">Kho Bài Dạy <span className="text-indigo-600">Platinum</span></h1>
                    <p className="text-indigo-500 font-black uppercase tracking-[0.2em] bg-indigo-50 px-6 py-2 rounded-full inline-block border border-indigo-100">
                      Sản phẩm AI của Thầy Nguyễn Đức Duy
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-1">Số lượng bài dạy</p>
                    <p className="text-4xl font-black text-slate-900">{library.length}</p>
                  </div>
                </header>
                
                {library.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {library.map((plan) => (
                      <div 
                        key={plan.id}
                        onClick={() => {
                          setCurrentPlan(plan);
                          setCurrentView('create');
                        }}
                        className="bg-white border border-slate-100 p-10 rounded-[48px] hover:shadow-[0_48px_100px_-24px_rgba(99,102,241,0.2)] transition-all duration-700 cursor-pointer group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 opacity-50" />
                        
                        <div className="flex justify-between items-center mb-8 relative z-10">
                          <span className="px-5 py-2 bg-indigo-50 text-indigo-600 text-xs font-black uppercase rounded-full tracking-widest border border-indigo-100">
                            {plan.subject}
                          </span>
                          <button onClick={(e) => handleDeletePlan(plan.id, e)} className="p-3 text-slate-300 hover:text-rose-600 transition-colors bg-slate-50 rounded-2xl">
                            <ICONS.Trash className="w-6 h-6" />
                          </button>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-8 leading-tight h-16 line-clamp-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                          {plan.lessonTitle}
                        </h3>
                        <div className="flex items-center justify-between pt-8 border-t border-slate-50 relative z-10">
                          <span className="text-sm text-slate-400 font-bold tracking-wider">{new Date(plan.createdAt).toLocaleDateString('vi-VN')}</span>
                          <div className="w-12 h-12 bg-slate-900 text-white rounded-[20px] flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-110 transition-all shadow-xl shadow-indigo-100">
                            <ICONS.ChevronRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border-4 border-dashed border-slate-100 rounded-[64px] p-32 text-center shadow-sm">
                    <p className="text-slate-400 font-black text-3xl uppercase tracking-tighter">Thư viện trống.</p>
                    <button 
                      onClick={() => setCurrentView('create')}
                      className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-indigo-200"
                    >
                      Tạo bài dạy ngay
                    </button>
                  </div>
                )}
             </div>
          )}
        </div>
      </main>

      {notification && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-10 py-5 rounded-[28px] shadow-2xl flex items-center gap-5 animate-in slide-in-from-bottom-12 z-[200]">
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-ping" />
          <span className="font-black text-sm uppercase tracking-[0.2em]">{notification}</span>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xl flex items-center justify-center z-[200] p-8">
          <div className="bg-white rounded-[64px] p-20 max-w-2xl w-full text-center shadow-[0_64px_120px_-24px_rgba(0,0,0,0.3)] relative overflow-hidden border border-white/40">
            <div className="absolute top-0 left-0 w-full h-3 bg-slate-50">
               <div className="h-full bg-indigo-600 animate-[loading_2.5s_infinite]"></div>
            </div>
            <div className="mb-12 relative">
               <div className="w-40 h-40 bg-indigo-50 rounded-full flex items-center justify-center mx-auto animate-bounce duration-1000 shadow-inner">
                  <ICONS.Sparkles className="w-20 h-20 text-indigo-600" />
               </div>
               <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[60px] -z-10 animate-pulse"></div>
            </div>
            <h3 className="text-4xl font-[900] text-slate-900 mb-6 tracking-tight">ĐANG PHÙ PHÉP BÀI DẠY...</h3>
            <div className="space-y-8">
               <p className="text-slate-500 font-bold text-xl leading-relaxed italic opacity-80">
                 "Chào Thầy/Cô, EduDigital Platinum đang tối ưu hóa KHBD theo bảng 3 cột chuẩn 2345 và tích hợp các công cụ AI Pro nhất cho Thầy/Cô."
               </p>
               <div className="p-8 bg-indigo-50 rounded-[32px] border-2 border-indigo-100 text-left relative shadow-sm">
                  <p className="text-xs font-black text-indigo-700 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                    <ICONS.Sparkles className="w-5 h-5" />
                    BÍ KÍP TỪ THẦY DUY:
                  </p>
                  <p className="text-lg text-indigo-900 font-bold leading-relaxed">
                    Đừng quên xuất file Word để có bản in đẹp nhất gửi Ban Giám hiệu nhé. EduDigital Platinum đã tối ưu mọi bảng biểu cho Thầy/Cô rồi!
                  </p>
               </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-4">
               <div className="w-2 h-2 rounded-full bg-indigo-200 animate-bounce [animation-delay:-0.3s]" />
               <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
               <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
            </div>
            <p className="mt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Sản phẩm của Thầy Nguyễn Đức Duy • TH Nguyễn Bỉnh Khiêm</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes loading {
          0% { width: 0%; left: 0%; }
          50% { width: 100%; left: 0%; }
          100% { width: 0%; left: 100%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
