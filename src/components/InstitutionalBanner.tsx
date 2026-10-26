import React from 'react';
import { ShieldCheck, BookOpenCheck, Scale, Award } from 'lucide-react';
import campusImg from '../assets/images/unach_campus_facultad_1791169437141.jpg';

export const InstitutionalBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0b1c33] text-white shadow-sm mb-6 border border-slate-200">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={campusImg}
          alt="Campus Universidad Nacional de Chimborazo en Riobamba con vista al Chimborazo"
          className="w-full h-full object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#0b1c33]/90 to-[#0b1c33]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-8 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          <Award className="w-4 h-4" />
          <span>Universidad Nacional de Chimborazo</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          AURA - Asistente Universitario Reglamento Académico
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
          Orientación normativa oficial para estudiantes de pregrado sobre reglamentos, manuales de gestión,
          modalidades de titulación, porcentajes antiplagio, sustentaciones orales y trámites en el SICOA.
        </p>

        {/* Institutional Pillars (Clean unboxed metadata layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/50 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">RAG Estricto Institucional</div>
              <div className="text-slate-400">Respuestas 100% verificadas en Resoluciones 0304 y 0028</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpenCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">Citas Normativas Exactas</div>
              <div className="text-slate-400">Artículos del Reglamento y secciones del Manual vigentes</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">Seguridad y Claridad</div>
              <div className="text-slate-400">Desglose paso a paso para estudiantes bajo presión de plazos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
