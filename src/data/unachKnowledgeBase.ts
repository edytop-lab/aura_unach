/**
 * BASE DE CONOCIMIENTO OFICIAL INSTITUCIONAL - TITULACIÓN UNACH
 * Documentos fuente:
 * 1. Reglamento de Titulación de las Carreras de Grado de la UNACH (Resolución No. 0304-CU-UNACH-SE-EXT-24-09-2025)
 * 2. Manual de Gestión de las Opciones de Titulación (Resolución No. 0028-CU-UNACH-SE-EXT-02-02-2026, GD.01.04. P01. I01)
 * 3. Procedimiento Gestión de la Titulación de Carreras (GD.04.04. P01, Versión 03, 13-04-2026)
 * 4. Procedimiento Trabajo de Titulación (GD.04.04. P02, Versión 03, 23-03-2026)
 * 5. Procedimiento Examen de Grado Complexivo Teórico-Práctico (GD.04.04. P03, Versión 03, 13-04-2026)
 * 6. Instructivo para el Curso de Actualización de Conocimientos (GD.04.04. P01.I01, Versión 00, 13-04-2026)
 * 7. Instructivo Registro Herramienta de Revisión de Coincidencias - Compilatio (GD.04.04. P02. I01, Versión 00, 23-03-2026)
 * 8. Instructivo Generación y Validación de Reactivos UNACH (GEAC.02.02. P01. I02)
 */

export const PROTOCOLO_VACIO_INFO = 
  "Lo siento, esa información específica no se encuentra registrada en los reglamentos y manuales institucionales actuales de la UNACH. Te sugiero consultarlo directamente con la Coordinación de tu Carrera o Secretaría Académica.";

export interface NormativaItem {
  id: string;
  titulo: string;
  fuente: string;
  categoria: 'opciones' | 'plazos' | 'antiplagio' | 'evaluacion' | 'formato' | 'excepcionalidad' | 'complexivo' | 'actualizacion';
  resumen: string;
  contenidoDetallado: string;
}

