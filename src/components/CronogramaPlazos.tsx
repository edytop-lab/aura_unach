import React from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, ChevronRight, FileClock, ShieldAlert } from 'lucide-react';

export const CronogramaPlazos: React.FC = () => {
  const hitosSemanales = [
    {
      semana: 'Semana 1',
      hito: 'Apertura de Convocatoria y Repositorio de Temas',
      instancia: 'Director de Carrera',
      norma: 'Reglamento Art. 22.a / Procedimiento GD.04.04. P01 (Act. 12)',
      descripcion: 'El Director solicita a los docentes de la carrera al menos un tema de investigación para nutrir el repositorio oficial.'
    },
    {
      semana: 'Semana 2',
      hito: 'Selección o Propuesta de Tema por el Estudiante',
      instancia: 'Estudiante / Profesor de Asignatura',
      norma: 'Manual Sección 7.2.1 / Procedimiento GD.04.04. P02 (Act. 1)',
      descripcion: 'El estudiante revisa el repositorio y selecciona su tema de interés o propone uno propio. (Nota: Para Medicina y Enfermería este plazo se extiende hasta 30 días término).'
    },
    {
      semana: 'Semana 4',
      hito: 'Socialización Oficial de las Opciones de Titulación',
      instancia: 'Director y Comisión de Carrera',
      norma: 'Reglamento Art. 25 / Procedimiento GD.04.04. P01 (Act. 7)',
      descripcion: 'Socialización a los estudiantes del nivel inmediato anterior para que conozcan las modalidades aprobadas en la malla curricular.'
    },
    {
      semana: 'Semana 7',
      hito: 'Validación de Temas por la Comisión de Carrera',
      instancia: 'Comisión de Carrera',
      norma: 'Reglamento Art. 22.c / Procedimiento GD.04.04. P01 (Act. 14)',
      descripcion: 'La Comisión de Carrera valida en SICOA los temas propuestos aplicando la rúbrica oficial de pertinencia y equilibrio temático.'
    },
    {
      semana: 'Semana 8',
      hito: 'Límite Máximo para Selección de Opción en SICOA',
      instancia: 'Estudiante',
      norma: 'Manual Sección 6.1 / Reglamento Art. 25',
      descripcion: 'Hito crítico: El estudiante debe registrar obligatoriamente su opción de titulación a través del SICOA hasta la 8va semana.'
    },
    {
      semana: 'Semana 8 (Último Nivel)',
      hito: 'Límite para Manuscrito de Artículo Científico y Cambio de Título',
      instancia: 'Estudiante / Tutor',
      norma: 'Manual Sección 7.4.2 / Reglamento Art. 32',
      descripcion: 'En artículo científico se entrega manuscrito al tutor. Para cambio excepcional de título de investigación, es el plazo límite de solicitud.'
    },
    {
      semana: 'Semana 13 (Penúltimo Nivel)',
      hito: 'Entrega del Perfil de Titulación Concluido',
      instancia: 'Estudiante y Tutor',
      norma: 'Manual Sección 7.3.3 / Procedimiento GD.04.04. P02 (Act. 10)',
      descripcion: 'El estudiante cuenta con el perfil concluido y con el visto bueno del tutor para someterlo a validación del docente de asignatura y Comisión de Carrera.'
    },
    {
      semana: 'Semana 13 (Último Nivel)',
      hito: 'Entrega del Trabajo Escrito Definitivo',
      instancia: 'Estudiante y Tutor',
      norma: 'Manual Sección 7.4.1.2 / Procedimiento GD.04.04. P02 (Act. 14)',
      descripcion: 'Presentación del ejemplar completo para que el tutor aplique la herramienta de similitud Compilatio en término de 3 días y emita dictamen favorable.'
    }
  ];

  const terminosClave = [
    {
      dias: '2 Días',
      detalle: 'El Director de Carrera remite el trabajo escrito validado a los miembros del tribunal de grado.'
    },
    {
      dias: '3 Días',
      detalle: 'El tutor aplica la herramienta antiplagio institucional tras recibir el trabajo definitivo y emite su dictamen.'
    },
    {
      dias: '3 Días',
      detalle: 'La Comisión de Carrera analiza la petición y elabora la propuesta de tribunal de grado.'
    },
    {
      dias: '3 Días',
      detalle: 'El Decano aprueba mediante resolución administrativa la designación del tribunal.'
    },
    {
      dias: '5 Días',
      detalle: 'Plazo para que tutor y estudiante planifiquen las tutorías tras ser notificados.'
    },
    {
      dias: '5 Días Hábiles',
      detalle: 'Plazo del estudiante para subsanar observaciones al perfil emitidas por la Comisión.'
    },
    {
      dias: '5 Días',
      detalle: 'Plazo tras ser notificado con la aprobación del trabajo escrito para solicitar fecha de sustentación al Decano.'
    },
    {
      dias: '5 Días Hábiles',
      detalle: 'Plazo para solicitar la sustentación de gracia o el examen complexivo de gracia tras reprobar.'
    },
    {
      dias: '8 Días',
      detalle: 'Plazo para presentar reclamos por selección errónea de opción o tema en SICOA.'
    },
    {
      dias: '8 Días Término',
      detalle: 'Los miembros del tribunal evalúan el trabajo escrito y emiten el acta de aprobación u observaciones.'
    },
    {
      dias: '8 Días Término',
      detalle: 'Plazo improrrogable que tiene el estudiante para entregar al tutor el trabajo corregido subsanando observaciones del tribunal.'
    },
    {
      dias: '10 Días',
      detalle: 'El Decano verifica el cumplimiento de requisitos y fija fecha, hora y lugar de la sustentación oral.'
    },
    {
      dias: 'Hasta 30 Días Hábiles',
      detalle: 'Plazo máximo en que el Decano fija la fecha para la sustentación de gracia.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-900" />
          <span>Cronograma, Semanas Académicas y Plazos de Ley</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Guía de navegación temporal para evitar contratiempos, retrasos administrativos o pérdidas de matrículas en la UNACH.
        </p>
      </div>

      {/* Grid of Weeks (Timeline) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">Hitos por Semanas del Periodo Académico</h3>
          <p className="text-xs text-slate-500">Planifica tus entregas según las semanas efectivas de clase del calendario institucional.</p>
        </div>

        <div className="space-y-4">
          {hitosSemanales.map((item, index) => (
            <div 
              key={index} 
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-[#fafbfe] hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded bg-[#0f2444] text-white font-mono font-bold text-xs">
                    {item.semana}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{item.hito}</h4>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {item.instancia}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                {item.descripcion}
              </p>

              <div className="text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-200/60">
                {item.norma}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminos en Días Hábiles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">Términos Clave en Días Hábiles y Procedimentales</h3>
          <p className="text-xs text-slate-500">Tiempos reglamentarios para respuestas de autoridades, tribunales y subsanación de estudiantes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {terminosClave.map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="font-mono font-bold text-sm text-[#0f2444] block mb-1">
                  {item.dias}
                </span>
                <p className="text-slate-700 leading-relaxed">{item.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contingencias y Casos de Excepcionalidad */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Protocolos de Excepcionalidad y Tranquilidad del Estudiante</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
            <span className="font-bold text-amber-900 block mb-1">Caso Fortuito o Fuerza Mayor (Art. 3.b)</span>
            <p className="text-slate-700 leading-relaxed">
              Enfermedad grave (certificado Red Pública o validado IESS/Salud Universitaria), accidente, calamidad doméstica justificada o desastre. 
              Permite solicitar prórrogas o registro fuera de plazo dentro de 8 días posteriores a la finalización del periodo ante el Director de Carrera.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80">
            <span className="font-bold text-blue-900 block mb-1">Sustentación y Complexivo de Gracia</span>
            <p className="text-slate-700 leading-relaxed">
              Si no alcanzas los 7.00 puntos en la sustentación oral o en la prueba teórica/práctica del complexivo, 
              no te desanimes: tienes derecho por única vez a solicitar la evaluación de gracia en 5 días hábiles con pago de arancel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
