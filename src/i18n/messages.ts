import type { Project } from "@/types";
import type { Locale } from "@/i18n/config";

export type { Locale };

export type Messages = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    work: string;
    about: string;
    experience: string;
    contact: string;
    hire: string;
    cv: string;
    downloadCv: string;
    menuOpen: string;
    menuClose: string;
    switchLang: string;
    themeToLight: string;
    themeToDark: string;
    github: string;
    linkedin: string;
  };
  hero: {
    eyebrow: string;
    location: string;
    line1: string;
    line2: string;
    lead: string;
    tagline: string;
    supporting: string;
    scroll: string;
    intro: string;
  };
  work: {
    heading: string;
    counterHead: string;
    caseStudy: string;
  };
  principles: {
    heading: string;
    items: { index: string; title: string; summary: string }[];
  };
  experience: {
    heading: string;
    counter: string;
    items: {
      index: string;
      title: string;
      location: string;
      summary: string;
      highlights: string[];
      tags: string[];
    }[];
  };
  stack: {
    heading: string;
    counterHead: string;
    everyday: string;
    items: { name: string; note: string; level: 4 | 5 }[];
  };
  about: {
    heading: string;
    summary: string;
    focus: string[];
    stats: { value: string; label: string }[];
    languagesLabel: string;
    languages: { name: string; level: string }[];
    locationLabel: string;
    location: string;
    availabilityLabel: string;
    availability: string;
  };
  contact: {
    heading1: string;
    heading2: string;
    supporting: string;
    downloadCv: string;
  };
  footer: {
    role: string;
    built: string;
    top: string;
  };
  caseStudy: {
    back: string;
    role: string;
    context: string;
    challenge: string;
    approach: string;
    architecture: string;
    implementation: string;
    impact: string;
    next: string;
  };
  projects: Project[];
};

