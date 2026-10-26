import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { InstitutionalBanner } from './components/InstitutionalBanner.tsx';
import { ChatAssistant } from './components/ChatAssistant.tsx';
import { ModalidadesExplorer } from './components/ModalidadesExplorer.tsx';
import { GradeCalculator } from './components/GradeCalculator.tsx';
import { NormativaFormatos } from './components/NormativaFormatos.tsx';
import { CronogramaPlazos } from './components/CronogramaPlazos.tsx';
import { ShieldCheck, Mail, MapPin, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'modalidades' | 'calculadora' | 'formatos' | 'cronograma'>('chat');
  const [chatKey, setChatKey] = useState<number>(0);

  const handleResetChat = () => {
    setChatKey((prev) => prev + 1);
  };

  const handleSelectTopicForChat = (question: string) => {
    setActiveTab('chat');
    // We can trigger the chat prompt if needed
  };

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col font-sans text-slate-800">
      {/* Institutional Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onResetChat={handleResetChat} 
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Banner with Campus Backdrop */}
        <InstitutionalBanner />

        {/* Tab View Routing */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <ChatAssistant key={chatKey} />
          </div>
        )}

        {activeTab === 'modalidades' && (
          <ModalidadesExplorer onSelectTopicForChat={handleSelectTopicForChat} />
        )}

        {activeTab === 'calculadora' && (
          <GradeCalculator />
        )}

        {activeTab === 'formatos' && (
          <NormativaFormatos />
        )}

        {activeTab === 'cronograma' && (
          <CronogramaPlazos />
        )}

        {/* Leyenda institucional y académica */}
        <div className="mt-8 text-center px-4">
          <p className="text-xs text-slate-500">
            Sitio construido con el apoyo de Google AI Studio; contenido revisado y elaborado por el docente de la cátedra de Planificación de Integración Curricular
          </p>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="font-semibold text-slate-800">
              Universidad Nacional de Chimborazo (UNACH)
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Campus Norte / La Dolorosa · Riobamba, Ecuador</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-blue-900" />
              <span>Soporte: eppalacios@unach.edu.ec    0994420114</span>
            </span>
            <span className="text-slate-300">·</span>
            <span>Sistema SGC UNACH</span>
            <span className="text-slate-300">·</span>
            <span>SICOA</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <div>
            Aprobado con Resolución No. 0028-CU-UNACH-SE-EXT-02-02-2026 y Resolución No. 0304-CU-UNACH-SE-EXT-24-09-2025.
          </div>
          <div className="mt-2 sm:mt-0 font-mono">
            Vigencia 2025 - 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
