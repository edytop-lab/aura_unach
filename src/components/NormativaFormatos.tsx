import React, { useState } from 'react';
import { FileSpreadsheet, Search, BookOpen, FileText, CheckCircle2, Copy, Check, Filter } from 'lucide-react';
import { CATALOGO_FORMATOS_SGC, FormatoOficial } from '../data/unachKnowledgeBase.ts';

export const NormativaFormatos: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('todas');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredFormats = CATALOGO_FORMATOS_SGC.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.codigo.toLowerCase().includes(q) ||
      item.nombre.toLowerCase().includes(q) ||
      item.descripcion.toLowerCase().includes(q) ||
      item.procedimiento.toLowerCase().includes(q)
    );
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-blue-900" />
          <span>Formatos Oficiales del Sistema de Gestión de la Calidad (SGC)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Inventario oficial de formularios, actas y certificados codificados para el proceso de titulación en la UNACH (Procedimientos GD.04.04. P01, P02 y P03).
        </p>
      </div>

      {/* Normativa de Formato y Estilo de Presentación (Manual Secc. 7.6) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-[11px] font-mono text-slate-500">Manual de Gestión de las Opciones de Titulación · Sección 7.6</div>
          <h3 className="text-lg font-bold text-slate-900">Normas Oficiales de Presentación del Trabajo Escrito</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Márgenes (Páginas Verticales)</span>
            <ul className="text-slate-600 space-y-1">
              <li>• Izquierdo: <strong>3.0 cm</strong></li>
              <li>• Derecho: <strong>2.5 cm</strong></li>
              <li>• Superior: <strong>2.5 cm</strong></li>
              <li>• Inferior: <strong>2.5 cm</strong></li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Tipografía e Interlineado</span>
            <ul className="text-slate-600 space-y-1">
              <li>• Fuente: <strong>Times New Roman</strong></li>
              <li>• Texto general: <strong>12 puntos</strong></li>
              <li>• Títulos/capítulos: <strong>14 puntos</strong></li>
              <li>• Interlineado: <strong>1.15</strong> (1.0 en referencias)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Paginación y Sangría</span>
            <ul className="text-slate-600 space-y-1">
              <li>• Sangría: <strong>1.25 cm</strong> en 1ra línea</li>
              <li>• Ubicación: Esquina inferior derecha</li>
              <li>• Números: Arábigos (1, 2, 3...)</li>
              <li>• Visible desde: <strong>Introducción</strong></li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Extensión Máxima</span>
            <ul className="text-slate-600 space-y-1">
              <li>• Límite: <strong>Hasta 60 páginas</strong></li>
              <li>• Tramo: Introducción a Recomendaciones</li>
              <li>• Preliminares: No cuentan en el límite</li>
              <li>• Anexos: No cuentan en el límite</li>
            </ul>
          </div>
        </div>

        {/* Citas y Referencias por Facultad */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
            Normas de Citación Bibliográfica por Facultad (Manual Sección 7.6.5)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block">Ciencias de la Educación, Humanas y Tecnologías</span>
              <span className="text-[#0f2444] font-mono font-bold mt-1 inline-block">Chicago o APA</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block">Facultad de Ciencias de la Salud</span>
              <span className="text-[#0f2444] font-mono font-bold mt-1 inline-block">Vancouver o APA</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block">Facultad de Ingeniería</span>
              <span className="text-[#0f2444] font-mono font-bold mt-1 inline-block">IEEE o APA</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block">Ciencias Políticas y Administrativas</span>
              <span className="text-[#0f2444] font-mono font-bold mt-1 inline-block">APA</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND TABLE OF SGC FORMATS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Buscador de Formatos Institucionales</h3>
            <p className="text-xs text-slate-500">Localiza rápidamente el código y nombre del formato que necesitas presentar.</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar formato, código o trámite..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0f2444]"
            />
          </div>
        </div>

        {/* Table of Formats */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Código Oficial SGC</th>
                <th className="py-2.5 px-3 font-semibold">Nombre del Formato</th>
                <th className="py-2.5 px-3 font-semibold">Procedimiento</th>
                <th className="py-2.5 px-3 font-semibold">Instancia Custodio</th>
                <th className="py-2.5 px-3 font-semibold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFormats.map((formato) => (
                <tr key={formato.codigo} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0f2444] whitespace-nowrap">
                    {formato.codigo}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    <div>{formato.nombre}</div>
                    <div className="text-[11px] text-slate-500">{formato.descripcion}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {formato.procedimiento}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {formato.instanciaCustodio}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => copyCode(formato.codigo)}
                      className="px-2.5 py-1 text-[11px] font-medium rounded border border-slate-200 hover:border-slate-400 bg-white text-slate-700 transition-colors inline-flex items-center gap-1"
                      title="Copiar código oficial"
                    >
                      {copiedCode === formato.codigo ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredFormats.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No se encontraron formatos coincidentes con "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
