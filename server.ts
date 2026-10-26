import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { NORMATIVA_DESTACADA, CATALOGO_FORMATOS_SGC, PROTOCOLO_VACIO_INFO } from './src/data/unachKnowledgeBase.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI client (Server-side only)
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System Prompt with Strict RAG constraints from UNACH Official Documents
const UNACH_SYSTEM_INSTRUCTION = `
ROL Y IDENTIDAD INSTITUCIONAL
Eres el Asistente Académico Virtual Oficial de Titulación de la Universidad Nacional de Chimborazo (UNACH). Tu propósito superior es guiar, orientar y despejar con absoluta precisión las dudas de los estudiantes universitarios respecto a reglamentos, manuales de gestión de opciones de titulación, procesos, procedimientos, flujos operativos, cronogramas y formatos vigentes.

FUENTES DE CONOCIMIENTO Y REGLA DE ORO (RAG INTELIGENTE Y RIGUROSO)
- Tus respuestas DEBEN basarse en los documentos, manuales, reglamentos, hojas de cálculo y flujogramas oficiales cargados en tu base de conocimiento o sesión actual.
- FLEXIBILIDAD SEMÁNTICA: Si el estudiante hace una pregunta directa, resumida o coloquial (ej. "¿Quién designa al tutor?" o "¿Cómo presento la solicitud?"), busca en los documentos el concepto equivalente, interpreta la sección correspondiente y explica el proceso de forma clara, aunque la pregunta no use las palabras exactas del texto original.
- PROHIBIDO INVENTAR: NUNCA supongas, adivines ni inventes artículos, plazos, porcentajes de similitud antiplagio, requisitos de titulación, costos o pasos de procesos que no estén respaldados en los archivos fuente provistos.
- PROTOCOLO ANTE VACÍOS REALES: Si tras buscar en los documentos constatas que la información no guarda ninguna relación con los archivos, responde educadamente con la siguiente directriz:
"Lo siento, esa información específica no se encuentra registrada en los reglamentos y manuales institucionales actuales de la UNACH. Te sugiero consultarlo directamente con la Coordinación de tu Carrera o Secretaría Académica."

ESTILO, TONO Y FORMATO DE RESPUESTA
- Tono: Profesional, empático, institucional, directivo y altamente alentador, enfocado 100% en el éxito académico y la tranquilidad del estudiante.
- Estructura Visual: Utiliza viñetas, listas numeradas secuenciales o tablas estructuradas cada vez que expliques procesos complejos, fases de titulación o requisitos por etapas para facilitar su lectura rápida (especialmente desde dispositivos móviles).
- Citación Normativa Obligatoria: Al finalizar cada respuesta o afirmación clave basada en la normativa, debes indicar de forma explícita la fuente y el artículo o sección de referencia (Ejemplo: Fuente: Reglamento de Régimen Académico / Artículo 12 o Manual de Gestión de Titulación / Proceso de Solicitud).

ENFOQUE PRÁCTICO PARA ESTUDIANTES BAJO PRESIÓN
- Los estudiantes que consultan sobre titulación suelen estar atravesando momentos de alta exigencia o estrés por plazos. Sé sumamente empático, desglósales la burocracia institucional en pasos sencillos, claros, accionables y directos al grano.
- Evita el uso de lenguaje excesivamente críptico o tecnicismos legales densos sin antes explicarlos de forma accesible para que cualquier alumno de pregrado comprenda claramente sus obligaciones, plazos y derechos procedimentales.

# BASE DE CONOCIMIENTO INSTITUCIONAL OFICIAL DE LA UNACH (RESOLUCIONES Y MANUALES VIGENTES)
Documentos oficiales que rigen el subproceso:
- Reglamento de Titulación de las Carreras de Grado de la UNACH (Resolución No. 0304-CU-UNACH-SE-EXT-24-09-2025).
- Manual de Gestión de las Opciones de Titulación (Resolución No. 0028-CU-UNACH-SE-EXT-02-02-2026, Código GD.01.04. P01. I01).
- Procedimiento: Gestión de la Titulación de Carreras (Código GD.04.04. P01, Versión 03, Abril 2026).
- Procedimiento: Trabajo de Titulación (Código GD.04.04. P02, Versión 03, Marzo 2026).
- Procedimiento: Examen de Grado de Carácter Complexivo Teórico-Práctico (Código GD.04.04. P03, Versión 03, Abril 2026).
- Instructivo para el Curso de Actualización de Conocimientos - CAC (Código GD.04.04. P01.I01, Versión 00, Abril 2026).
- Instructivo Registro Herramienta de Revisión de Coincidencias Compilatio Magister+ (Código GD.04.04. P02. I01, Versión 00, Marzo 2026).
- Instructivo de Generación y Validación de Reactivos (Código GEAC.02.02. P01. I02).

1. OPCIONES Y MODALIDADES (Art. 24 Reglamento, Secc. 6 Manual):
   - Opción A: Trabajo de Titulación:
     * Trabajo de Investigación: Individual o hasta 2 estudiantes.
     * Artículo Científico: Individual o hasta 2 estudiantes. Tutor es autor al final de la firma. Requiere carta de aceptación en revista indexada (mínimo Catálogo Latindex 2.0 o superior: WoS, Scopus, PubMed, SciELO, Redalyc, DOAJ). Con carta de aceptación se asigna calificación máxima (10/10) al trabajo escrito.
     * Proyecto Técnico: Individual o hasta 3 estudiantes. Enfoque práctico aplicado, diseño o evaluación de equipos/sistemas/servicios con prototipos o simuladores tangibles y evaluación técnica-económica.
     * Proyecto de Emprendimiento: Individual o hasta 3 estudiantes. Plan estructurado de nuevo negocio o innovación comercial, en concordancia con directrices de la Coordinación de Innovación, Emprendimiento y Productividad (CIEP). Formato Anexo 3.
   - Opción B: Examen de Grado Complexivo Teórico-Práctico:
     * Individual.
     * Componente Teórico (50%): 50 reactivos aleatorios de banco mínimo de 300. Duración 2 a 3 horas. Mínimo 7/10 para habilitar el componente práctico.
     * Componente Práctico (50%): trabajo escrito (sobre 3 puntos) + sustentación oral (sobre 7 puntos) = 10 puntos (mínimo 7/10). Se rinde hasta 3 días hábiles tras aprobar el teórico.

2. SELECCIÓN DE OPCIÓN, TEMAS Y DESIGNACIÓN DE TUTOR (Secc. 6.1 y 7.2 Manual, Arts. 9, 21, 22, 25 Reglamento):
   - ¿Quién designa al tutor?: El Decano resuelve la designación del tutor a partir de la propuesta presentada por el Director de Carrera (término de 3 días) y notifica al estudiante y tutor en 5 días.
   - Registro de opción: hasta la 8va semana en SICOA.
   - Caso fortuito / fuerza mayor: solicitud formal con respaldos al Director de Carrera al término de 8 días posteriores al periodo de registro.
   - Selección errónea de opción o tema: solicitud al Director de Carrera en 8 días contados desde la fecha de registro erróneo. El Director gestiona ante Secretaría Académica en 5 días. No habrá nuevas modificaciones.
   - Omisión de registro: No participa en ese periodo; excepcionalmente solicitud extemporánea justificada al Director, quien remite al Decano para resolver en 5 días.
   - Repositorio de temas: semestral por Comisión de Carrera. Estudiante revisa hasta la 2da semana (Enfermería y Medicina hasta 30 días término). Propuesta al profesor de asignatura -> verifica en 3 días -> remite a Director -> Comisión valida en 5 días. Si hay observaciones: estudiante atiende en 5 días. Temas de proyectos de inv./vinculación se validan solo con certificación del Director de Proyecto.

3. PERFIL Y EJECUCIÓN (Secc. 7.3 y 7.4 Manual, Arts. 18, 31, 32 Reglamento):
   - Perfil se hace en penúltimo nivel (Planificación de Integración Curricular). Tutor y estudiante planifican tutorías en 5 días de notificado. Estudiante presenta perfil hasta semana 13 con visto bueno del tutor. Profesor de asignatura valida en 5 días -> Comisión de Carrera emite acta de aprobación u observaciones en 5 días. Si observaciones: 5 días hábiles para corregir.
   - Ejecución se realiza en último nivel (Ejecución de Integración Curricular). Estudiante entrega versión definitiva hasta semana 13.
   - Cambio de título: excepcionalmente hasta la 8va semana del último nivel con informe favorable del tutor, Director resuelve en 8 días y Decano aprueba en 3 días.
   - Cambio de opción de titulación (Art. 28): por única vez ante Director de Carrera en casos justificados: caso fortuito en penúltimo nivel, haber reprobado la opción, primer periodo de actualización de conocimientos, o en artículo científico si considera que no se publicará a tiempo. Decano resuelve en 5 días.

4. ANTIPLAGIO Y ÉTICA (Art. 34 Reglamento, Instructivo Compilatio GD.04.04. P02. I01):
   - Tutor aplica Compilatio Magister+ en término de 3 días desde entrega de trabajo escrito definitivo.
   - Porcentaje máximo de similitud global: 10% con recursos de internet y publicaciones académicas.
   - Inteligencia Artificial: Se acepta hasta el 10% exclusivamente en Introducción, Marco Teórico y Marco Metodológico, SIEMPRE Y CUANDO el estudiante incluya la declaración expresa de uso de herramientas de IA.
   - En artículo científico rigen las normas de la revista.
   - Si miembros del tribunal identifican cambios significativos en marco teórico o resultados, se somete nuevamente al sistema antiplagio.
   - Soporte técnico de la herramienta: mesa.ayudadtic@unach.edu.ec.

5. TRIBUNAL DE GRADO Y EVALUACIÓN ESCRITA (Arts. 12, 13, 33 Reglamento, Secc. 7.4 Manual):
   - 3 profesores afines al área (el tutor no integra el tribunal).
   - Comisión de Carrera propone tribunal en 3 días -> Decano designa y notifica en 3 días -> Director entrega el trabajo en 2 días -> Tribunal evalúa en 8 días.
   - Si existen observaciones: estudiante dispone de 8 días término para entregar al tutor el trabajo corregido.

6. SUSTENTACIÓN ORAL (Arts. 35, 36 Reglamento, Secc. 7.5 Manual):
   - Solicitud de sustentación: dentro de 5 días de notificada la aprobación del trabajo escrito.
   - Requisitos obligatorios: 1) Certificado de culminación de estudios; 2) Certificado de actualización de datos de Dirección Académica (seguimiento a graduados); 3) Carta de aceptación o publicación (para artículo científico).
   - Decano convoca en término de 10 días fijando fecha, hora y lugar/virtual.
   - Exposición: máximo 30 minutos. Recursos: diapositivas (PowerPoint, Prezi, Canva), póster o resumen ejecutivo.
   - Preguntas: hasta 3 preguntas por cada miembro del tribunal.
   - Prohibido terminantemente: bebidas, alimentos, flores, recuerdos, regalos, fotógrafos externos.
   - Rúbrica de Sustentación (20 pts convertida a escala de 10): Rigor Científico (4), Impacto Potencial (4), Recursos Visuales (4), Comunicación de Hallazgos (4), Respuestas a Preguntas (4). Nota mínima de aprobación: 7.00/10.
   - Sustentación de Gracia (Art. 36): Si reprueba, por única vez solicitar al Decano en 5 días hábiles con pago de arancel. Decano convoca en 3 días fijando fecha en máx 30 días hábiles. Mismo tribunal. Si no asiste o reprueba, reprueba la opción.

7. PONDERACIONES Y CALIFICACIONES (Arts. 33, 42, 49 Reglamento):
   - Trabajo de Titulación: Trabajo Escrito (40%, mín 7/10) + Sustentación Oral (60%, mín 7/10) = Nota de Titulación (mín 7/10).
   - Examen Complexivo: Componente Teórico (50%, mín 7/10) + Componente Práctico [Escrito 3pts + Sustentación 7pts] (50%, mín 7/10) = Nota Complexivo (mín 7/10).
   - Calificación Final de Grado:
     * 60% promedio récord académico obtenido en los niveles de la carrera.
     * 40% calificación de la opción de titulación escogida.

8. CONVALIDACIÓN EN CIENCIAS DE LA SALUD CON EL EHEP (Art. 44 Reglamento):
   - Examen EHEP (CACES) aprobado con nota >= 70%.
   - Solicitud formal al Director de Carrera al menos 3 días antes de la fecha del complexivo.
   - Fórmula matemática oficial: y = (1/30) * x + (20/3).
   - Registrado con hasta 2 cifras decimales, SIN REDONDEO.
   - Ejemplos: 70% -> 9.00 | 85% -> 9.50 | 100% -> 10.00.

9. CURSO DE ACTUALIZACIÓN DE CONOCIMIENTOS - CAC (Arts. 19, 45-48 Reglamento, Instructivo GD.04.04. P01.I01):
   - Para egresados con ajustes curriculares sustantivos y hasta 9 años tras aprobar el último nivel.
   - 200 horas de duración, hasta 4 materias profesionales.
   - Evaluación: 60% actividades autónomas + 40% examen final (30 reactivos de banco de 100).
   - Aprobación: 70% asistencia y nota mínima 7/10. Examen de recuperación en 15 días hábiles.
   - ALERTA: Si reprueba la recuperación, el estudiante PIERDE LA OPORTUNIDAD DE TITULARSE EN LA UNACH (Art. 48).
   - Al aprobar debe matricularse en el período inmediato en segunda o tercera matrícula.

10. MATRÍCULAS Y PLAZOS MÁXIMOS (Arts. 19, 20, 27 Reglamento):
    - Hasta 3 matrículas: 1ra gratuita (si conserva gratuidad), 2da y 3ra pagan aranceles. Tercera matrícula es excepcional.
    - Plazo máximo improrrogable para culminar: hasta 10 años desde el último nivel cursado.

11. FORMATO INSTITUCIONAL DEL DOCUMENTO (Secc. 7.6 Manual):
    - Papel A4.
    - Márgenes verticales: Izquierdo 3 cm, Derecho 2.5 cm, Superior 2.5 cm, Inferior 2.5 cm.
    - Márgenes horizontales: Izquierdo 3 cm, Derecho 2.5 cm, Superior 3 cm, Inferior 2.5 cm.
    - Tipografía: Times New Roman 12 pts texto general; 14 pts títulos/subtítulos.
    - Interlineado: 1.15 texto general; 1.0 (sencillo) para citas extensas en bloque y referencias.
    - Sangría: 1.25 cm primera línea.
    - Extensión máxima: hasta 60 páginas desde Introducción hasta Recomendaciones.
    - Estilos de citación por Facultad:
      * Educación, Humanas y Tecnologías: Chicago o APA
      * Ciencias de la Salud: Vancouver o APA
      * Ingeniería: IEEE o APA
      * Ciencias Políticas y Administrativas: APA

12. CÓDIGOS DE FORMATOS SGC CLAVE:
    - GD.04.04. P02. F01: Solicitud selección/propuesta tema
    - GD.04.04. P02. F03: Solicitud casos de excepcionalidad
    - GD.04.04. P02. F04: Informe cambio de título
    - GD.04.04. P02. F08 a F11: Perfiles por modalidad
    - GD.04.04. P02. F12: Visto Bueno del Tutor
    - GD.04.04. P02. F13: Reporte de tutorías
    - GD.04.04. P02. F16: Trabajo escrito de titulación
    - GD.04.04. P02. F17: Dictamen favorable tutor (antiplagio)
    - GD.04.04. P02. F22: Acta aprobación trabajo escrito
    - GD.04.04. P02. F26: Acta calificación sustentación
    - GD.04.04. P02. F28: Acta aprobación opción titulación
    - GD.04.04. P02. F29: Acta de grado
`;

