/* ==========================================================================
   INNOVA HUB — Datos del curso "Seguridad en la Nube AWS"
   --------------------------------------------------------------------------
   Todo el contenido del sitio vive en este archivo. Para agregar o editar
   información (una unidad, un laboratorio, un recurso, una pregunta
   frecuente...) solo hay que tocar los objetos de abajo — el sitio se
   vuelve a renderizar solo. No hace falta tocar index.html ni script.js
   para cambios de contenido.
   ========================================================================== */

const COURSE = {
  title: "Seguridad en la Nube AWS",
  subtitle:
    "Portal de materiales del curso. Acá vas a encontrar el temario, las presentaciones, las guías de laboratorio y los recursos de cada unidad.",
  level: "Nivel intermedio-avanzado",
  modality: "Híbrida · 60% presencial / 40% virtual",
  duration: "20 horas",
  audience:
    "Analistas de seguridad de la Unidad de TI, con conocimientos previos en redes y sistemas.",
  generalObjective:
    "Desarrollar en los/las participantes competencias técnicas para implementar, auditar y gestionar la seguridad de infraestructuras en la nube AWS, conforme a estándares y marcos normativos vigentes (GDPR, ISO 27017).",
  specificObjectives: [
    "Implementar controles de seguridad en AWS (IAM, VPC, cifrado).",
    "Auditar entornos cloud utilizando herramientas nativas de AWS.",
    "Mapear controles de GDPR e ISO 27017 a servicios concretos de AWS.",
    "Diseñar un plan de auditoría de seguridad en la nube, de principio a fin.",
  ],
  stats: [
    { value: "20", suffix: "h", label: "Duración total" },
    { value: "5", suffix: "", label: "Unidades" },
    { value: "12", suffix: "h", label: "Presenciales" },
    { value: "8", suffix: "h", label: "Virtuales" },
  ],
};

/* Contacto de soporte del curso — se muestra al pie, sin formulario de
   captación de datos, solo la vía directa para escribirle al equipo. */
const SUPPORT = {
  email: "sabina.romero@gmail.com",
  note: "¿Dudas sobre el contenido, un laboratorio que no te carga o un material que falta? Escribinos y te respondemos por acá.",
};

/* Datos de contacto de la docente a cargo del curso — se muestran en la
   sección "Docente" y como vía directa dentro de la sección de soporte. */
const INSTRUCTOR = {
  name: "Sabina Romero",
  role: "Docente del curso",
  bio: "A cargo del dictado y la tutoría del curso Seguridad en la Nube AWS.",
  email: "sabina.romero@gmail.com",
  phone: "+56 9 6672 349",
  linkedin: "https://www.linkedin.com/in/sabina-romeror/",
};

/* ==========================================================================
   MATERIALES
   --------------------------------------------------------------------------
   Acá se cargan los archivos reales del curso. Cada item admite:
     title, type ("Presentación" | "Guía" | "Plantilla" | "Video" | "Otro"),
     status ("disponible" | "proximamente"), url (solo si status=disponible)
   Para subir un material nuevo: agregá un objeto al arreglo correspondiente
   (GENERAL_MATERIALS o materials[] dentro de la unidad) con status
   "disponible" y la ruta del archivo. Mientras no exista el archivo, dejalo
   como "proximamente" — se muestra igual, pero sin botón de descarga.
   ========================================================================== */
const GENERAL_MATERIALS = [
  {
    title: "Presentación completa del curso",
    type: "Presentación",
    description: "Las 33 diapositivas del curso: las 5 unidades, laboratorios, tablas comparativas y diagramas.",
    status: "proximamente",
  },
  {
    title: "Plantilla de plan de auditoría",
    type: "Plantilla",
    description: "La plantilla en blanco que se completa en el taller de la Unidad 5.",
    status: "proximamente",
  },
  {
    title: "Glosario de términos AWS",
    type: "Guía",
    description: "Referencia rápida de los servicios y siglas usados a lo largo del curso.",
    status: "proximamente",
  },
];

/* Cada unidad puede tener tantos objetivos, temas y laboratorios como haga
   falta — los tres arreglos se recorren dinámicamente. */