const en: Messages = {
  meta: {
    title: "Steven Daye — Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer and Technical Lead specializing in React, Next.js, TypeScript, frontend architecture and high-performance digital products.",
    keywords: [
      "Steven Daye",
      "frontend engineer",
      "senior frontend",
      "technical lead",
      "React",
      "Next.js",
      "TypeScript",
      "frontend architecture",
    ],
  },
  nav: {
    work: "Work",
    about: "About",
    experience: "Experience",
    contact: "Contact",
    hire: "Hire me",
    cv: "CV",
    downloadCv: "Download CV (PDF)",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLang: "Switch to French",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    github: "GitHub (opens in new tab)",
    linkedin: "LinkedIn (opens in new tab)",
  },
  hero: {
    eyebrow: "Portfolio — 2026",
    location: "Cotonou · Remote worldwide",
    line1: "Senior Frontend",
    line2: "Engineer",
    lead: "& Technical Lead",
    tagline: "Architecture · Performance · Product",
    supporting:
      "Building fast, resilient digital products through thoughtful frontend architecture.",
    scroll: "Scroll",
    intro: "Introduction",
  },
  work: {
    heading: "Selected Work",
    counterHead: "Full-stack · Select",
    caseStudy: "Case study",
  },
  principles: {
    heading: "How I work",
    items: [
      {
        index: "01",
        title: "Performance",
        summary:
          "High-traffic products need interfaces that feel instant. Client-side caching with IndexedDB / Dexie.js, optimistic UI and lean rendering keep interactions fast — even under load.",
      },
      {
        index: "02",
        title: "Resilience",
        summary:
          "Good software survives failure. Persistent, non-destructive data synchronization keeps products usable when networks, APIs or third parties misbehave.",
      },
      {
        index: "03",
        title: "Architecture",
        summary:
          "Clean boundaries between UI, state, BFF and data. Secure BFF proxies give clients a single auditable surface and keep secrets out of the browser.",
      },
      {
        index: "04",
        title: "Ownership",
        summary:
          "End-to-end responsibility, from concept to production. Taking a platform from zero to 1,000+ users in two months is a matter of ownership as much as engineering.",
      },
      {
        index: "05",
        title: "Product Thinking",
        summary:
          "Interfaces serve product intent. Collaborating on UX research and translating user goals into functional, trustworthy systems users rely on.",
      },
      {
        index: "06",
        title: "Leadership",
        summary:
          "Code review, mentoring and architectural guidance compound team velocity. Engineering quality is a team property, not an individual one.",
      },
    ],
  },
  experience: {
    heading: "Experience",
    counter: "Roles · Worldwide",
    items: [
      {
        index: "01",
        title: "Frontend Technical Lead",
        location: "Cotonou, Benin Republic",
        summary:
          "End-to-end architecture and development of cvstudioo — a full-stack AI-powered SaaS platform, from concept to production.",
        highlights: [
          "Scaled the product to 1,000+ registered users (325+ active) within 2 months.",
          "Engineered a resilient experience with Optimistic UI and persistent client-side caching (IndexedDB / Dexie.js).",
          "Secured all API communications behind a Backend-for-Frontend (BFF) proxy.",
          "Integrated Gemini for generative features — resume analysis and content generation — plus a payment gateway with a secure, server-verified flow for real-time transactions.",
          "Drove code quality and team velocity through code reviews and architectural guidance.",
        ],
        tags: ["React", "Next.js", "TypeScript", "Node.js", "Gemini", "Stripe"],
      },
      {
        index: "02",
        title: "Frontend Engineer",
        location: "Barcelona, Spain",
        summary:
          "Greenfield frontend development of a high-traffic airline booking platform, from concept to launch.",
        highlights: [
          "Collaborated on user experience research to define the initial product experience.",
          "Developed a scalable, themeable component library consumed across Alaska Airlines, WizzAir, Avianca, Volaris and Jazeera Airways — collectively serving 22M+ travelers.",
          "Engineered the complete overhaul of the payment system, integrating Stripe, RedSys, Mastercard API and Spreedly on high-traffic airline platforms.",
          "Securely handled transactions for a user base of 1M+ active customers.",
          "Drove code quality and team velocity across the frontend team.",
        ],
        tags: [
          "React",
          "Next.js",
          "Design Systems",
          "Stripe",
          "RedSys",
          "Spreedly",
        ],
      },
      {
        index: "03",
        title: "Full-stack Developer",
        location: "Medellín, Colombia",
        summary:
          "Development and maintenance of full-stack web applications in a fully remote, collaborative workflow.",
        highlights: [
          "Built responsive user interfaces with Vue.js and robust server-side APIs with Node.js / Express.",
          "Designed and managed relational database schemas in MySQL, ensuring data integrity across application features.",
          "Contributed through version control (Git) and engaged in peer code reviews to maintain code quality and standards.",
        ],
        tags: ["Vue.js", "Node.js", "Express", "MySQL", "Git"],
      },
    ],
  },
  stack: {
    heading: "Tech stack",
    counterHead: "Selected",
    everyday: "Everyday",
    items: [
      {
        name: "Next.js",
        note: "App Router, React Server Components and routing at the core of every production build.",
        level: 5,
      },
      {
        name: "TypeScript",
        note: "The default everywhere — contract-first code across frontend and full-stack work.",
        level: 5,
      },
      {
        name: "React",
        note: "Component systems, rendering models and design tokens at the core of each product.",
        level: 5,
      },
      {
        name: "Node.js",
        note: "Server-side APIs and Backend-for-Frontend proxies between the client and services.",
        level: 5,
      },
      {
        name: "Prisma",
        note: "Typed database access and schema management for relational projects.",
        level: 5,
      },
      {
        name: "MySQL",
        note: "Relational modeling, constraints and data integrity at product scale.",
        level: 5,
      },
      {
        name: "Redux",
        note: "Predictable client-side state for complex, multi-actor interfaces.",
        level: 5,
      },
      {
        name: "Vue.js",
        note: "Responsive UI development on full-stack web applications.",
        level: 5,
      },
      {
        name: "Tailwind CSS",
        note: "Systematic, token-driven styling inside scalable component libraries.",
        level: 5,
      },
      {
        name: "Jest",
        note: "Test coverage on critical application paths and rendering logic.",
        level: 4,
      },
      {
        name: "MongoDB",
        note: "Document storage for flexible, full-stack application data.",
        level: 4,
      },
      {
        name: "Express.js",
        note: "REST APIs and server logic powering web application backends.",
        level: 4,
      },
      {
        name: "Sequelize",
        note: "ORM-level schema management on relational projects.",
        level: 5,
      },
      {
        name: "Generative AI",
        note: "Gemini-powered product features — analysis, generation and structured output.",
        level: 4,
      },
    ],
  },
  about: {
    heading: "About",
    summary:
      "Senior Frontend Engineer with 6+ years of experience architecting and building high-performance, full-stack SaaS applications — Optimistic UI with client-side caching (IndexedDB/Dexie.js), generative AI integrations (Gemini), and secure Backend-for-Frontend (BFF) proxies. Specializing in React, Next.js and TypeScript.",
    focus: [
      "Frontend architecture",
      "High-performance interfaces",
      "Design systems",
      "Full-stack delivery",
    ],
    stats: [
      { value: "6+", label: "Years building" },
      { value: "14", label: "Technologies daily" },
    ],
    languagesLabel: "Languages",
    languages: [
      { name: "English", level: "Native" },
      { name: "French", level: "Native" },
      { name: "Japanese", level: "Beginner" },
    ],
    locationLabel: "Location",
    location: "Cotonou, Republic of Benin",
    availabilityLabel: "Availability",
    availability:
      "Works remotely from anywhere in the world · Available for relocation",
  },
  contact: {
    heading1: "Let's build",
    heading2: "something.",
    supporting:
      "Building fast, resilient digital products through thoughtful frontend architecture. I work remotely from anywhere in the world and am available for relocation.",
    downloadCv: "Download CV",
  },
  footer: {
    role: "Senior Frontend Engineer · Frontend Technical Lead",
    built: "Built with Next.js, React Three Fiber & GSAP",
    top: "Top",
  },
  caseStudy: {
    back: "All work",
    role: "Role",
    context: "Context",
    challenge: "Challenge",
    approach: "Approach",
    architecture: "Architecture",
    implementation: "Implementation",
    impact: "Impact",
    next: "Next project",
  },
  projects: [
    {
      slug: "cvstudioo",
      index: "01",
      name: "cvstudioo",
      kind: "AI-powered resume studio · Full-stack SaaS",
      summary:
        "A full-stack, AI-powered SaaS platform for building and refining professional resumés — with generative assistance for analysis and content. Led from concept to production.",
      role: "Frontend Technical Lead",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Gemini API",
        "Stripe",
        "IndexedDB / Dexie.js",
      ],
      context:
        "cvstudioo is a production SaaS platform where users create, structure and refine professional resumés. The product pairs a full document editor with an AI layer that analyzes resumés and generates content. As frontend technical lead, I owned architecture and delivery end to end.",
      challenge:
        "Ship a production-ready platform under real growth pressure: a resilient, optimistic UI, an AI generation layer, secure payment handling — and a product that could gain a meaningful user base quickly.",
      approach:
        "I led the end-to-end architecture and development from concept to production, structuring the frontend around a typed data model with immediate, optimistic feedback, and placing every client→server call behind a secure Backend-for-Frontend proxy.",
      architecture: [
        "UI in React / Next.js driven by a typed document model, with optimistic updates so interactions feel instant.",
        "Persistent, client-side caching on IndexedDB (Dexie.js) so editor state and drafts survive reloads and weak connections.",
        "A secure Backend-for-Frontend (BFF) proxy as the single surface for all API communications.",
        "Gemini-powered generative features — resume analysis and content generation — integrated through the BFF.",
        "Payment gateway integration with a secure, server-verified flow for real-time payment transactions.",
      ],
      implementation: [
        "Scaled the platform from concept to production — 1,000+ registered users (325+ active) within 2 months.",
        "Engineered the high-performance, resilient user experience: optimistic UI with persistent client-side caching.",
        "Integrated complex third-party services — the Gemini API for AI features and a payment gateway with server-verified transaction handling.",
        "Drove code quality and team growth through code reviews and architectural guidance.",
      ],
      impact: [
        "1,000+ registered users, 325+ active, reached within 2 months of launch.",
        "Resilient UX: optimistic updates with persistent caching across sessions.",
        "All API traffic secured behind a BFF proxy, including payments.",
      ],
    },
    {
      slug: "slack-clone",
      index: "02",
      name: "Slack Clone",
      kind: "Real-time team collaboration · Full-stack",
      summary:
        "A full-stack, real-time team collaboration application in the manner of Slack — direct messages, group channels and file sharing, delivered through a scalable design system, built and deployed to production.",
      role: "Full-stack Development",
      stack: [
        "Next.js 14",
        "Convex Realtime",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
      ],
      context:
        "A full-stack collaboration platform covering the core of Slack: authenticated workspaces, group channels, direct messages and file sharing — kept in sync in real time and delivered through a reusable component system.",
      challenge:
        "Build a feature-rich real-time application and deploy it as a full product — with dependable data synchronization, authentication, and a UI system that could scale visually across the whole app.",
      approach:
        "I developed the application end to end on a server-rendered Next.js frontend backed by a realtime engine, and built every screen from a scalable design system of components rather than one-off layouts.",
      architecture: [
        "Server-rendered Next.js frontend with a typed, realtime data layer.",
        "Convex realtime backend handling synchronization, presence and broadcasting.",
        "An authentication flow covering registration, login and session management.",
        "A scalable design system of reusable, consistent UI components across all screens.",
      ],
      implementation: [
        "Built and deployed the application to production.",
        "Delivered direct messages, group channels and file sharing with real-time updates.",
        "Added workspace and channel management, invitations, and emoji reactions — all synchronized live.",
        "Engineered the entire interface from a scalable component library.",
      ],
      impact: [
        "A complete, deployed real-time collaboration product.",
        "Live synchronization for messages, channels, files and reactions.",
        "A coherent interface delivered entirely through reusable components.",
      ],
    },
  ],
};

