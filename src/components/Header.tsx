import React from 'react';
import { GraduationCap, MessageSquare, BookOpen, Calculator, FileSpreadsheet, Calendar, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'modalidades' | 'calculadora' | 'formatos' | 'cronograma';
  setActiveTab: (tab: 'chat' | 'modalidades' | 'calculadora' | 'formatos' | 'cronograma') => void;
  onResetChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onResetChat }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top institutional strip */}
      <div className="bg-[#0f2444] text-slate-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Universidad Nacional de Chimborazo</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand | Navigation links | Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setActiveTab('chat')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0f2444] text-white flex items-center justify-center font-serif font-bold text-lg shadow-xs group-hover:bg-[#16335f] transition-colors">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-slate-900 group-hover:text-[#0f2444] transition-colors flex items-center gap-1.5">
              <span>UNACH</span>
              <span className="font-normal text-slate-400">·</span>
              <span className="font-semibold text-slate-700 text-sm">AURA</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Asistente Universitario Reglamento Académico</p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single line, clean typographic hover) */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-slate-100 text-[#0f2444] font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Asistente Oficial</span>
          </button>

          <button
            onClick={() => setActiveTab('modalidades')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'modalidades'
                ? 'bg-slate-100 text-[#0f2444] font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Modalidades</span>
          </button>

          <button
            onClick={() => setActiveTab('calculadora')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'calculadora'
                ? 'bg-slate-100 text-[#0f2444] font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Calculadora & EHEP</span>
          </button>

          <button
            onClick={() => setActiveTab('formatos')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'formatos'
                ? 'bg-slate-100 text-[#0f2444] font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Formatos SGC</span>
          </button>

          <button
            onClick={() => setActiveTab('cronograma')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'cronograma'
                ? 'bg-slate-100 text-[#0f2444] font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Plazos & Cronograma</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2">
          {activeTab === 'chat' && onResetChat && (
            <button
              onClick={onResetChat}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Reiniciar chat
            </button>
          )}
          <button
            onClick={() => setActiveTab('chat')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0f2444] rounded-lg hover:bg-[#193766] transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs"
          >
            <span>Consultar Reglamento</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="lg:hidden flex items-center overflow-x-auto border-t border-slate-100 px-4 py-1.5 bg-slate-50 text-xs gap-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'chat' ? 'bg-[#0f2444] text-white font-medium' : 'text-slate-600'}`}
        >
          Asistente
        </button>
        <button
          onClick={() => setActiveTab('modalidades')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'modalidades' ? 'bg-[#0f2444] text-white font-medium' : 'text-slate-600'}`}
        >
          Modalidades
        </button>
        <button
          onClick={() => setActiveTab('calculadora')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'calculadora' ? 'bg-[#0f2444] text-white font-medium' : 'text-slate-600'}`}
        >
          Calculadora & EHEP
        </button>
        <button
          onClick={() => setActiveTab('formatos')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'formatos' ? 'bg-[#0f2444] text-white font-medium' : 'text-slate-600'}`}
        >
          Formatos SGC
        </button>
        <button
          onClick={() => setActiveTab('cronograma')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'cronograma' ? 'bg-[#0f2444] text-white font-medium' : 'text-slate-600'}`}
        >
          Plazos
        </button>
      </div>
    </header>
  );
};