const UNITS = [
  {
    n: 1,
    icon: "cloud",
    mode: "Virtual",
    hours: 4,
    title: "Introducción a la Computación en la Nube y Modelo de Seguridad de AWS",
    summary:
      "Las bases: qué cambia (y qué no) al mover cargas de trabajo a la nube, y quién responde por qué.",
    objectives: [
      "Comprender el Modelo de Responsabilidad Compartida entre AWS y el cliente.",
      "Identificar los beneficios de la nube y su impacto en la postura de seguridad.",
      "Aplicar el pilar de Seguridad del AWS Well-Architected Framework.",
      "Configurar controles básicos de acceso (IAM) y una VPC inicial.",
    ],
    topics: [
      {
        title: "Modelo de Responsabilidad Compartida",
        body: "AWS es responsable de la seguridad “de” la nube (infraestructura global, hardware, virtualización); el cliente, de la seguridad “en” la nube (IAM, cifrado, configuración de red y de aplicaciones).",
      },
      {
        title: "AWS Well-Architected Framework",
        body: "Seis pilares para diseñar cargas de trabajo confiables y seguras — el curso profundiza en el pilar de Seguridad: identidad y acceso, detección, protección de infraestructura y de datos, y respuesta a incidentes.",
      },
      {
        title: "Beneficios de la nube y su impacto en seguridad",
        body: "Elasticidad, agilidad y pago por uso no son solo ventajas operativas: cada una exige un tipo distinto de control de seguridad que escale con ella.",
      },
      {
        title: "Modelo de precios de AWS: de CapEx a OpEx",
        body: "AWS cambia la inversión fija en hardware (CapEx) por gasto operativo variable (OpEx): se paga solo por lo que se consume. Economías de escala, elasticidad y opciones de compra (Savings Plans y Reservadas hasta 72% de descuento, Spot hasta 90%) permiten reducir el costo total de propiedad sin sacrificar capacidad.",
      },
      {
        title: "Ajuste de tamaño (rightsizing)",
        body: "Hacer coincidir el tipo y tamaño de cada recurso (EC2, EKS, Fargate, Lambda, RDS) con su carga real evita pagar por capacidad ociosa — instancias que suelen operar entre 10% y 40% de uso. AWS Compute Optimizer analiza el historial con aprendizaje automático y puede generar hasta 36% de ahorro.",
      },
      {
        title: "Regiones y Zonas de Disponibilidad",
        body: "Una Región agrupa varias Zonas de Disponibilidad (AZ): centros de datos físicamente separados pero interconectados por fibra de baja latencia, aislados entre sí por diseño. La región se elige por latencia, soberanía de datos, disponibilidad de servicios y costo; se despliega en 2–3 AZ para lograr alta disponibilidad.",
      },
      {
        title: "Pilar de Optimización de Costos (Well-Architected)",
        body: "Uno de los seis pilares del Well-Architected Framework: gestionar el gasto en la nube (CFM), adoptar un modelo de consumo, medir la eficiencia y evitar el “trabajo pesado indiferenciado” con servicios gestionados. Se apoya en AWS Cost Explorer, Budgets y Trusted Advisor para monitorear y optimizar de forma continua.",
      },
      {
        title: "Capa Gratuita de AWS (Free Tier)",
        body: "Durante los primeros 12 meses, AWS Free Tier da acceso sin costo a S3 (5 GB, 2.000 solicitudes PUT y 20.000 GET/mes) y EBS (30 GB + 1 GB de snapshots), ideal para prototipar. Además hay herramientas siempre gratuitas — AWS Artifact (informes de cumplimiento SOC/ISO), AWS Well-Architected Tool y Amazon CodeWhisperer para uso individual. Lo que excede esos límites se factura al modelo estándar, por eso conviene vigilar el consumo con AWS Budgets o Cost Explorer.",
      },
    ],
    labs: [
      {
        title: "Implementación de VPC y control de acceso (IAM básico)",
        objective:
          "Desplegar una VPC funcional y configurar el control de acceso a recursos de AWS aplicando el principio de mínimo privilegio.",
        steps: [
          "Crear una VPC con subredes pública y privada",
          "Configurar un Internet Gateway y tablas de enrutamiento",
          "Crear usuarios, grupos y roles de IAM para el equipo de trabajo",
          "Redactar y asociar una política de IAM de mínimo privilegio",
          "Verificar el acceso mediante la consola y AWS CLI",
        ],
        tools: ["AWS Management Console", "AWS CLI", "Amazon VPC", "AWS IAM"],
        time: "90 min",
      },
    ],
    materials: [
      { title: "Diapositivas 5–9 (Unidad 1)", type: "Presentación", status: "proximamente" },
      { title: "Guía de laboratorio — VPC e IAM", type: "Guía", status: "proximamente" },
      { title: "Grabación de la clase virtual", type: "Video", status: "proximamente" },
    ],
    media: [
      {
        title: "Video resumen: Análisis de la Nube y AWS",
        type: "video",
        description: "Repaso audiovisual de los conceptos clave de la unidad — material de apoyo complementario.",
        url: "recursos/modulo-1/Analisis_de_la_Nube_y_AWS.mp4",
      },
      {
        title: "Audio resumen: Cómo AWS revolucionó el software moderno",
        type: "audio",
        description: "Formato podcast para repasar la unidad en cualquier momento.",
        url: "recursos/modulo-1/Como_AWS_revoluciono_el_software_moderno.m4a",
      },
      {
        title: "Infografía: Evolución de la Nube — Historia e impacto de AWS",
        type: "image",
        description: "Línea de tiempo 2006–2026, ventajas frente a la infraestructura tradicional, componentes de la infraestructura global y ECS vs. EKS.",
        url: "recursos/modulo-1/Evolucion_de_infraestructura_en_nube.png",
      },
    ],
  },
  {
    n: 2,
    icon: "lock",
    mode: "Virtual",
    hours: 4,
    title: "Seguridad de Datos y Redes en AWS",
    summary:
      "Cifrado en reposo y en tránsito, y una arquitectura de red que separa lo público de lo privado por diseño.",
    objectives: [
      "Distinguir la seguridad de red on-premise de la seguridad en la nube.",
      "Aplicar opciones de cifrado en reposo y en tránsito (KMS, CloudHSM).",
      "Diseñar una arquitectura de VPC con subredes públicas y privadas.",
      "Configurar Security Groups y Network ACLs como capas de defensa.",
    ],
    topics: [
      {
        title: "On-premise vs. cloud",
        body: "El perímetro deja de ser un firewall físico fijo y pasa a definirse por software: Security Groups a nivel de instancia y Network ACLs a nivel de subred permiten microsegmentar cada carga de trabajo.",
      },
      {
        title: "Cifrado: KMS, CloudHSM, S3/RDS/EBS",
        body: "AWS KMS administra claves para el resto de los servicios; CloudHSM ofrece hardware dedicado para requisitos regulatorios estrictos; S3, RDS y EBS traen cifrado nativo integrado.",
      },
      {
        title: "Arquitectura de VPC pública/privada",
        body: "Subred pública (NAT Gateway, bastion host, load balancer) y subred privada (instancias EC2, bases de datos RDS), separadas por Security Groups y Network ACLs.",
      },
    ],
    labs: [
      {
        title: "Cifrado de datos y seguridad de red en VPC",
        objective:
          "Aplicar cifrado de datos con KMS y S3, y reforzar una arquitectura VPC mediante Security Groups y Network ACLs.",
        steps: [
          "Crear una clave administrada por el cliente en AWS KMS",
          "Habilitar cifrado del lado del servidor en un bucket S3",
          "Subir un objeto y verificar el cifrado aplicado",
          "Configurar Security Groups para restringir tráfico por puerto/origen",
          "Configurar Network ACLs con reglas de entrada y salida",
          "Validar el aislamiento entre subred pública y privada",
        ],
        tools: ["AWS Management Console", "AWS KMS", "Amazon S3", "Amazon VPC"],
        time: "90 min",
      },
    ],
    materials: [
      { title: "Diapositivas 10–14 (Unidad 2)", type: "Presentación", status: "proximamente" },
      { title: "Guía de laboratorio — Cifrado y VPC", type: "Guía", status: "proximamente" },
      { title: "Grabación de la clase virtual", type: "Video", status: "proximamente" },
    ],
  },
  {
    n: 3,
    icon: "search",
    mode: "Presencial",
    hours: 4,
    title: "Herramientas de Auditoría y Monitoreo — Implementación GDPR / ISO 27017",
    summary:
      "Cómo generar evidencia de cumplimiento de forma continua, y cómo responder a un evento sin intervención manual.",
    objectives: [
      "Utilizar AWS Audit Manager para evaluar el cumplimiento normativo.",
      "Integrar CloudWatch, EventBridge y Lambda en una respuesta automatizada.",
      "Mapear controles de GDPR e ISO 27017 a servicios y configuraciones de AWS.",
      "Configurar métricas y alarmas de monitoreo continuo.",
    ],
    topics: [
      {
        title: "AWS Audit Manager",
        body: "Evaluación continua de riesgo de cumplimiento con plantillas predefinidas para GDPR, ISO 27017 y otros marcos; recopila evidencia automáticamente desde CloudTrail, Config y Security Hub.",
      },
      {
        title: "Respuesta automatizada: CloudWatch + EventBridge + Lambda",
        body: "CloudWatch detecta la anomalía, EventBridge enruta el evento y Lambda ejecuta la remediación — de horas a segundos en el tiempo de respuesta.",
      },
      {
        title: "Mapeo GDPR ↔ ISO 27017",
        body: "El Art. 32 de GDPR (seguridad del procesamiento) y el Anexo A de ISO 27017 (controles para proveedores cloud) comparten evidencia técnica: cifrado, control de acceso y trazabilidad.",
      },
    ],
    labs: [
      {
        title: "AWS Audit Manager",
        objective: "Crear una evaluación con el marco ISO 27017 y recopilar evidencia automática.",
        tools: ["AWS Audit Manager"],
        time: "30 min",
      },
      {
        title: "CloudWatch: métricas y alarmas",
        objective: "Configurar una alarma sobre un umbral de CPU o intentos de acceso fallidos.",
        tools: ["Amazon CloudWatch"],
        time: "25 min",
      },
      {
        title: "Automatización con Lambda",
        objective: "Crear una función Lambda disparada por EventBridge ante un evento de seguridad.",
        tools: ["AWS Lambda", "Amazon EventBridge"],
        time: "35 min",
      },
      {
        title: "Mapeo de controles GDPR/ISO",
        objective: "Documentar la correspondencia entre controles normativos y servicios AWS.",
        tools: ["AWS Console", "Plantilla de mapeo"],
        time: "20 min",
      },
    ],
    materials: [
      { title: "Diapositivas 15–19 (Unidad 3)", type: "Presentación", status: "proximamente" },
      { title: "Plantilla de mapeo GDPR/ISO 27017", type: "Plantilla", status: "proximamente" },
      { title: "Material de la clase presencial", type: "Otro", status: "proximamente" },
    ],
  },
  {
    n: 4,
    icon: "tool",
    mode: "Presencial",
    hours: 4,
    title: "Controles de Inspección y Corrección de Situaciones",
    summary:
      "De la detección de una vulnerabilidad a su cierre documentado, siguiendo un mismo playbook cada vez.",
    objectives: [
      "Identificar vulnerabilidades con AWS Inspector y amenazas con GuardDuty.",
      "Aplicar un playbook estructurado de respuesta ante no conformidades.",
      "Configurar AWS Config para evaluación continua de configuraciones.",
      "Implementar auto-remediación ante configuraciones no conformes.",
    ],
    topics: [
      {
        title: "AWS Inspector vs. Amazon GuardDuty",
        body: "Inspector previene: escanea EC2, contenedores y Lambda en busca de vulnerabilidades conocidas. GuardDuty detecta: analiza CloudTrail, VPC Flow Logs y DNS con aprendizaje automático para identificar amenazas activas.",
      },
      {
        title: "Playbook de respuesta a no conformidad",
        body: "Cuatro fases fijas — detección, análisis, corrección, verificación — con tiempos de respuesta objetivo según severidad y evidencia documentada en cada paso.",
      },
      {
        title: "AWS Config y auto-remediación",
        body: "Config registra y evalúa continuamente el estado de cada recurso contra una regla; si la regla falla, una acción SSM o Lambda puede corregirlo automáticamente.",
      },
    ],
    labs: [
      {
        title: "Controles de seguridad: Config + GuardDuty",
        objective:
          "Activar AWS Config con reglas gestionadas y habilitar GuardDuty para detección continua de amenazas.",
        tools: ["AWS Config", "Amazon GuardDuty"],
        time: "45 min",
      },
      {
        title: "Corrección con AWS Inspector",
        objective:
          "Ejecutar un escaneo de vulnerabilidades sobre instancias EC2, priorizar hallazgos y aplicar la corrección.",
        tools: ["Amazon Inspector", "AWS Systems Manager"],
        time: "40 min",
      },
    ],
    materials: [
      { title: "Diapositivas 20–24 (Unidad 4)", type: "Presentación", status: "proximamente" },
      { title: "Plantilla del playbook de respuesta", type: "Plantilla", status: "proximamente" },
      { title: "Material de la clase presencial", type: "Otro", status: "proximamente" },
    ],
  },
  {
    n: 5,
    icon: "route",
    mode: "Presencial",
    hours: 4,
    title: "Controles Proactivos de Seguridad y Plan de Auditoría",
    summary:
      "Mover la seguridad al principio del proceso, y cerrar el curso con un plan de auditoría propio y aplicable.",
    objectives: [
      "Aplicar el enfoque Shift-Left para integrar seguridad desde el diseño.",
      "Implementar Policy as Code con Config Rules, CloudFormation Guard y SCPs.",
      "Configurar una postura de seguridad proactiva (Tags, Organizations, IAM avanzado).",
      "Elaborar un plan de auditoría de seguridad en la nube completo.",
    ],
    topics: [
      {
        title: "Shift-Left Security",
        body: "Detectar configuraciones inseguras antes del despliegue —validando plantillas de infraestructura como código— cuesta una fracción de corregirlas ya en producción.",
      },
      {
        title: "Policy as Code",
        body: "CloudFormation Guard previene antes del despliegue; AWS Config Rules detecta y corrige después, de forma continua; las Service Control Policies actúan como barandas que ningún recurso de la organización puede sobrepasar.",
      },
      {
        title: "Postura proactiva",
        body: "Tags para trazabilidad, AWS Organizations para gestión multi-cuenta, IAM avanzado, Security Groups con reglas cruzadas, CloudTrail y VPC Flow Logs.",
      },
      {
        title: "Plan de auditoría de seguridad en la nube",
        body: "Cinco fases: alcance, recopilación de evidencia, análisis de riesgos, reporte y plan de acción — la metodología con la que cierra el curso.",
      },
    ],
    labs: [
      {
        title: "Controles proactivos en AWS",
        objective:
          "Implementar Service Control Policies a nivel de organización y desplegar AWS Config Rules personalizadas.",
        tools: ["AWS Organizations", "AWS Config"],
        time: "45 min",
      },
      {
        title: "Taller: plan de auditoría",
        objective:
          "Elaborar de forma guiada un plan de auditoría de seguridad completo, cubriendo las cinco fases de la metodología.",
        tools: ["Plantilla de plan de auditoría"],
        time: "50 min",
      },
    ],
    materials: [
      { title: "Diapositivas 25–30 (Unidad 5)", type: "Presentación", status: "proximamente" },
      { title: "Plantilla de plan de auditoría", type: "Plantilla", status: "proximamente" },
      { title: "Material de la clase presencial", type: "Otro", status: "proximamente" },
    ],
  },
];

