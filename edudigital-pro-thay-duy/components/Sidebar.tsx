
import React from 'react';
import { ICONS } from '../constants';

interface SidebarProps {
  currentView: 'home' | 'create' | 'library';
  onNavigate: (view: 'home' | 'create' | 'library') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: ICONS.Home },
    { id: 'create', label: 'Tích hợp Năng lực số', icon: ICONS.Plus },
    { id: 'library', label: 'Kho bài dạy', icon: ICONS.Library },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 no-print">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <ICONS.Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">EduDigital</h1>
            <p className="text-xs text-indigo-600 font-semibold tracking-wider">PRIMARY AI</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="font-medium">{item.label}</span>
            {currentView === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Chuyên gia Tiểu học</p>
          <p className="text-[11px] text-slate-600 leading-relaxed italic">
            "Hỗ trợ tích hợp Năng lực số và AI theo chuẩn CV 2345/BGDĐT-GDTH."
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