const fr: Messages = {
  meta: {
    title: "Steven Daye — Ingénieur Frontend Senior",
    description:
      "Ingénieur Frontend Senior et Lead Technique spécialisé en React, Next.js, TypeScript, architecture frontend et produits numériques haute performance.",
    keywords: [
      "Steven Daye",
      "ingénieur frontend",
      "frontend senior",
      "lead technique",
      "React",
      "Next.js",
      "TypeScript",
      "architecture frontend",
    ],
  },
  nav: {
    work: "Projets",
    about: "À propos",
    experience: "Expérience",
    contact: "Contact",
    hire: "Me contacter",
    cv: "CV",
    downloadCv: "Télécharger le CV (PDF)",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    switchLang: "Passer en anglais",
    themeToLight: "Activer le mode clair",
    themeToDark: "Activer le mode sombre",
    github: "GitHub (nouvel onglet)",
    linkedin: "LinkedIn (nouvel onglet)",
  },
  hero: {
    eyebrow: "Portfolio — 2026",
    location: "Cotonou · Remote partout dans le monde",
    line1: "Ingénieur Frontend",
    line2: "Senior",
    lead: "& Lead Technique",
    tagline: "Architecture · Performance · Produit",
    supporting:
      "Je conçois des produits numériques rapides et résilients grâce à une architecture frontend réfléchie.",
    scroll: "Défiler",
    intro: "Introduction",
  },
  work: {
    heading: "Projets sélectionnés",
    counterHead: "Full-stack · Sélection",
    caseStudy: "Étude de cas",
  },
  principles: {
    heading: "Comment je travaille",
    items: [
      {
        index: "01",
        title: "Performance",
        summary:
          "Les produits à forte affluence réclament des interfaces qui semblent instantanées. Cache client avec IndexedDB / Dexie.js, UI optimiste et rendu léger gardent les interactions rapides — même sous charge.",
      },
      {
        index: "02",
        title: "Résilience",
        summary:
          "Un bon logiciel survit aux pannes. La synchronisation de données persistante et non destructive garde les produits utilisables quand le réseau, les APIs ou les tiers défaillent.",
      },
      {
        index: "03",
        title: "Architecture",
        summary:
          "Des frontières claires entre UI, état, BFF et données. Des proxys BFF sécurisés donnent aux clients une surface unique et auditable, et gardent les secrets hors du navigateur.",
      },
      {
        index: "04",
        title: "Propriété",
        summary:
          "Une responsabilité de bout en bout, du concept à la production. Amener une plateforme de zéro à 1 000+ utilisateurs en deux mois tient autant de la propriété que de l'ingénierie.",
      },
      {
        index: "05",
        title: "Réflexion produit",
        summary:
          "Les interfaces servent l'intention produit. Collaborer à la recherche UX et traduire les objectifs des utilisateurs en systèmes fonctionnels et dignes de confiance.",
      },
      {
        index: "06",
        title: "Leadership",
        summary:
          "Revues de code, mentorat et conseils d'architecture accélèrent la vélocité d'équipe. La qualité d'ingénierie est une propriété d'équipe, pas d'individu.",
      },
    ],
  },
  experience: {
    heading: "Expérience",
    counter: "postes · International",
    items: [
      {
        index: "01",
        title: "Lead Technique Frontend",
        location: "Cotonou, Bénin",
        summary:
          "Architecture et développement de bout en bout de cvstudioo — une plateforme SaaS full-stack propulsée par l'IA, du concept à la production.",
        highlights: [
          "Portée à 1 000+ utilisateurs inscrits (325+ actifs) en 2 mois.",
          "Expérience résiliente avec UI optimiste et cache client persistant (IndexedDB / Dexie.js).",
          "Toutes les communications API sécurisées derrière un proxy Backend-for-Frontend (BFF).",
          "Intégration de Gemini pour des fonctionnalités génératives — analyse de CV et génération de contenu — ainsi qu'une passerelle de paiement avec un flux vérifié côté serveur pour des transactions en temps réel.",
          "Amélioration de la qualité du code et de la vélocité d'équipe via des revues de code et un accompagnement architectural.",
        ],
        tags: ["React", "Next.js", "TypeScript", "Node.js", "Gemini", "Stripe"],
      },
      {
        index: "02",
        title: "Ingénieur Frontend",
        location: "Barcelone, Espagne",
        summary:
          "Développement frontend from scratch d'une plateforme de réservation aérienne à très fort trafic, du concept au lancement.",
        highlights: [
          "Collaboration à la recherche UX pour définir l'expérience produit initiale.",
          "Développement d'une bibliothèque de composants extensible et thématisable consommée par Alaska Airlines, WizzAir, Avianca, Volaris et Jazeera Airways — au total 22M+ de voyageurs.",
          "Refonte complète du système de paiement, avec intégration de Stripe, RedSys, l'API Mastercard et Spreedly sur des plateformes aériennes à fort trafic.",
          "Traitement sécurisé des transactions pour une base de 1M+ de clients actifs.",
          "Amélioration de la qualité du code et de la vélocité sur toute l'équipe frontend.",
        ],
        tags: [
          "React",
          "Next.js",
          "Design Systems",
          "Stripe",
          "RedSys",
          "Spreedly",
        ],
      },
      {
        index: "03",
        title: "Développeur Full-stack",
        location: "Medellín, Colombie",
        summary:
          "Développement et maintenance d'applications web full-stack dans un workflow entièrement à distance et collaboratif.",
        highlights: [
          "Développement d'interfaces utilisateur responsives avec Vue.js et d'APIs côté serveur robustes avec Node.js / Express.",
          "Conception et gestion de schémas de bases de données relationnelles sous MySQL, assurant l'intégrité des données dans les fonctionnalités de l'application.",
          "Contribution via le contrôle de version (Git) et revues de code entre pairs pour maintenir qualité et standards.",
        ],
        tags: ["Vue.js", "Node.js", "Express", "MySQL", "Git"],
      },
    ],
  },
  stack: {
    heading: "Stack technique",
    counterHead: "Sélection",
    everyday: "Au quotidien",
    items: [
      {
        name: "Next.js",
        note: "App Router, React Server Components et routage au cœur de chaque build de production.",
        level: 5,
      },
      {
        name: "TypeScript",
        note: "Le standard partout — un code orienté contrat à travers le frontend et le full-stack.",
        level: 5,
      },
      {
        name: "React",
        note: "Systèmes de composants, modèles de rendu et design tokens au cœur de chaque produit.",
        level: 5,
      },
      {
        name: "Node.js",
        note: "APIs côté serveur et proxys Backend-for-Frontend entre le client et les services.",
        level: 5,
      },
      {
        name: "Prisma",
        note: "Accès typé aux données et gestion de schémas pour les projets relationnels.",
        level: 5,
      },
      {
        name: "MySQL",
        note: "Modélisation relationnelle, contraintes et intégrité des données à l'échelle produit.",
        level: 5,
      },
      {
        name: "Redux",
        note: "État client prévisible pour les interfaces complexes multi-acteurs.",
        level: 5,
      },
      {
        name: "Vue.js",
        note: "Développement d'UIs responsives sur des applications web full-stack.",
        level: 5,
      },
      {
        name: "Tailwind CSS",
        note: "Stylisation systématique et pilotée par tokens dans des bibliothèques de composants évolutives.",
        level: 5,
      },
      {
        name: "Jest",
        note: "Couverture de tests sur les chemins critiques et la logique de rendu.",
        level: 4,
      },
      {
        name: "MongoDB",
        note: "Stockage document pour des données applicatives full-stack flexibles.",
        level: 4,
      },
      {
        name: "Express.js",
        note: "APIs REST et logique serveur pour les backends d'applications web.",
        level: 4,
      },
      {
        name: "Sequelize",
        note: "Gestion de schémas côté ORM sur des projets relationnels.",
        level: 5,
      },
      {
        name: "Generative AI",
        note: "Fonctionnalités produits propulsées par Gemini — analyse, génération et sortie structurée.",
        level: 4,
      },
    ],
  },
  about: {
    heading: "À propos",
    summary:
      "Ingénieur Frontend Senior avec 6+ années d'expérience dans l'architecture et le développement d'applications SaaS full-stack haute performance — UI optimiste avec cache côté client (IndexedDB/Dexie.js), intégrations d'IA générative (Gemini) et proxys Backend-for-Frontend (BFF) sécurisés. Spécialisé en React, Next.js et TypeScript.",
    focus: [
      "Architecture frontend",
      "Interfaces haute performance",
      "Design systems",
      "Livraison full-stack",
    ],
    stats: [
      { value: "6+", label: "Années d'expérience" },
      { value: "14", label: "Technologies au quotidien" },
    ],
    languagesLabel: "Langues",
    languages: [
      { name: "Anglais", level: "Langue maternelle" },
      { name: "Français", level: "Langue maternelle" },
      { name: "Japonais", level: "Débutant" },
    ],
    locationLabel: "Localisation",
    location: "Cotonou, Bénin",
    availabilityLabel: "Disponibilité",
    availability:
      "Travaille à distance depuis n'importe où dans le monde · Disponible pour une relocation",
  },
  contact: {
    heading1: "Construisons",
    heading2: "quelque chose.",
    supporting:
      "Je conçois des produits numériques rapides et résilients grâce à une architecture frontend réfléchie. Je travaille à distance depuis n'importe où dans le monde et suis disponible pour une relocation.",
    downloadCv: "Télécharger le CV",
  },
  footer: {
    role: "Ingénieur Frontend Senior · Lead Technique Frontend",
    built: "Construit avec Next.js, React Three Fiber & GSAP",
    top: "Haut",
  },
  caseStudy: {
    back: "Tous les projets",
    role: "Rôle",
    context: "Contexte",
    challenge: "Défi",
    approach: "Approche",
    architecture: "Architecture",
    implementation: "Réalisation",
    impact: "Impact",
    next: "Projet suivant",
  },
  projects: [
    {
      slug: "cvstudioo",
      index: "01",
      name: "cvstudioo",
      kind: "Studio de CV propulsé par l'IA · SaaS full-stack",
      summary:
        "Une plateforme SaaS full-stack propulsée par l'IA pour créer et affiner des CV professionnels — avec assistance générative pour l'analyse et le contenu. Menée du concept à la production.",
      role: "Lead Technique Frontend",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Gemini API",
        "Stripe",
        "IndexedDB / Dexie.js",
      ],
      context:
        "cvstudioo est une plateforme SaaS de production où les utilisateurs créent, structurent et affinent des CV professionnels. Le produit associe un éditeur de documents complet à une couche IA qui analyse les CV et génère du contenu. En tant que lead technique frontend, j'ai piloté l'architecture et la livraison de bout en bout.",
      challenge:
        "Livrer une plateforme prête pour la production sous une vraie pression de croissance : une UI résiliente et optimiste, une couche de génération IA, un traitement sécurisé des paiements — et un produit capable de gagner rapidement une base d'utilisateurs significative.",
      approach:
        "J'ai piloté l'architecture et le développement de bout en bout, du concept à la production, en structurant le frontend autour d'un modèle de données typé avec retours optimistes immédiats, et en plaçant chaque appel client→serveur derrière un proxy Backend-for-Frontend sécurisé.",
      architecture: [
        "UI en React / Next.js pilotée par un modèle de document typé, avec mises à jour optimistes pour des interactions instantanées.",
        "Cache client persistant sur IndexedDB (Dexie.js) : l'état de l'éditeur et les brouillons survivent aux rechargements et aux connexions faibles.",
        "Un proxy Backend-for-Frontend (BFF) sécurisé comme surface unique de toutes les communications API.",
        "Fonctionnalités génératives propulsées par Gemini — analyse de CV et génération de contenu — intégrées via le BFF.",
        "Intégration d'une passerelle de paiement avec un flux vérifié côté serveur pour des transactions en temps réel.",
      ],
      implementation: [
        "Passage de la plateforme du concept à la production — 1 000+ utilisateurs inscrits (325+ actifs) en 2 mois.",
        "Expérience utilisateur haute performance et résiliente : UI optimiste avec cache client persistant.",
        "Intégration de services tiers complexes — l'API Gemini pour les fonctionnalités IA et une passerelle de paiement avec traitement des transactions vérifié côté serveur.",
        "Amélioration de la qualité du code et croissance de l'équipe via des revues de code et un accompagnement architectural.",
      ],
      impact: [
        "1 000+ utilisateurs inscrits, 325+ actifs, atteints dans les 2 mois suivant le lancement.",
        "UX résiliente : mises à jour optimistes et cache persistant entre les sessions.",
        "Tout le trafic API sécurisé derrière un proxy BFF, paiements inclus.",
      ],
    },
    {
      slug: "slack-clone",
      index: "02",
      name: "Slack Clone",
      kind: "Collaboration d'équipe temps réel · Full-stack",
      summary:
        "Une application full-stack de collaboration d'équipe temps réel dans la veine de Slack — messages directs, canaux de groupe et partage de fichiers, livrée via un design system évolutif, construite et déployée en production.",
      role: "Développement Full-stack",
      stack: [
        "Next.js 14",
        "Convex Realtime",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
      ],
      context:
        "Une plateforme de collaboration full-stack couvrant le cœur de Slack : espaces de travail authentifiés, canaux de groupe, messages directs et partage de fichiers — synchronisés en temps réel et livrés via un système de composants réutilisable.",
      challenge:
        "Construire une application temps réel riche en fonctionnalités et la déployer comme un produit complet — avec une synchronisation de données fiable, une authentification et un système d'UI capable d'évoluer visuellement dans toute l'application.",
      approach:
        "J'ai développé l'application de bout en bout sur un frontend Next.js rendu côté serveur, adossé à un moteur temps réel, et construit chaque écran à partir d'un design system évolutif plutôt que de mises en page one-shot.",
      architecture: [
        "Frontend Next.js rendu côté serveur avec une couche de données temps réel typée.",
        "Backend temps réel Convex gérant synchronisation, présence et diffusion.",
        "Un flux d'authentification couvrant inscription, connexion et gestion de session.",
        "Un design system évolutif de composants UI réutilisables et cohérents sur tous les écrans.",
      ],
      implementation: [
        "Construction et déploiement de l'application en production.",
        "Livraison des messages directs, canaux de groupe et partage de fichiers avec mises à jour en temps réel.",
        "Ajout de la gestion des espaces de travail et des canaux, des invitations et des réactions emoji — le tout synchronisé en direct.",
        "Conception de toute l'interface à partir d'une bibliothèque de composants évolutive.",
      ],
      impact: [
        "Un produit complet de collaboration temps réel, déployé.",
        "Synchronisation en direct des messages, canaux, fichiers et réactions.",
        "Une interface cohérente livrée entièrement via des composants réutilisables.",
      ],
    },
  ],
};

export const messages: Record<Locale, Messages> = { en, fr };