const FRAMEWORKS_COMPARISON = {
  caption: "Mapeo de controles",
  columns: ["Aspecto", "GDPR", "ISO 27017"],
  rows: [
    ["Naturaleza", "Reglamento legal (Unión Europea)", "Norma técnica internacional"],
    ["Enfoque", "Protección de datos personales", "Controles de seguridad para cloud"],
    ["Control clave", "Art. 32 — Seguridad del procesamiento", "Anexo A — Controles para proveedores cloud"],
    ["Servicio AWS asociado", "KMS, Macie, IAM", "Config, Security Hub, GuardDuty"],
    ["Evidencia en Audit Manager", "Plantilla “GDPR” predefinida", "Plantilla “ISO/IEC 27017” predefinida"],
  ],
};

const NETWORK_COMPARISON = {
  caption: "Seguridad de red",
  columns: ["Aspecto", "On-premise", "AWS Cloud"],
  rows: [
    ["Perímetro", "Firewall físico único, fijo", "Definido por software (SG, NACL, VPC)"],
    ["Escalamiento", "Requiere adquisición de hardware", "Elástico, bajo demanda"],
    ["Segmentación", "VLANs físicas, manual", "Subredes y VPCs aisladas lógicamente"],
    ["Visibilidad", "Herramientas dedicadas", "CloudTrail, VPC Flow Logs, CloudWatch"],
  ],
};