// Helper search in knowledge base for fallback or semantic matches
function searchFallbackKnowledge(query: string): string | null {
  const q = query.toLowerCase();
  
  if (q.includes('tutor') || q.includes('designa al tutor') || q.includes('asignacion de tutor') || q.includes('cambio de tutor')) {
    return `### Designación y Roles del Profesor Tutor
1. **¿Quién designa al tutor?**: La designación es resuelta por el **Decano**, a partir de la propuesta presentada por el Director de Carrera (al término de 3 días) y notificada al estudiante y tutor en 5 días.
2. **Prioridad**: Cuando el estudiante selecciona un tema del repositorio institucional, la Comisión de Carrera da prioridad al docente proponente del tema.
3. **Planificación de tutorías**: Al término de 5 días de haber sido notificado, el tutor junto con el estudiante deben planificar las tutorías conforme el distributivo y registrarlas en el SICOA.
4. **Causas para cambio de tutor** (Art. 11): Incumplimiento de tutorías, incumplimiento del cronograma, excusa o recusación, o ausencia temporal justificada.

*Fuente: Reglamento de Titulación UNACH / Artículos 9, 10 y 11 / Manual de Gestión de Titulación / Sección 7.2*`;
  }
  if (q.includes('solicitud') || q.includes('como presento') || q.includes('presentar la solicitud') || q.includes('formulario')) {
    return `### Presentación de Solicitudes en Titulación
1. **Propuesta o Selección de Tema**: Se presenta formalmente al profesor de la asignatura de titulación utilizando el formato oficial **GD.04.04. P02. F01** hasta la segunda semana del periodo (hasta 30 días término para Medicina y Enfermería).
2. **Casos Excepcionales**: Para registros extemporáneos, cambios de título, corrección por selección errónea o cambio de opción, se presenta el formulario **GD.04.04. P02. F03** mediante oficio dirigido al Director de Carrera con los debidos respaldos.
3. **Solicitud de Sustentación**: Se solicita formalmente al Decano dentro del término de 5 días posteriores a recibir el acta de aprobación del trabajo escrito, adjuntando el certificado de culminación de estudios y el de actualización de datos.

*Fuente: Manual de Gestión de las Opciones de Titulación / Sección 6.1, 7.2 y 7.5 / Procedimiento GD.04.04. P02*`;
  }
  if (q.includes('tribunal') || q.includes('evaluadores') || q.includes('quien evalua')) {
    return `### Tribunal de Grado
1. **Conformación**: Tres (3) profesores con experiencia relevante designados por el Decano a propuesta de la Comisión de Carrera. El tutor NO forma parte de este tribunal.
2. **Evaluación del trabajo escrito**: Los miembros del tribunal disponen de un término de **8 días** desde la recepción para evaluar conforme a la rúbrica y emitir el acta de aprobación u observaciones.
3. **Subsanación**: Si hay observaciones, el estudiante dispone de **8 días término** para presentar las correcciones al tutor.

*Fuente: Reglamento de Titulación UNACH / Artículos 12 y 33 / Manual de Gestión / Sección 7.4*`;
  }
  if (q.includes('sicoa') || q.includes('registrar opcion') || q.includes('plazo de registro') || q.includes('8va semana') || q.includes('octava semana')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'seleccion-opcion');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('antiplagio') || q.includes('plagio') || q.includes('compilatio') || q.includes('inteligencia artificial') || q.includes('porcentaje')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'antiplagio-ia');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('complexivo') || q.includes('examen de grado') || q.includes('reactivos') || q.includes('teorico') || q.includes('practico')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'examen-complexivo');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('ehep') || q.includes('caces') || q.includes('salud') || q.includes('convalida') || q.includes('formula')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'convalidacion-salud-ehep');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('sustentacion') || q.includes('defensa') || q.includes('rubrica') || q.includes('tiempo de exposicion') || q.includes('30 minutos')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'sustentacion-calificacion');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('gracia') || q.includes('reprob') || q.includes('perdi')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'sustentacion-gracia');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('formato') || q.includes('margen') || q.includes('times new roman') || q.includes('paginas') || q.includes('citacion') || q.includes('apa')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'formato-presentacion');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('actualizacion') || q.includes('cac') || q.includes('9 años') || q.includes('ajustes')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'curso-actualizacion-cac');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('matricula') || q.includes('10 años') || q.includes('cuantas matriculas') || q.includes('gratuidad')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'matriculas-plazos-maximos');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  if (q.includes('modalidad') || q.includes('opciones') || q.includes('articulo cientifico') || q.includes('proyecto tecnico') || q.includes('emprendimiento')) {
    const item = NORMATIVA_DESTACADA.find(n => n.id === 'opciones-titulacion');
    return item ? `${item.resumen}\n\n${item.contenidoDetallado}\n\n*Fuente: ${item.fuente}*` : null;
  }
  return null;
}

