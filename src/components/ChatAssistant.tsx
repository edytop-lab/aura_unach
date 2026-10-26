import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Copy, Check, Sparkles, AlertCircle, HelpCircle, Shield, ArrowRight } from 'lucide-react';
import { PREGUNTAS_FRECUENTES } from '../data/unachKnowledgeBase.ts';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `¡Hola! Te doy una cordial bienvenida a **AURA - Asistente Universitario Reglamento Académico de la UNACH**. 🎓

Estoy aquí para brindarte claridad, tranquilidad y orientación exacta respecto a los reglamentos institucionales, manuales de gestión y tu proceso de titulación de grado. Todas mis respuestas están estrictamente fundamentadas en:
- El **Reglamento de Titulación de las Carreras de Grado de la UNACH** (*Resolución No. 0304-CU-UNACH-SE-EXT-24-09-2025*).
- El **Manual de Gestión de las Opciones de Titulación** (*Resolución No. 0028-CU-UNACH-SE-EXT-02-02-2026 / Código GD.01.04. P01. I01*).
- Los **Procedimientos Oficiales del SGC** (Trabajo de Titulación GD.04.04. P02, Complexivo GD.04.04. P03 y Actualización GD.04.04. P01.I01).

¿En qué etapa de tu titulación te encuentras o qué duda específica te gustaría revisar hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const query = (messageText || input).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      // Build conversation history to send to server-side Gemini endpoint
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, text: m.text }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      if (!response.ok) {
        throw new Error(`Error en servidor: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Lo siento, no se pudo obtener una respuesta en este momento.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Error enviando mensaje:', err);
      const errorMessage: Message = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: `Lo siento, ocurrió una dificultad temporal al consultar la normativa institucional. Te sugiero intentar nuevamente o contactar directamente a Secretaría Académica.\n\n*Fuente: Sistema Institucional de Titulación UNACH*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[750px] bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Header of Chat */}
      <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0f2444] text-white flex items-center justify-center">
            <Bot className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Orientación en Tiempo Real</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-xs text-slate-500">Respuestas normativas oficiales y estrictas</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <Shield className="w-3.5 h-3.5 text-blue-800" />
          <span>RAG Restringido UNACH</span>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 sm:px-6 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
        <span className="text-slate-600 font-semibold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          Consultas rápidas:
        </span>
        {PREGUNTAS_FRECUENTES.slice(0, 5).map((faq, index) => (
          <button
            key={index}
            onClick={() => handleSend(faq.pregunta)}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 hover:text-[#0f2444] hover:border-slate-400 transition-colors shrink-0 whitespace-nowrap"
          >
            {faq.pregunta}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#fafbfe]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl ${
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-semibold shadow-2xs ${
                msg.role === 'user'
                  ? 'bg-slate-700 text-white'
                  : 'bg-[#0f2444] text-amber-400'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`group relative rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#0f2444] text-white shadow-xs'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
              }`}
            >
              {/* Copy message button */}
              <button
                onClick={() => copyToClipboard(msg.text, msg.id)}
                className={`absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
                  msg.role === 'user'
                    ? 'hover:bg-slate-700 text-slate-300'
                    : 'hover:bg-slate-100 text-slate-400'
                }`}
                title="Copiar texto"
              >
                {copiedId === msg.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Message Content */}
              {msg.role === 'user' ? (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              ) : (
                <div className="prose prose-sm max-w-none prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-table:my-2 prose-th:bg-slate-100 prose-th:p-2 prose-td:p-2 prose-td:border prose-td:border-slate-200">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )}

              <div
                className={`text-[10px] mt-2 font-mono ${
                  msg.role === 'user' ? 'text-slate-300 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 mr-auto max-w-lg items-center">
            <div className="w-8 h-8 rounded-lg bg-[#0f2444] text-amber-400 shrink-0 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              <span>Consultando normativas y resoluciones de la UNACH...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta sobre plazos, antiplagio, sustentación, complexivo o reglamentos..."
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2444] focus:border-transparent transition-all pr-10"
              disabled={loading}
            />
            {input.trim().length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono">
                Enter ↵
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-[#0f2444] hover:bg-[#183664] disabled:opacity-40 text-white font-medium text-sm transition-all flex items-center gap-2 shadow-xs shrink-0"
          >
            <span>Preguntar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-blue-900" />
            <span>Respuestas basadas exclusivamente en normativa oficial. Nunca inventa información.</span>
          </span>
          <span className="hidden sm:inline">Soporte: eppalacios@unach.edu.ec</span>
        </div>
      </div>
    </div>
  );
};