/* Cajas de herramientas AWS usadas a lo largo del curso — para la sección
   "Stack del curso". Agregar un objeto nuevo aquí es suficiente. */
const TOOLS = [
  { name: "IAM", group: "Identidad" },
  { name: "VPC", group: "Red" },
  { name: "KMS", group: "Cifrado" },
  { name: "CloudHSM", group: "Cifrado" },
  { name: "S3", group: "Almacenamiento" },
  { name: "RDS", group: "Base de datos" },
  { name: "CloudTrail", group: "Auditoría" },
  { name: "CloudWatch", group: "Monitoreo" },
  { name: "EventBridge", group: "Automatización" },
  { name: "Lambda", group: "Automatización" },
  { name: "Audit Manager", group: "Cumplimiento" },
  { name: "Config", group: "Cumplimiento" },
  { name: "Inspector", group: "Detección" },
  { name: "GuardDuty", group: "Detección" },
  { name: "Organizations", group: "Gobernanza" },
  { name: "CloudFormation Guard", group: "Gobernanza" },
];

const RESOURCES = [
  {
    group: "Documentación oficial AWS",
    items: [
      "AWS Security Pillar (Well-Architected Framework)",
      "AWS Well-Architected Framework — guía completa",
      "Documentación de AWS Identity and Access Management",
    ],
  },
  {
    group: "Whitepapers recomendados",
    items: [
      "“AWS Security Best Practices”",
      "“GDPR Compliance on AWS”",
      "“Introduction to AWS Security Processes”",
    ],
  },
  {
    group: "Guías de cumplimiento",
    items: [
      "ISO/IEC 27017 — Guía de implementación en AWS",
      "AWS Compliance Center",
      "Plantillas de AWS Audit Manager para ISO 27017",
    ],
  },
];