export const NORMATIVA_DESTACADA: NormativaItem[] = [
  {
    id: 'opciones-titulacion',
    titulo: 'Opciones y Modalidades de Titulación Vigentes',
    fuente: 'Reglamento de Titulación UNACH (Art. 24) y Manual de Gestión (Secc. 6)',
    categoria: 'opciones',
    resumen: 'Se contemplan 2 grandes opciones: Trabajo de Titulación (con 4 modalidades) y Examen de Grado Complexivo Teórico-Práctico.',
    contenidoDetallado: `Las opciones de titulación aprobadas son:
1. Trabajo de Titulación:
   - Trabajo de Investigación (Individual o hasta 2 estudiantes).
   - Artículo Científico (Individual o hasta 2 estudiantes; el tutor figura al final; con carta de aceptación o publicación se otorga nota 10/10 en trabajo escrito).
   - Proyecto Técnico (Individual o hasta 3 estudiantes; requiere prototipos, simuladores o herramientas tangibles y viabilidad técnica-económica).
   - Proyecto de Emprendimiento (Individual o hasta 3 estudiantes; enfocado en plan de negocios innovador, coordinado con la CIEP).
2. Examen de Grado de Carácter Complexivo Teórico - Práctico:
   - Individual.
   - Componente Teórico (50%): 50 reactivos aleatorios de un banco institucional mínimo de 300, tiempo 2 a 3 horas, nota mínima 7/10 para habilitar el práctico.
   - Componente Práctico (50%): trabajo escrito (3 puntos) + sustentación oral (7 puntos) = 10 puntos (mínimo 7/10).`
  },
  {
    id: 'seleccion-opcion',
    titulo: 'Selección de la Opción de Titulación en SICOA y Plazos',
    fuente: 'Reglamento de Titulación (Art. 25) y Manual de Gestión (Secc. 6.1)',
    categoria: 'plazos',
    resumen: 'El estudiante debe seleccionar su opción de titulación a través del módulo de SICOA hasta la 8va semana del periodo académico.',
    contenidoDetallado: `Procedimiento de selección y contingencias:
- Plazo Ordinario: Hasta la octava (8va) semana del periodo académico a través del SICOA (previamente socializado en semana 4).
- Caso Fortuito o Fuerza Mayor: Solicitud formal mediante oficio dirigida al Director de Carrera adjuntando respaldos, al término de 8 días posteriores a la finalización del periodo de registro.
- Selección Errónea: Solicitud formal al Director de Carrera al término de 8 días contados a partir de la fecha de selección errónea para eliminarla. El Director gestiona en 5 días ante Secretaría Académica. Una vez confirmado no hay nuevas modificaciones.
- Omisión de Registro: No podrá participar en la titulación de dicho periodo; de manera excepcional fundamentada, solicitud extemporánea al Director, quien remite al Decano para resolver en 5 días.`
  },
  {
    id: 'antiplagio-ia',
    titulo: 'Originalidad, Antiplagio (Compilatio) y Uso Permitido de IA',
    fuente: 'Reglamento de Titulación UNACH (Art. 34) e Instructivo GD.04.04. P02. I01',
    categoria: 'antiplagio',
    resumen: 'Máximo 10% de similitud global. Se admite hasta 10% de IA exclusivamente en introducción, marco teórico y metodológico con declaración obligatoria.',
    contenidoDetallado: `Reglas de originalidad:
- Porcentaje máximo de similitud global: 10% con recursos de internet, publicaciones científicas y otros contenidos académicos mediante la herramienta oficial institucional Compilatio Magister+.
- Inteligencia Artificial (IA): Se podrá aceptar el uso de herramientas de IA en los apartados de Introducción, Marco Teórico y Metodológico hasta el 10%, SIEMPRE Y CUANDO el estudiante incorpore en el documento la declaración expresa de uso de dichas herramientas.
- Incumplimiento: Implica la devolución inmediata del documento para el correspondiente ajuste.
- Artículo Científico: No aplican los porcentajes precedentes, rigen las condiciones fijadas por la revista indexada seleccionada.
- Cambios significativos por tribunal: Si tras observaciones hay cambios sustanciales de fuentes en marco teórico o discusión, el tutor debe someter nuevamente el trabajo a verificación antiplagio.`
  },
  {
    id: 'sustentacion-calificacion',
    titulo: 'Sustentación Oral, Rúbrica y Ponderación de Calificaciones',
    fuente: 'Reglamento de Titulación (Arts. 33, 35, 49) y Manual de Gestión (Secc. 7.5, 7.5.1)',
    categoria: 'evaluacion',
    resumen: 'Ponderación: 40% trabajo escrito + 60% sustentación. La nota final de grado se compone de 60% récord académico + 40% opción de titulación.',
    contenidoDetallado: `Procedimiento de Sustentación Oral y Notas:
- Solicitud de Sustentación: El estudiante tiene 5 días tras ser notificado con la aprobación del trabajo escrito para pedir fecha al Decano.
- Requisitos obligatorios: 1) Certificado de culminación de estudios; 2) Certificado de actualización de datos de seguimiento a graduados (emitido por Dirección Académica); 3) Carta de aceptación o publicación (para artículo científico).
- Convocatoria del Decano: Fija fecha, hora y lugar/virtual en 10 días tras recibir la solicitud.
- Tiempo de exposición: Máximo 30 minutos.
- Preguntas: Hasta 3 preguntas por cada miembro del tribunal de grado.
- Prohibición estricta: No se permite bebidas, alimentos, arreglos florales, obsequios ni fotógrafos externos que desvirtúen el acto solemne.
- Rúbrica de Evaluación (20 puntos convertidos a escala de 10):
  1. Rigor Científico (4 pts)
  2. Impacto Potencial (4 pts)
  3. Uso adecuado de recursos visuales (4 pts)
  4. Comunicación de hallazgos (4 pts)
  5. Respuestas a preguntas (4 pts)
- Calificación Trabajo de Titulación: Trabajo Escrito (40%, mín 7/10) + Sustentación (60%, mín 7/10) = Nota Titulación (mín 7/10).
- Calificación Final de Grado: 60% promedio récord académico de la carrera + 40% calificación de titulación.`
  },
  {
    id: 'sustentacion-gracia',
    titulo: 'Sustentación de Gracia (Oportunidad por Única Vez)',
    fuente: 'Reglamento de Titulación UNACH (Art. 36)',
    categoria: 'excepcionalidad',
    resumen: 'Si reprueba la sustentación oral, el estudiante tiene derecho por única vez a sustentación de gracia solicitándola en 5 días hábiles.',
    contenidoDetallado: `Reglas de la Sustentación de Gracia:
- Plazo de Solicitud: Hasta 5 días hábiles subsiguientes a la fecha de la primera sustentación mediante oficio dirigido al Decano.
- Pago de Arancel: Obligatorio comprobante de pago de arancel correspondiente, por cuanto pierde la gratuidad para este acto.
- Convocatoria: El Decano notifica en 3 días hábiles la fecha, fijándola hasta 30 días hábiles posteriores a la solicitud del estudiante.
- Tribunal: Actúa el mismo tribunal de grado.
- Consecuencia de reprobación: Si el estudiante no asiste o no obtiene la nota mínima de 7/10, reprobará la opción de titulación escogida.`
  },
  {
    id: 'formato-presentacion',
    titulo: 'Criterios de Formato General y Extensión del Trabajo Escrito',
    fuente: 'Manual de Gestión de las Opciones de Titulación (Sección 7.6)',
    categoria: 'formato',
    resumen: 'Papel A4, márgenes 3cm izq y 2.5cm resto, Times New Roman 12/14, interlineado 1.15, hasta 60 páginas.',
    contenidoDetallado: `Normas tipográficas y de maquetación:
- Papel: A4 (21 x 29.7 cm).
- Márgenes en vertical: Izquierdo 3.0 cm, Derecho 2.5 cm, Superior 2.5 cm, Inferior 2.5 cm.
- Márgenes en horizontal: Izquierdo 3.0 cm, Derecho 2.5 cm, Superior 3.0 cm, Inferior 2.5 cm.
- Tipografía: Times New Roman, 12 puntos para texto general; 14 puntos para títulos, subtítulos, capítulos, índices.
- Interlineado: 1.15 para texto general; interlineado sencillo (1.0) para citas textuales extensas en bloque y referencias.
- Alineación: Justificada.
- Sangría: 1.25 cm en la primera línea de cada párrafo.
- Paginación: Esquina inferior derecha en números arábigos (1, 2, 3...) visible desde la Introducción. Preliminares se contabilizan pero no muestran número visible.
- Extensión máxima: Hasta 60 páginas desde la Introducción hasta las Recomendaciones (no incluye preliminares ni anexos).
- Normas de citación según Facultad:
  * Facultad de Ciencias de la Educación, Humanas y Tecnologías: Chicago o APA
  * Facultad de Ciencias de la Salud: Vancouver o APA
  * Facultad de Ingeniería: IEEE o APA
  * Facultad de Ciencias Políticas y Administrativas: APA`
  },
  {
    id: 'examen-complexivo',
    titulo: 'Estructura y Reglas del Examen Complexivo Teórico-Práctico',
    fuente: 'Reglamento de Titulación UNACH (Arts. 38-43) y Procedimiento GD.04.04. P03',
    categoria: 'complexivo',
    resumen: '50 reactivos teóricos de banco mín 300 (50%) + componente práctico con caso real y sustentación (50%). Nota mínima 7/10.',
    contenidoDetallado: `Componentes del Examen Complexivo:
1. Componente Teórico (50% de la nota final):
   - 50 reactivos seleccionados aleatoriamente de un banco de mínimo 300 reactivos validados.
   - Ponderación equitativa por asignaturas seleccionadas.
   - Duración: Mínimo 2 horas, máximo 3 horas.
   - Requisitos presenciales: Cédula de ciudadanía obligatoria. Prohibido dispositivos electrónicos (celulares, smartwatches, tablets, etc.) y bolsos/libros.
   - Aprobación: Mínimo 7/10. Es requisito obligatorio aprobarlo para rendir el componente práctico.
   - Gracia Teórica: Si reprueba, solicitud en 5 días hábiles con pago de arancel al Director de Carrera; Decano fija examen en 5 a 10 días hábiles. Si reprueba gracia: debe cambiar de opción de titulación.
2. Componente Práctico (50% de la nota final):
   - Se rinde hasta 3 días hábiles posteriores a aprobar el teórico.
   - Calificación: Trabajo escrito (sobre 3 puntos) + Sustentación oral (sobre 7 puntos) = 10 puntos (mínimo 7/10).
   - Tribunal evaluador: Director de Carrera o delegado y dos docentes con cuarto nivel afín.
   - Gracia Práctica: Solicitud en 5 días hábiles; si reprueba gracia, debe cambiar de opción.`
  },
  {
    id: 'convalidacion-salud-ehep',
    titulo: 'Convalidación del Complexivo en Salud con Examen EHEP (CACES)',
    fuente: 'Reglamento de Titulación UNACH (Art. 44)',
    categoria: 'complexivo',
    resumen: 'Estudiantes de Ciencias de la Salud que aprueben el EHEP (CACES) con >= 70% convalidan el examen mediante fórmula matemática oficial.',
    contenidoDetallado: `Fórmula y Procedimiento de Convalidación EHEP:
- Dirigido a estudiantes de la Facultad de Ciencias de la Salud que aprueben el Examen de Habilitación para el Ejercicio Profesional (EHEP) aplicado por el CACES.
- Requisito de nota EHEP: Igual o mayor al 70%.
- Solicitud: Oficio al Director de Carrera con al menos 3 días de anticipación preliminar a la fecha prevista del examen complexivo, adjuntando certificado oficial.
- Fórmula de equivalencia matemática oficial:
  y = (1/30) * x + (20/3)
  Donde:
  x = calificación porcentual obtenida en el EHEP (70 a 100).
  y = calificación sobre 10 de la opción de titulación.
- Registro: Hasta 2 cifras decimales, SIN REDONDEO.
  Ejemplos exactos:
  * EHEP = 70% -> y = 70/30 + 20/3 = 90/30 = 9.00 puntos
  * EHEP = 85% -> y = 85/30 + 20/3 = 9.50 puntos
  * EHEP = 100% -> y = 100/30 + 20/3 = 120/30 = 10.00 puntos`
  },
  {
    id: 'curso-actualizacion-cac',
    titulo: 'Curso de Actualización de Conocimientos (CAC)',
    fuente: 'Reglamento UNACH (Arts. 19, 45-48) e Instructivo GD.04.04. P01.I01',
    categoria: 'actualizacion',
    resumen: 'Para egresados con ajustes curriculares sustantivos y hasta 9 años tras el último nivel. 200 horas, mínimo 7/10 y 70% asistencia.',
    contenidoDetallado: `Detalle del Curso de Actualización de Conocimientos:
- Procedencia: Cuando se hayan ejecutado ajustes curriculares sustantivos y hayan transcurrido hasta 9 años desde la aprobación del último nivel.
- Duración: 200 horas académicas.
- Asignaturas: Hasta un máximo de 4 asignaturas de la unidad profesional.
- Evaluación: 60% actividades autónomas del estudiante + 40% examen final (30 reactivos aleatorios de banco de 100).
- Requisitos de aprobación: Mínimo 70% de asistencia y calificación mínima de 7.00 sobre 10.
- Recuperación: Si reprueba el examen final, tiene oportunidad de examen de recuperación por única vez hasta 15 días hábiles tras la publicación.
- AVISO CRÍTICO: De no aprobar el examen de recuperación, el estudiante PIERDE DEFINITIVAMENTE la oportunidad de titularse en la UNACH (Art. 48).
- Continuidad: Una vez aprobado el curso, el estudiante debe matricularse en el período inmediato subsiguiente en segunda o tercera matrícula.`
  },
  {
    id: 'matriculas-plazos-maximos',
    titulo: 'Régimen de Matrículas en Titulación y Plazo de 10 Años',
    fuente: 'Reglamento de Titulación UNACH (Arts. 19, 20, 27)',
    categoria: 'plazos',
    resumen: 'Máximo 3 matrículas. La primera es gratuita si conserva gratuidad; 2da y 3ra pagan arancel. Plazo máximo improrrogable: 10 años.',
    contenidoDetallado: `Condiciones de Matrículas:
- Número de Matrículas: El estudiante podrá hacer uso de hasta tres (3) matrículas.
- Primera matrícula: En el último nivel de la carrera (semestral; anual para Medicina y Enfermería). Gratuita para quienes conservan el derecho de gratuidad.
- Segunda matrícula: Consecutiva o no, a petición del estudiante. Aplica arancel. (Semestral para Medicina y Enfermería).
- Tercera matrícula: Consecutiva o no, de carácter EXCEPCIONAL. Es la última oportunidad para concluir. Aplica arancel.
- Pérdida definitiva (Art. 27):
  * No alcanzar el puntaje mínimo en la matrícula que curse.
  * Abandonar el proceso en tercera matrícula.
  * Haber transcurrido más de diez (10) años desde el último nivel cursado sin concluir la titulación.`
  }
];

