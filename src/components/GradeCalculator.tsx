import React, { useState } from 'react';
import { Calculator, Stethoscope, Award, CheckCircle2, AlertTriangle, Info, HelpCircle } from 'lucide-react';

export const GradeCalculator: React.FC = () => {
  // Simulator State
  const [optionType, setOptionType] = useState<'trabajo' | 'complexivo'>('trabajo');
  const [recordAcademico, setRecordAcademico] = useState<number>(8.5);

  // Trabajo de Titulación
  const [trabajoEscrito, setTrabajoEscrito] = useState<number>(8.5);
  const [sustentacionOral, setSustentacionOral] = useState<number>(9.0);

  // Examen Complexivo
  const [teorico, setTeorico] = useState<number>(8.0);
  const [practicoEscrito, setPracticoEscrito] = useState<number>(2.5); // sobre 3
  const [practicoSustentacion, setPracticoSustentacion] = useState<number>(6.0); // sobre 7

  // EHEP Calculator State
  const [ehepScore, setEhepScore] = useState<number>(82);

  // Calculations
  // 1. Titulación score
  let titulacionScore = 0;
  let isTitulacionApproved = true;
  let validationMessage = '';

  if (optionType === 'trabajo') {
    if (trabajoEscrito < 7) {
      isTitulacionApproved = false;
      validationMessage = 'El trabajo escrito requiere un mínimo de 7.00 puntos para ser aprobado.';
    } else if (sustentacionOral < 7) {
      isTitulacionApproved = false;
      validationMessage = 'La sustentación oral requiere un mínimo de 7.00 puntos. Tendrías derecho a sustentación de gracia (Art. 36).';
    }
    titulacionScore = (trabajoEscrito * 0.40) + (sustentacionOral * 0.60);
  } else {
    const practicoTotal = practicoEscrito + practicoSustentacion;
    if (teorico < 7) {
      isTitulacionApproved = false;
      validationMessage = 'El componente teórico requiere mínimo 7.00 puntos para habilitar el práctico (Art. 42.a).';
    } else if (practicoTotal < 7) {
      isTitulacionApproved = false;
      validationMessage = 'El componente práctico requiere mínimo 7.00 puntos sobre 10 (Art. 42.b).';
    }
    titulacionScore = (teorico * 0.50) + (practicoTotal * 0.50);
  }

  // 2. Final Grade (60% Record + 40% Titulación)
  const finalGrade = (recordAcademico * 0.60) + (titulacionScore * 0.40);

  // 3. EHEP Formula: y = (1/30)*x + (20/3)
  const calculateEhepEquivalent = (score: number) => {
    if (score < 70) return null;
    const raw = (score / 30) + (20 / 3);
    // Math trunc to 2 decimal places without rounding up according to Art. 44 ("sin redondeo")
    return Math.floor(raw * 100) / 100;
  };

  const ehepEquivalent = calculateEhepEquivalent(ehepScore);

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-900" />
          <span>Calculadoras Académicas Oficiales UNACH</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Herramientas oficiales basadas en el Reglamento de Titulación para proyectar tu promedio final de grado y la convalidación del examen EHEP.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CALCULATOR 1: FINAL GRADE SIMULATOR */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[11px] font-mono text-slate-500">Reglamento Art. 49 & Art. 33</span>
                <h3 className="text-lg font-bold text-slate-900">Simulador de Calificación Final de Grado</h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-sm">
                60/40
              </div>
            </div>

            {/* Option Type Selector */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Selecciona tu opción de titulación:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setOptionType('trabajo')}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                    optionType === 'trabajo'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Trabajo de Titulación
                </button>
                <button
                  onClick={() => setOptionType('complexivo')}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                    optionType === 'complexivo'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Examen Complexivo
                </button>
              </div>
            </div>

            {/* Inputs Section */}
            <div className="space-y-4 text-xs">
              {/* Récord Académico de la Carrera */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-800">
                    Promedio Récord Académico de la Carrera (60%):
                  </label>
                  <span className="font-mono font-bold text-blue-950 text-sm">{recordAcademico.toFixed(2)} / 10</span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="10.0"
                  step="0.05"
                  value={recordAcademico}
                  onChange={(e) => setRecordAcademico(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2444]"
                />
                <span className="text-[10px] text-slate-400">Promedio acumulado de todos los semestres</span>
              </div>

              {/* Conditional Inputs based on Option */}
              {optionType === 'trabajo' ? (
                <>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wide text-blue-900">
                      Desglose Trabajo de Titulación (Mínimo 7.00 en c/u)
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Trabajo Escrito (40% de la opción):</span>
                        <span className="font-mono font-bold text-slate-900">{trabajoEscrito.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="5.0"
                        max="10.0"
                        step="0.1"
                        value={trabajoEscrito}
                        onChange={(e) => setTrabajoEscrito(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2444]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Sustentación Oral (60% de la opción):</span>
                        <span className="font-mono font-bold text-slate-900">{sustentacionOral.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="5.0"
                        max="10.0"
                        step="0.1"
                        value={sustentacionOral}
                        onChange={(e) => setSustentacionOral(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2444]"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wide text-blue-900">
                      Desglose Examen Complexivo Teórico-Práctico
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Componente Teórico (50% de la opción, 50 reactivos):</span>
                        <span className="font-mono font-bold text-slate-900">{teorico.toFixed(2)} / 10</span>
                      </div>
                      <input
                        type="range"
                        min="5.0"
                        max="10.0"
                        step="0.1"
                        value={teorico}
                        onChange={(e) => setTeorico(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2444]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Práctico Escrito (sobre 3.00 puntos):</span>
                        <span className="font-mono font-bold text-slate-900">{practicoEscrito.toFixed(2)} / 3.0</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="3.0"
                        step="0.1"
                        value={practicoEscrito}
                        onChange={(e) => setPracticoEscrito(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2444]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Práctico Sustentación (sobre 7.00 puntos):</span>
                        <span className="font-mono font-bold text-slate-900">{practicoSustentacion.toFixed(2)} / 7.0</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="7.0"
                        step="0.1"
                        value={practicoSustentacion}
                        onChange={(e) => setPracticoSustentacion(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2444]"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Result Card */}
          <div className="p-4 rounded-xl bg-[#0f2444] text-white">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-[11px] text-slate-300 uppercase tracking-wide">Calificación Final de Grado</span>
                <div className="text-3xl font-extrabold font-mono text-amber-300">
                  {finalGrade.toFixed(2)} <span className="text-sm font-normal text-slate-300">/ 10</span>
                </div>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-300 block">Opción Titulación:</span>
                <span className="font-mono font-bold text-white text-sm">{titulacionScore.toFixed(2)} / 10</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/60 text-[11px] flex items-center justify-between">
              {isTitulacionApproved ? (
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Cumple con el puntaje mínimo de aprobación (7.00)
                </span>
              ) : (
                <span className="text-amber-300 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {validationMessage}
                </span>
              )}
              <span className="text-slate-400 font-mono">Ponderación: 60% Récord + 40% Titulación</span>
            </div>
          </div>
        </div>

        {/* CALCULATOR 2: EHEP TO TITULACION CONVERSION (HEALTH SCIENCES) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[11px] font-mono text-slate-500">Reglamento de Titulación Art. 44</span>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-emerald-700" />
                  <span>Convalidación EHEP (CACES) · Salud</span>
                </h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
                y=f(x)
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Dirigido exclusivamente a estudiantes de la <strong>Facultad de Ciencias de la Salud</strong> que aprueben el 
              Examen de Habilitación para el Ejercicio Profesional (EHEP) aplicado por el CACES con una calificación igual o superior al 70%.
            </p>

            {/* Formula display */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 mb-5 flex items-center justify-between">
              <span>Fórmula institucional:</span>
              <span className="font-bold text-[#0f2444] bg-white px-2.5 py-1 rounded-md border border-slate-200">
                y = (1 / 30) · x + (20 / 3)
              </span>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-800">
                    Calificación porcentual obtenida en el EHEP (x):
                  </label>
                  <span className="font-mono font-bold text-emerald-800 text-sm">{ehepScore}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  step="1"
                  value={ehepScore}
                  onChange={(e) => setEhepScore(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>60% (No convalidable)</span>
                  <span>70% (Mínimo aprobatorio)</span>
                  <span>100% (Máximo)</span>
                </div>
              </div>

              {/* Step by step manual input */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-slate-600">O ingresa el valor exacto:</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={ehepScore}
                  onChange={(e) => setEhepScore(Math.min(100, Math.max(0, parseInt(e.target.value || '0', 10))))}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg text-center font-mono font-bold text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0f2444]"
                />
                <span className="font-medium text-slate-600">%</span>
              </div>
            </div>
          </div>

          {/* EHEP Result Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white">
            {ehepScore >= 70 ? (
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-[11px] text-emerald-400 uppercase tracking-wide font-semibold">
                      Calificación Equivalente de Titulación (y)
                    </span>
                    <div className="text-3xl font-extrabold font-mono text-white">
                      {ehepEquivalent?.toFixed(2)}{' '}
                      <span className="text-sm font-normal text-slate-400">/ 10.00</span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-300">
                    <span className="block font-mono">Sin redondeo</span>
                    <span className="text-emerald-400 font-semibold">Aprobado</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span>Nota: El registro en el acta considera valores con hasta dos cifras decimales sin redondeo (Art. 44).</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Calificación menor al 70% en el EHEP</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  De acuerdo con el Art. 44 del Reglamento de Titulación de la UNACH, la convalidación solo aplica para calificaciones iguales o mayores a 70%. Quienes no alcancen este porcentaje deberán rendir ambos componentes del examen complexivo regular.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Normative Reference Footnote */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Citas Normativas Oficiales: </span>
          <span>
            Ponderación general establecida en el <strong>Reglamento de Titulación de Carreras de Grado (Resolución No. 0304-CU-UNACH-SE-EXT-24-09-2025, Arts. 33, 42, 44 y 49)</strong> y 
            en el <strong>Manual de Gestión de las Opciones de Titulación (Resolución No. 0028-CU-UNACH-SE-EXT-02-02-2026)</strong>.
          </span>
        </div>
      </div>
    </div>
  );
};