const FAQS = [
  {
    q: "¿Dónde encuentro los materiales de cada unidad?",
    a: "En la sección “Unidades” de más arriba: abrí la unidad que te interesa y vas a ver un bloque de “Materiales” con la presentación, las guías de laboratorio y cualquier otro archivo cargado para esa unidad.",
  },
  {
    q: "Un material figura como “Próximamente”, ¿qué significa?",
    a: "Que ese ítem ya está planificado pero todavía no lo subimos. Este portal se actualiza a medida que avanza el curso — no hace falta que lo pidas, pero si te urge un material puntual, escribinos a soporte.",
  },
  {
    q: "¿Cómo entrego los laboratorios o el taller del plan de auditoría?",
    a: "Cada instructor indica el canal de entrega durante la clase correspondiente (repositorio, carpeta compartida o correo). Si no lo tenés claro, consultalo por el correo de soporte.",
  },
  {
    q: "¿Puedo volver a ver el contenido de una clase presencial?",
    a: "Las clases presenciales no se graban por defecto. Lo que se sube acá son las diapositivas, guías y plantillas usadas en cada sesión — quedan disponibles para repasar cuando quieras.",
  },
];

/* Nota para futuras ediciones: agrega aquí cualquier sección nueva
   (instructores, próximas fechas, testimonios, precios...) como un array
   u objeto más, y engánchalo en script.js siguiendo el mismo patrón de
   render*() que las demás secciones. */