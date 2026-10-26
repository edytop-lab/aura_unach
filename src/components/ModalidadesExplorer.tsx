import React, { useState } from 'react';
import { 
  FileText, 
  BookMarked, 
  Wrench, 
  TrendingUp, 
  FileCheck2, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ModalidadesExplorerProps {
  onSelectTopicForChat?: (question: string) => void;
}

export const ModalidadesExplorer: React.FC<ModalidadesExplorerProps> = ({ onSelectTopicForChat }) => {
  const [selectedMod, setSelectedMod] = useState<'investigacion' | 'articulo' | 'tecnico' | 'emprendimiento' | 'complexivo'>('investigacion');

  const modalities = [
    {
      id: 'investigacion',
      title: 'Trabajo de Investigación',
      shortDesc: 'Estudio sistemático riguroso con abordaje teórico y metodológico.',
      icon: FileText,
      participantes: 'Individual o hasta dos (2) estudiantes',
      normativaRef: 'Reglamento Art. 24 y 29.a / Manual Sección 7.4.1',
      espacioAcademico: 'Planificación en penúltimo nivel y Ejecución en último nivel',
      ponderacion: 'Trabajo Escrito (40%) + Sustentación (60%) = Calificación Titulación (Mínimo 7.00/10)',
      fases: [
        {
          nombre: 'Fase 1: Planificación (Penúltimo Nivel)',
          detalles: [
            'Selección de tema del repositorio o propuesta propia hasta la semana 2.',
            'Tutor y estudiante planifican cronograma de tutorías en 5 días de notificado.',
            'Entrega del perfil hasta la semana 13 con visto bueno del tutor.',
            'Profesor de asignatura valida en 5 días y Comisión de Carrera emite acta en 5 días (subsanación en 5 días hábiles si hay observaciones).'
          ]
        },
        {
          nombre: 'Fase 2: Ejecución (Último Nivel)',
          detalles: [
            'Desarrollo del trabajo escrito con acompañamiento permanente del tutor.',
            'Entrega del trabajo escrito definitivo hasta la semana 13.',
            'Tutor aplica herramienta institucional antiplagio (Compilatio) en término de 3 días (Máx. 10% similitud, hasta 10% IA en intro/marco/metodología con declaración).',
            'Comisión propone tribunal en 3 días -> Decano designa en 3 días -> Director entrega en 2 días -> Tribunal evalúa en 8 días (subsanación en 8 días término).'
          ]
        },
        {
          nombre: 'Fase 3: Sustentación Oral',
          detalles: [
            'Estudiante solicita fecha al Decano en 5 días de aprobado el trabajo escrito.',
            'Requisitos: Certificado de culminación de estudios y Certificado de actualización de datos emitido por Dirección Académica.',
            'Decano fija fecha en 10 días. Tiempo de exposición: máximo 30 minutos.',
            'Preguntas: hasta 3 por miembro de tribunal. Si reprueba: derecho por única vez a examen de gracia (solicitar en 5 días hábiles con arancel).'
          ]
        }
      ]
    },
    {
      id: 'articulo',
      title: 'Artículo Científico',
      shortDesc: 'Reporte de resultados con formato normalizado enviado a revista indexada.',
      icon: BookMarked,
      participantes: 'Individual o hasta dos (2) estudiantes (Tutor firma al final)',
      normativaRef: 'Reglamento Art. 24 y 29.b / Manual Sección 7.4.2 y Tabla 1',
      espacioAcademico: 'Planificación en penúltimo nivel y Ejecución en último nivel (o anticipado con >= 50% de malla)',
      ponderacion: 'Con carta de aceptación o publicación se otorga la CALIFICACIÓN MÁXIMA (10/10) en trabajo escrito',
      fases: [
        {
          nombre: 'Fase 1: Perfil y Selección de Revista Objetivo',
          detalles: [
            'Elaboración y aprobación del perfil en penúltimo nivel.',
            'Tutor dentro de los 15 días posteriores a la aprobación del perfil selecciona la revista objetivo.',
            'Criterios estrictos (Tabla 1): Indexada mín. en Catálogo Latindex 2.0 o bases reconocidas (WoS, Scopus, PubMed, SciELO, Redalyc, DOAJ).',
            'Se analizan Factor de Impacto, cuartiles Q1-Q2, pertinencia con líneas UNACH, periodicidad y principios de ética (evitar revistas depredadoras).'
          ]
        },
        {
          nombre: 'Fase 2: Redacción y Envío del Manuscrito',
          detalles: [
            'Estudiante presenta manuscrito completo conforme a normas de la revista hasta la semana 8 del último nivel.',
            'Tutor en término de 15 días emite observaciones o dictamen favorable.',
            'Tutor y estudiante envían el manuscrito a la revista en los 10 días posteriores al dictamen favorable.',
            'Al recibir carta de aceptación o publicación, en 3 días se remite al Director para asignación de tribunal de grado.'
          ]
        },
        {
          nombre: 'Fase 3: Calificación y Sustentación',
          detalles: [
            'Tribunal de grado valida la carta de aceptación o publicación y asigna calificación máxima (10/10).',
            'Para sustentar se permite presentar la carta de aceptación del artículo.',
            'Tutor monitorea el proceso editorial hasta la publicación efectiva al cierre del periodo.',
            'Presentación oral de 30 minutos ante el tribunal con la misma rúbrica institucional.'
          ]
        }
      ]
    },
    {
      id: 'tecnico',
      title: 'Proyecto Técnico',
      shortDesc: 'Aplicación técnica directa: prototipos, equipos, sistemas funcionales o simuladores.',
      icon: Wrench,
      participantes: 'Individual o hasta tres (3) estudiantes',
      normativaRef: 'Reglamento Art. 24 y 29.c / Manual Sección 7.4.3',
      espacioAcademico: 'Planificación en penúltimo nivel y Ejecución en último nivel',
      ponderacion: 'Trabajo Escrito (40%) + Sustentación (60%) = Calificación Titulación (Mínimo 7.00/10)',
      fases: [
        {
          nombre: 'Fase 1: Planificación y Diseño Funcional',
          detalles: [
            'Definición de problema técnico real del ámbito profesional y factibilidad económica.',
            'Diseño metodológico y especificación de resultados tangibles (prototipo, hardware, software o simulación).',
            'Perfil aprobado por Comisión de Carrera en penúltimo nivel (Semana 13).'
          ]
        },
        {
          nombre: 'Fase 2: Ejecución Técnica y Verificación',
          detalles: [
            'Construcción, pruebas y validación del prototipo o servicio técnico.',
            'Entrega del informe escrito definitivo en semana 13 del último nivel.',
            'Revisión de antiplagio por el tutor en 3 días (máx. 10% similitud, hasta 10% IA declarada).',
            'Tribunal de grado evalúa funcionalidad técnica en 8 días.'
          ]
        },
        {
          nombre: 'Fase 3: Demostración y Sustentación',
          detalles: [
            'Defensa oral de 30 minutos con demostración de la efectividad técnica del prototipo o simulación.',
            'Mismos requisitos: certificado de culminación y actualización de datos.',
            'Hasta 3 preguntas por miembro del tribunal.'
          ]
        }
      ]
    },
    {
      id: 'emprendimiento',
      title: 'Proyecto de Emprendimiento',
      shortDesc: 'Plan de negocio innovador estructurado y viable comercialmente articulado con CIEP.',
      icon: TrendingUp,
      participantes: 'Individual o hasta tres (3) estudiantes',
      normativaRef: 'Reglamento Art. 24 y 29.d / Manual Sección 7.4.4',
      espacioAcademico: 'Planificación en penúltimo nivel y Ejecución en último nivel',
      ponderacion: 'Trabajo Escrito (40%) + Sustentación (60%) = Calificación Titulación (Mínimo 7.00/10)',
      fases: [
        {
          nombre: 'Fase 1: Estudio de Oportunidad e Innovación',
          detalles: [
            'Identificación de oportunidades de mercado y propuesta de valor innovadora.',
            'Alineación con las directrices de la Coordinación de Innovación, Emprendimiento y Productividad (CIEP).',
            'Aprobación del perfil en penúltimo nivel (formato Anexo 3).'
          ]
        },
        {
          nombre: 'Fase 2: Plan Integral de Negocio y Operaciones',
          detalles: [
            'Desarrollo detallado del plan financiero, marketing, operaciones y modelo comercial.',
            'Presentación definitiva hasta la semana 13 del último nivel.',
            'Revisión antiplagio institucional en 3 días por el tutor.',
            'Evaluación por tribunal de grado en 8 días hábiles.'
          ]
        },
        {
          nombre: 'Fase 3: Sustentación y Potencial Incubación',
          detalles: [
            'Defensa oral de 30 minutos demostrando viabilidad comercial y rigor investigativo.',
            'Posibilidad de vinculación directa con procesos de incubación institucional en la CIEP.',
            'Evaluación con rúbrica institucional sobre 20 convertida a base 10 (mínimo 7).'
          ]
        }
      ]
    },
    {
      id: 'complexivo',
      title: 'Examen de Grado Complexivo Teórico-Práctico',
      shortDesc: 'Evaluación integral de competencias mediante prueba teórica y resolución de caso práctico.',
      icon: FileCheck2,
      participantes: 'Individual únicamente',
      normativaRef: 'Reglamento Arts. 38 al 44 / Procedimiento GD.04.04. P03',
      espacioAcademico: 'Preparación en penúltimo y último nivel según plan de carrera',
      ponderacion: 'Componente Teórico (50%) + Componente Práctico (50%) = Nota Complexivo (Mínimo 7.00/10)',
      fases: [
        {
          nombre: 'Componente Teórico (50% de la nota final)',
          detalles: [
            'Estructurado con 50 reactivos aleatorios tomados de un banco mínimo de 300 reactivos validados.',
            'Ponderación equitativa entre asignaturas seleccionadas de la profesión.',
            'Duración: mínimo 2 horas, máximo 3 horas. Aplicación supervisada.',
            'Normas estrictas: Cédula obligatoria, cero dispositivos electrónicos (celulares, smartwatches, audífonos).',
            'Calificación mínima obligatoria de 7.00/10 para tener derecho a rendir el práctico.',
            'Gracia Teórica: Solicitud en 5 días hábiles con arancel; si reprueba gracia, debe cambiar de opción.'
          ]
        },
        {
          nombre: 'Componente Práctico (50% de la nota final)',
          detalles: [
            'Se rinde hasta 3 días hábiles posteriores a aprobar el teórico.',
            'Consiste en un caso de estudio, resolución de problemas o práctica profesional.',
            'Distribución de la nota del práctico: Trabajo Escrito (3 puntos) + Sustentación Oral (7 puntos) = 10 puntos (mínimo 7.00/10).',
            'Evaluado por Director de Carrera o delegado y dos docentes con cuarto nivel afín.',
            'Gracia Práctica: Solicitud en 5 días hábiles si no alcanza 7/10. Si reprueba gracia, debe cambiar de opción.'
          ]
        },
        {
          nombre: 'Convalidación en Ciencias de la Salud (EHEP CACES)',
          detalles: [
            'Exclusivo para la Facultad de Ciencias de la Salud.',
            'Aplica si aprobó el Examen de Habilitación para el Ejercicio Profesional (EHEP) con nota >= 70%.',
            'Fórmula de equivalencia: y = (1/30) * x + (20/3). Sin redondeo.',
            'Solicitud con al menos 3 días de anticipación preliminar ante el Director de Carrera.'
          ]
        }
      ]
    }
  ];

  const currentMod = modalities.find((m) => m.id === selectedMod)!;

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Catálogo Oficial de Opciones de Titulación UNACH
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Conoce los requisitos, números de integrantes, plazos y fases operativas vigentes aprobadas por el Consejo Universitario.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
            Reglamento Art. 24 · Manual Secc. 6
          </div>
        </div>

        {/* Modalidad Selection Bar (Clean segmented button bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5">
          {modalities.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMod === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMod(m.id as any)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0f2444] bg-[#0f2444] text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                </div>
                <div className="font-semibold text-xs leading-snug">{m.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Modalidad Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header of Detail */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">
              {currentMod.normativaRef}
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{currentMod.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{currentMod.shortDesc}</p>
          </div>

          <div className="flex flex-col sm:items-end gap-1 shrink-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Users className="w-3.5 h-3.5 text-blue-900" />
              <span>{currentMod.participantes}</span>
            </div>
          </div>
        </div>

        {/* Key Info Cards (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-semibold text-slate-900 block mb-1">Ubicación en Malla Curricular:</span>
            <span className="text-slate-600">{currentMod.espacioAcademico}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-semibold text-slate-900 block mb-1">Fórmula de Calificación Oficial:</span>
            <span className="text-slate-600">{currentMod.ponderacion}</span>
          </div>
        </div>

        {/* Step-by-Step Flow */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-900" />
            <span>Fases y Flujo Procedimental Oficial</span>
          </h4>

          <div className="space-y-4">
            {currentMod.fases.map((fase, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-[#fafbfe]">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0f2444] mb-3">
                  <span className="w-6 h-6 rounded-md bg-[#0f2444] text-white flex items-center justify-center text-xs">
                    0{idx + 1}
                  </span>
                  <span>{fase.nombre}</span>
                </div>

                <ul className="space-y-2">
                  {fase.detalles.map((detalle, dIdx) => (
                    <li key={dIdx} className="text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed">
                      <span className="text-slate-400 mt-1">▪</span>
                      <span>{detalle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to ask in Chat */}
        {onSelectTopicForChat && (
          <div className="p-4 bg-slate-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              <span>¿Tienes una situación particular o dudas de plazos sobre {currentMod.title}?</span>
            </div>
            <button
              onClick={() => onSelectTopicForChat(`Explícame los plazos detallados, requisitos y pasos para la modalidad ${currentMod.title}`)}
              className="px-4 py-2 bg-[#0f2444] text-white rounded-lg font-medium hover:bg-[#193766] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Consultar en el Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