export interface FormatoOficial {
  codigo: string;
  nombre: string;
  instanciaCustodio: string;
  procedimiento: string;
  descripcion: string;
}

export const CATALOGO_FORMATOS_SGC: FormatoOficial[] = [
  { codigo: 'GD.04.04. P02. F01', nombre: 'Solicitud de selección o propuesta de tema para titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Formato utilizado por el estudiante para postular un tema propio o del repositorio' },
  { codigo: 'GD.04.04. P02. F02', nombre: 'Certificado de validación de tema', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Certificación emitida por Director de Proyecto de Investigación o Vinculación' },
  { codigo: 'GD.04.04. P02. F03', nombre: 'Formulario de solicitud por casos de excepcionalidad', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Para casos de no registro, selección errónea, extemporáneo o cambio de título/opción' },
  { codigo: 'GD.04.04. P02. F04', nombre: 'Informe favorable de cambio de título de investigación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Informe suscrito por el tutor hasta la semana 8 del último nivel' },
  { codigo: 'GD.04.04. P02. F05', nombre: 'Reporte de selección y propuesta de temas para titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Elaborado por el profesor de la asignatura para remitir a Dirección' },
  { codigo: 'GD.04.04. P02. F06', nombre: 'Acta de validación de temas', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Acta elaborada por la Comisión de Carrera al validar temas' },
  { codigo: 'GD.04.04. P02. F07', nombre: 'Propuesta de asignación de tutores', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Enviada por el Director de Carrera al Decano para su resolución' },
  { codigo: 'GD.04.04. P02. F08', nombre: 'Perfil del Trabajo de Titulación para trabajo de investigación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Esquema metodológico del perfil de investigación' },
  { codigo: 'GD.04.04. P02. F09', nombre: 'Perfil del Trabajo de Titulación para artículo científico', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Esquema metodológico adaptado a publicación científica' },
  { codigo: 'GD.04.04. P02. F10', nombre: 'Perfil del Trabajo de Titulación para proyecto técnico', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Esquema con justificación técnica y prototipo' },
  { codigo: 'GD.04.04. P02. F11', nombre: 'Perfil del Trabajo de Titulación para proyecto de emprendimiento', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Esquema de modelo de negocio con aval CIEP' },
  { codigo: 'GD.04.04. P02. F12', nombre: 'Visto Bueno del Perfil del Trabajo de Titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Aval del tutor que certifica la conclusión y calidad del perfil' },
  { codigo: 'GD.04.04. P02. F13', nombre: 'Reporte de tutorías de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación / Complexivo', descripcion: 'Bitácora oficial de horas, acuerdos y seguimiento registrada en SICOA' },
  { codigo: 'GD.04.04. P02. F14', nombre: 'Acta aprobación perfil del trabajo de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Resolución favorable de la Comisión de Carrera' },
  { codigo: 'GD.04.04. P02. F15', nombre: 'Acta de observaciones de Perfil del Trabajo de Titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Notificación de ajustes con plazo de 5 días hábiles' },
  { codigo: 'GD.04.04. P02. F16', nombre: 'Trabajo escrito de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Documento final de hasta 60 páginas según normas institucionales' },
  { codigo: 'GD.04.04. P02. F17', nombre: 'Dictamen favorable del trabajo escrito de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Dictamen del tutor que incluye enlace al documento y reporte antiplagio' },
  { codigo: 'GD.04.04. P02. F18', nombre: 'Propuesta de asignación del tribunal de grado', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Conformación de 3 profesores evaluadores enviada al Decano' },
  { codigo: 'GD.04.04. P02. F19', nombre: 'Acta de calificación del trabajo escrito de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Calificación emitida por los miembros del tribunal sobre 10 (mín 7)' },
  { codigo: 'GD.04.04. P02. F20', nombre: 'Acta de observaciones al trabajo escrito de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Observaciones del tribunal con 8 días término para corregir' },
  { codigo: 'GD.04.04. P02. F21', nombre: 'Matriz de selección de revista científica', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación (Artículo)', descripcion: 'Evaluación de indexación Latindex 2.0/Scopus, cuartil y periodicidad' },
  { codigo: 'GD.04.04. P02. F22', nombre: 'Acta de aprobación del trabajo escrito de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Consolidación de aprobación legalizada por secretaría' },
  { codigo: 'GD.04.04. P02. F23', nombre: 'Acta de reprobación de la opción de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación / Complexivo', descripcion: 'Constancia oficial de no haber alcanzado la nota mínima' },
  { codigo: 'GD.04.04. P02. F24', nombre: 'Certificado de actualización de datos', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación / Complexivo', descripcion: 'Emitido por Dirección Académica para graduados' },
  { codigo: 'GD.04.04. P02. F25', nombre: 'Acta de instalación de sustentación del trabajo de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Registro de instalación solemne con margen de espera de 15 min' },
  { codigo: 'GD.04.04. P02. F26', nombre: 'Acta de calificación de sustentación del trabajo de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Puntuación consolidada por el presidente del tribunal sobre rúbrica' },
  { codigo: 'GD.04.04. P02. F27', nombre: 'Acta de aprobación de la sustentación del trabajo de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación', descripcion: 'Aprobación de la defensa oral' },
  { codigo: 'GD.04.04. P02. F28', nombre: 'Acta de aprobación de la opción de titulación', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Trabajo de Titulación / Complexivo', descripcion: 'Documento habilitante que promedia escrito y sustentación' },
  { codigo: 'GD.04.04. P02. F29', nombre: 'Acta de grado', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'General', descripcion: 'Acta final formal que acredita la obtención del título profesional' },
  { codigo: 'GD.04.04. P03. F01', nombre: 'Planificación académica del examen complexivo', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Examen Complexivo', descripcion: 'Cronograma y temarios de los componentes teórico y práctico' },
  { codigo: 'GD.04.04. P03. F02', nombre: 'Registro de asesoría académica para examen complexivo', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Examen Complexivo', descripcion: 'Asesorías del componente teórico y tutorías del componente práctico' },
  { codigo: 'GD.04.04. P03. F03', nombre: 'Acuerdo de confidencialidad de reactivos', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Examen Complexivo / CAC', descripcion: 'Firmado por docentes redactores, Comisión de Carrera y Subdecano' },
  { codigo: 'GD.04.04. P03. F06', nombre: 'Acta de calificación del componente teórico', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Examen Complexivo', descripcion: 'Registro de los 50 reactivos en aula virtual / SICOA (mín 7/10)' },
  { codigo: 'GD.04.04. P03. F07', nombre: 'Acta de calificación del componente práctico', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Examen Complexivo', descripcion: 'Puntuación del escrito (3 pts) y sustentación (7 pts)' },
  { codigo: 'GD.04.04. P03. F08', nombre: 'Acta de aprobación del componente práctico', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Examen Complexivo', descripcion: 'Aprobación final del examen complexivo' },
  { codigo: 'GD.04.04. P01. F07', nombre: 'Reporte de asignatura del CAC', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Actualización de Conocimientos', descripcion: 'Seguimiento de las 200 horas del curso de actualización' },
  { codigo: 'GD.04.04. P01. F09', nombre: 'Acta de calificación del CAC', instanciaCustodio: 'Secretaría de Carrera', procedimiento: 'Actualización de Conocimientos', descripcion: '60% actividades autónomas + 40% examen final' },
  { codigo: 'GD.04.04. P01. F10', nombre: 'Certificado de aprobación del CAC', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Actualización de Conocimientos', descripcion: 'Requisito habilitante para matricularse en 2da o 3ra matrícula' },
  { codigo: 'GD.04.04. P01. F11', nombre: 'Informe de pertinencia académica del CAC', instanciaCustodio: 'Dirección de Carrera', procedimiento: 'Actualización de Conocimientos', descripcion: 'Análisis previo para valorar adecuación o exoneración ante reformas' }
];

export interface FaqQuickItem {
  pregunta: string;
  categoria: string;
  respuestaCorta: string;
}

export const PREGUNTAS_FRECUENTES: FaqQuickItem[] = [
  {
    pregunta: "¿Hasta qué semana puedo registrar mi opción de titulación en el SICOA?",
    categoria: "Plazos",
    respuestaCorta: "Hasta la octava (8va) semana contada desde el inicio de clases según el calendario académico (Manual Secc. 6.1 / Reglamento Art. 25)."
  },
  {
    pregunta: "¿Cuál es el porcentaje máximo de similitud antiplagio y uso de IA?",
    categoria: "Antiplagio",
    respuestaCorta: "Máximo 10% de similitud global con Compilatio. Se admite hasta 10% de IA exclusivamente en introducción, marco teórico y metodología con declaración expresa obligatoria (Reglamento Art. 34)."
  },
  {
    pregunta: "¿Cómo se califica el examen de grado complexivo?",
    categoria: "Complexivo",
    respuestaCorta: "50% Componente Teórico (50 reactivos aleatorios de banco 300, mín 7/10) + 50% Componente Práctico (3 pts trabajo escrito + 7 pts sustentación, mín 7/10). Promedio final mínimo 7/10 (Reglamento Art. 42)."
  },
  {
    pregunta: "¿Qué sucede si no apruebo la sustentación de mi trabajo de titulación?",
    categoria: "Gracia",
    respuestaCorta: "Puedes solicitar por única vez la sustentación de gracia dentro de 5 días hábiles con pago de arancel ante el Decano, quien fijará fecha en hasta 30 días hábiles (Reglamento Art. 36)."
  },
  {
    pregunta: "¿Cuáles son los requisitos para solicitar fecha de sustentación?",
    categoria: "Sustentación",
    respuestaCorta: "1) Certificado de culminación de estudios; 2) Certificado de actualización de datos de seguimiento a graduados (emitido por Dirección Académica); 3) Carta de aceptación o publicación para artículo científico (Manual Secc. 7.5)."
  },
  {
    pregunta: "¿Cómo se calcula la calificación final de grado para la graduación?",
    categoria: "Promedio",
    respuestaCorta: "60% promedio récord académico de la carrera + 40% calificación de la opción de titulación (Reglamento Art. 49)."
  },
  {
    pregunta: "¿Cuántas páginas debe tener como máximo el trabajo escrito?",
    categoria: "Formato",
    respuestaCorta: "Hasta 60 páginas desde la Introducción hasta las Recomendaciones. Preliminares y anexos no cuentan en dicho límite (Manual Secc. 7.6.4)."
  },
  {
    pregunta: "¿Cómo se convalida el examen complexivo en Ciencias de la Salud con el EHEP?",
    categoria: "Salud / EHEP",
    respuestaCorta: "Con el examen EHEP del CACES aprobado con >=70%, mediante la fórmula y = (1/30)x + 20/3 sin redondeo (Reglamento Art. 44)."
  }
];