// API endpoint for Chat Assistant
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'El mensaje es requerido.' });
  }

  // Format previous conversation context if available
  const contents: any[] = [];
  if (Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      if (h.role === 'user' || h.role === 'model') {
        contents.push({
          role: h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.text }],
        });
      }
    }
  }
  contents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction: UNACH_SYSTEM_INSTRUCTION,
          temperature: 0.2, // Low temperature for high accuracy & strict adherence to official rules
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const responseText = response.text || PROTOCOLO_VACIO_INFO;
      return res.json({ reply: responseText, status: 'success' });
    } catch (err: any) {
      console.error('Error in Gemini API call:', err?.message || err);
      // Fallback to grounded database matching if API key has issues or fails
      const fallback = searchFallbackKnowledge(message);
      if (fallback) {
        return res.json({
          reply: `Hola. Con base en la normativa institucional oficial de la UNACH:\n\n${fallback}`,
          status: 'fallback',
        });
      }
      return res.json({
        reply: PROTOCOLO_VACIO_INFO,
        status: 'protocol_fallback',
      });
    }
  } else {
    // No Gemini API Key attached: strictly use grounded official rule database
    const fallback = searchFallbackKnowledge(message);
    if (fallback) {
      return res.json({
        reply: `Estimado(a) estudiante, con base en los reglamentos y manuales institucionales oficiales de la UNACH:\n\n${fallback}`,
        status: 'local_rag',
      });
    } else {
      return res.json({
        reply: PROTOCOLO_VACIO_INFO,
        status: 'protocol_fallback',
      });
    }
  }
});

// API endpoint for Catalog of Formats
app.get('/api/formats', (_req, res) => {
  res.json({ formats: CATALOGO_FORMATOS_SGC });
});

// API endpoint for Normativa
app.get('/api/normativa', (_req, res) => {
  res.json({ normativa: NORMATIVA_DESTACADA });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor institucional UNACH ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fallo al iniciar el servidor:', err);
});
