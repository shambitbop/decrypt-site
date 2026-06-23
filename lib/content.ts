// All visible copy for Decrypt. Hard rule: no em dashes, no en dashes.
// Use ·, /, commas, and "to" for ranges.

export const NAV_LINKS = [
  { label: "What we do", href: "#what" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
] as const;

export const PREMISE_POINTS = [
  {
    label: "The messy middle.",
    body: "Half built systems, scattered spreadsheets, outdated sites, and disconnected platforms. We decode the mess into a structured software plan.",
  },
  {
    label: "The parts that must not break.",
    body: "Payments, authentication, customer data, dashboards, approvals, deployments. We build carefully where mistakes cost real money.",
  },
  {
    label: "The thing you cannot quite describe.",
    body: "You know what the system should do, not how to explain it technically. We translate business problems into working software.",
  },
] as const;

export const SERVICES = [
  {
    label: "AI-powered custom software",
    body: "Custom CRMs, ERPs, internal tools, dashboards, and workflow systems built around how your business actually operates.",
  },
  {
    label: "Web applications and SaaS",
    body: "Customer portals, admin panels, booking systems, dashboards, marketplaces, LMS platforms, and SaaS products.",
  },
  {
    label: "Mobile apps",
    body: "iOS, Android, and cross-platform apps for customers, field teams, operations, and product ecosystems.",
  },
  {
    label: "AI integration and automation",
    body: "Document workflows, reporting automation, AI dashboards, knowledge search, decision support, and Power Automate workflows.",
  },
  {
    label: "Website development and maintenance",
    body: "WordPress sites, business websites, content management, SEO structure, technical maintenance, and server deployments.",
  },
  {
    label: "QA, deployment, and support",
    body: "Quality assurance testing, release readiness, server deployment support, bug fixes, monitoring, and maintenance.",
  },
] as const;

export const PROMISES = [
  {
    label: "Built around your reality",
    body: "We build around business reality, not generic templates, and use AI where it creates real operational value.",
  },
  {
    label: "Full lifecycle support",
    body: "Discovery, documentation, UI/UX, development, QA, deployment, maintenance, and growth, all from one team.",
  },
  {
    label: "Cross-industry experience",
    body: "We have worked across language services, SaaS, healthcare, education, ecommerce, manufacturing, and finance apps.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: "01",
    label: "Intercept",
    body: "We listen to goals, workflows, current tools, users, content needs, system gaps, timelines, and risks.",
  },
  {
    n: "02",
    label: "Decode",
    body: "We turn the problem into scope, architecture, user flows, data flows, requirements, milestones, and acceptance criteria.",
  },
  {
    n: "03",
    label: "Build",
    body: "We design and engineer in tight loops. Websites, apps, backend, dashboards, AI workflows, content, and QA move together.",
  },
  {
    n: "04",
    label: "Deploy",
    body: "We launch, test, document, hand over, support, and keep improving after release.",
  },
] as const;

// ── Case studies (used as cards on the homepage, full detail in modal) ──
export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  projectType: string;
  servicesDelivered: string;
  tag: string;
  overview: string;
  challenge: string;
  delivered: string[];
  businessValue: string;
  capabilities: string[];
  reflection: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "prime-marble-granite",
    client: "Prime Marble and Granite",
    industry: "Construction materials, stone fabrication, and operational management",
    projectType: "Enterprise software, ERP, mobile app, web app, and AI dashboards",
    servicesDelivered:
      "ERP system, mobile app, web app, AI-based dashboards, operational workflow support",
    tag: "ERP · AI dashboards · mobile and web app",
    overview:
      "The engagement focused on building digital systems for operational workflows through an ERP system, mobile and web application access, and AI-based dashboards.",
    challenge:
      "Operations-heavy businesses often need more than a website. They need a structured system for managing information, work status, users, reporting, and decisions across teams, while staying usable across web and mobile environments.",
    delivered: [
      "ERP system for operational management",
      "Mobile and web application experience",
      "AI-based dashboards for better visibility",
      "Workflow-focused software structure",
      "Business-facing interface and system planning",
      "Support for a scalable digital operating model",
    ],
    businessValue:
      "This project demonstrates Decrypt's ability to move beyond basic website development into full business-system delivery, with capability in ERP thinking, operational software, mobile access, dashboard intelligence, and AI-ready reporting.",
    capabilities: [
      "ERP software development",
      "AI dashboard development",
      "Web app development",
      "Mobile app development",
      "Operations workflow design",
      "Business intelligence interface planning",
    ],
    reflection:
      "Decrypt helped turn a complex operational requirement into a clearer software system with ERP structure, mobile access, and dashboard visibility. The work showed strong understanding of both business operations and technical delivery.",
  },
  {
    slug: "oono-ai",
    client: "Oono.ai",
    industry: "SaaS, marketing technology, and lead generation",
    projectType: "Website, web app, mobile apps, product management, and growth support",
    servicesDelivered:
      "Website creation, web and mobile apps for iOS and Android, lead generation, QA testing, content creation, product management, product marketing, UI/UX, and deployments",
    tag: "SaaS · web and mobile app · product growth",
    overview:
      "Oono.ai is positioned around interactive stories that help businesses drive more leads and create more engaging digital experiences. Decrypt supported both product and growth needs across website, apps, UI/UX, content, lead generation, product management, product marketing, QA, and deployments.",
    challenge:
      "SaaS and marketing technology products need more than code. They require a clear website, usable product interfaces, content that explains the value, growth workflows, QA, deployment discipline, and product management alignment.",
    delivered: [
      "Website creation for a SaaS product presence",
      "Web app and mobile app creation for iOS and Android",
      "UI/UX support for product experience",
      "Lead generation support",
      "Content creation and product marketing support",
      "QA testing, product management, and server deployments",
    ],
    businessValue:
      "This engagement shows Decrypt's ability to support a product across the full digital lifecycle: brand presence, product interface, mobile experience, growth messaging, testing, and deployment.",
    capabilities: [
      "SaaS website creation",
      "Web and mobile app development",
      "iOS and Android product support",
      "Product management",
      "Lead generation and product marketing",
      "QA and deployment support",
    ],
    reflection:
      "Decrypt supported our product from website and app creation through UI/UX, content, testing, deployment, and growth workflows. They understood that a SaaS product needs both technical delivery and market-facing clarity.",
  },
  {
    slug: "cesco-linguistic-services",
    client: "CESCO Linguistic Services",
    industry: "Language services, localization, interpreting, and translation",
    projectType:
      "Website maintenance, custom app work, automation, content operations, and product/project management",
    servicesDelivered:
      "WordPress site development and maintenance, content management, custom app development, document creation, SharePoint, Power Automate, product and project management, UI/UX, QA, and deployments",
    tag: "WordPress · SharePoint · Power Automate",
    overview:
      "CESCO Linguistic Services operates in language services, interpretation, translation, and localization. Decrypt supported a broad digital operations scope across WordPress, content management, custom application support, SharePoint, Power Automate, product/project management, UI/UX, QA, and deployments.",
    challenge:
      "A language services organization often manages many content, document, workflow, and operational needs at once. The digital environment must stay updated, organized, and reliable while supporting client-facing content, internal collaboration, automation, and ongoing changes.",
    delivered: [
      "WordPress site development and ongoing maintenance",
      "Content management, content creation, and document creation",
      "Custom application development support",
      "SharePoint management and Power Automate management",
      "Product and project management support",
      "UI/UX, QA testing, server deployments, and deployment support",
    ],
    businessValue:
      "This engagement demonstrates Decrypt's ability to support digital operations as an ongoing partner, combining website, content, automation, Microsoft 365 workflows, technical support, product management, and QA.",
    capabilities: [
      "WordPress development and maintenance",
      "SharePoint and Power Automate workflow support",
      "Content operations",
      "Custom app support",
      "Product and project management",
      "QA and server deployments",
    ],
    reflection:
      "Decrypt became a practical digital operations partner across website maintenance, content, workflow tools, SharePoint, Power Automate, QA, and deployments. Their support helped connect technical execution with day to day business needs.",
  },
  {
    slug: "hisab-kitab",
    client: "Hisab Kitab",
    industry: "Finance, expense management, and personal productivity",
    projectType: "Android mobile application",
    servicesDelivered: "Android app for expense sharing and management",
    tag: "Android · fintech utility app",
    overview:
      "Hisab Kitab is a mobile app project focused on expense sharing and expense management, demonstrating Decrypt's ability to build focused Android-first tools around a clear user problem.",
    challenge:
      "Expense sharing needs to be simple, fast, and easy to understand. The product needed to support practical mobile usage for users managing shared expenses and personal finance records.",
    delivered: [
      "Android mobile app development",
      "Expense sharing workflow",
      "Expense management structure",
      "User-focused mobile interface",
      "Application logic for shared financial tracking",
    ],
    businessValue:
      "This project supports Decrypt's mobile app development credibility, especially for consumer utility apps and finance-related workflows where clarity and usability are essential.",
    capabilities: [
      "Android app development",
      "Mobile product planning",
      "Expense workflow design",
      "User experience for financial tracking",
      "Focused MVP/product delivery",
    ],
    reflection:
      "Decrypt helped shape a focused Android app around expense sharing and management. The work translated a simple user need into a practical mobile experience.",
  },
  {
    slug: "t360nbeyond",
    client: "T360nBeyond",
    industry: "Education, interpreter training, continuing education, and LMS",
    projectType: "Website, LMS, and digital content operations",
    servicesDelivered:
      "Website creation and maintenance, content creation, email marketing, and LMS management",
    tag: "LMS · website · email marketing",
    overview:
      "T360nBeyond provides professional learning and continuing education for language professionals through live and on-demand training. Decrypt supported website creation and maintenance, content creation, email marketing, and LMS management.",
    challenge:
      "Education and training platforms require updated content, course visibility, user-friendly navigation, reliable LMS management, and ongoing communication with learners.",
    delivered: [
      "Website creation and maintenance",
      "Content creation and content updates",
      "Email marketing support",
      "LMS management",
      "Digital learning platform support",
    ],
    businessValue:
      "This engagement shows Decrypt's ability to support education and LMS businesses where content, courses, email communication, and platform maintenance must work together.",
    capabilities: [
      "Education website development",
      "LMS management",
      "Content operations",
      "Email marketing support",
      "Website maintenance",
      "Digital platform support",
    ],
    reflection:
      "Decrypt supported our website, LMS, content, and email marketing needs with a practical understanding of how training platforms must stay clear, current, and easy to manage.",
  },
  {
    slug: "shopnado",
    client: "Shopnado",
    industry: "Ecommerce, Amazon marketplace growth, and brand operations",
    projectType: "Website creation, maintenance, content, and server deployments",
    servicesDelivered: "Website creation and maintenance, content creation, and server deployments",
    tag: "Ecommerce · website · deployments",
    overview:
      "Shopnado is positioned as an Amazon and marketplace growth partner for brands focused on long-term growth. Decrypt supported website creation and maintenance, content creation, and server deployments.",
    challenge:
      "Marketplace and ecommerce service brands need a polished website that explains their value, supports consultations, and stays technically stable as positioning evolves.",
    delivered: [
      "Website creation",
      "Website maintenance",
      "Content creation",
      "Server deployment support",
      "Digital presence support",
    ],
    businessValue:
      "This project shows Decrypt's ability to support ecommerce and marketplace-facing brands with content, website delivery, and technical deployment.",
    capabilities: [
      "Ecommerce website development",
      "Marketplace brand website support",
      "Content creation",
      "Website maintenance",
      "Server deployment",
    ],
    reflection:
      "Decrypt supported our website, content, and deployment needs with the clarity required for a marketplace-focused brand. The work helped shape a stronger digital presence.",
  },
  {
    slug: "bliss-dental-center",
    client: "Bliss Dental Center",
    industry: "Healthcare, family dentistry, cosmetic dentistry, and emergency dental care",
    projectType: "Website creation, maintenance, content, QA, and deployment support",
    servicesDelivered:
      "Website creation and maintenance, content creation, quality assurance testing, and server deployments",
    tag: "Healthcare · website · QA",
    overview:
      "Bliss Dental Center is a healthcare and dental care provider serving patients through family, cosmetic, and emergency dentistry. Decrypt supported website creation and maintenance, content creation, QA testing, and server deployments.",
    challenge:
      "Healthcare websites must be clear, trustworthy, easy to navigate, and technically reliable. Patients need access to services, location information, booking pathways, and content that builds confidence before they contact the clinic.",
    delivered: [
      "Website creation",
      "Website maintenance",
      "Healthcare content support",
      "Quality assurance testing",
      "Server deployment support",
    ],
    businessValue:
      "This engagement demonstrates Decrypt's ability to support healthcare websites where clarity, trust, local visibility, QA, and uptime matter.",
    capabilities: [
      "Healthcare website development",
      "Website maintenance",
      "Content creation",
      "QA testing",
      "Server deployment",
      "Local-service website support",
    ],
    reflection:
      "Decrypt supported our website, content, QA, and deployment needs with a clear understanding of how healthcare websites must build trust and remain easy for patients to use.",
  },
];

// ── Pricing, grouped by category ──
export type PricingItem = {
  name: string;
  range: string;
  body: string;
};

export type PricingGroup = {
  slug: string;
  title: string;
  rangeSummary: string;
  blurb: string;
  items: PricingItem[];
};

export const PRICING_GROUPS: PricingGroup[] = [
  {
    slug: "web-software",
    title: "Web and Software",
    rangeSummary: "$300 to $5,000+",
    blurb: "Custom software, web applications, and the backend that holds them together.",
    items: [
      {
        name: "Software Strategy and Product Discovery",
        range: "$300 to $1,200",
        body: "AI-assisted product discovery, PRD and SRS creation, technical feasibility analysis, software architecture consulting, user flows, and a fixed-price build quote.",
      },
      {
        name: "Custom Software Development",
        range: "$450 to $6,000+",
        body: "Internal business systems, CRM development, ERP development, workflow automation, one core workflow, database, basic PRD, deployment, and 2 weeks support.",
      },
      {
        name: "Web Application Development",
        range: "$450 to $5,000+",
        body: "Custom web applications, SaaS platforms, enterprise portals, business dashboards, user authentication, database, admin panel, API integrations, PRD/SRS documentation, deployment, and 1 month support.",
      },
      {
        name: "MVP Software Development",
        range: "$450 to $5,000+",
        body: "Lean MVP development for simple web apps, dashboards, portals, internal tools, and early SaaS validation. Larger AI-ready MVPs are quoted separately.",
      },
      {
        name: "Backend Development",
        range: "$450 to $4,000+",
        body: "Starter backend development for APIs, databases, admin logic, authentication, dashboards, app backends, and integration-ready foundations for small systems.",
      },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI and Automation",
    rangeSummary: "$200 to $3,000+",
    blurb: "AI integration, workflow automation, and the systems that connect your tools.",
    items: [
      {
        name: "AI Automation",
        range: "$200 to $1,200+",
        body: "AI workflow automation, document routing, data extraction, and connecting business apps to reduce manual data entry. Includes workflow audit, setup, testing, and handoff documentation.",
      },
      {
        name: "AI-Powered Software Solutions",
        range: "$250 to $3,000+",
        body: "AI integration into CRM, ERP, and business software, intelligent workflows, document intelligence, AI reporting, automated decision support, feasibility check, pilot implementation, testing, and 1 month refinement.",
      },
      {
        name: "Software Integration Services",
        range: "$300 to $3,000+",
        body: "CRM, ERP, SaaS, API, payment, email, analytics, automation, and AI tool integrations for focused use cases and small to mid business workflows.",
      },
    ],
  },
  {
    slug: "mobile",
    title: "Mobile Apps",
    rangeSummary: "$450 to $8,000+",
    blurb: "iOS, Android, and cross-platform apps, built and shipped to the app stores.",
    items: [
      {
        name: "Mobile App Development",
        range: "$450 to $8,000+",
        body: "iOS, Android, Flutter, and React Native apps with backend API, testing, app-store submission support, and 1 month support.",
      },
    ],
  },
  {
    slug: "websites",
    title: "Websites",
    rangeSummary: "$100 to $500",
    blurb: "Landing pages and small business websites, live fast.",
    items: [
      {
        name: "Landing Page / Small Business Website",
        range: "$100 to $500",
        body: "Custom landing page or small business website, 1 to 3 pages, mobile-responsive layout, contact forms, SEO-friendly structure, SSL certificate, and domain deployment support.",
      },
    ],
  },
  {
    slug: "maintenance-qa",
    title: "Maintenance and QA",
    rangeSummary: "$100/mo to $2,000+",
    blurb: "Keep what you have running, tested, and improving.",
    items: [
      {
        name: "Website and Software Maintenance",
        range: "$100/mo to $1,000/mo",
        body: "Website and software maintenance, bug fixes, small updates, speed improvements, security patches, integration checks, and AI workflow refinements for smaller systems.",
      },
      {
        name: "Software QA Services",
        range: "$250 to $2,000+",
        body: "Manual testing, basic regression testing, API validation, mobile/web QA checks, bug documentation, and AI workflow spot checks for small projects.",
      },
    ],
  },
  {
    slug: "enterprise",
    title: "Enterprise Systems",
    rangeSummary: "$2,500 to $15,000+",
    blurb: "ERP, business automation, and legacy modernization for operations-heavy teams.",
    items: [
      {
        name: "Enterprise Systems and Business Automation",
        range: "$2,500 to $15,000+",
        body: "Enterprise software, ERP systems, approval workflows, business process automation, legacy modernization, architecture design, deployment, and 3 months support. Complex enterprise projects require custom quotes.",
      },
    ],
  },
];

export const PRICING_FAQ = [
  {
    q: "How much does custom software cost?",
    a: "Custom software starter packages begin at $450 to $6,000+ for focused internal systems, workflow automation, CRM development, ERP development, database setup, basic PRD, deployment, and 2 weeks support. Larger AI features, integrations, enterprise systems, and complex platforms are quoted after discovery.",
  },
  {
    q: "Can Decrypt start with a small project?",
    a: "Yes. Many engagements can begin with a $100 to $500 landing page, $200 to $1,200+ AI automation pilot, $300 to $1,200 discovery package, website improvement, QA support, or a focused MVP.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. Decrypt supports maintenance for websites, software systems, content, QA, deployments, SharePoint, Power Automate, and technical improvements.",
  },
] as const;

export const HOMEPAGE_FAQ = [
  {
    q: "What does Decrypt build?",
    a: "Decrypt builds AI-ready custom software, web apps, mobile apps, ERP systems, dashboards, websites, backend systems, SharePoint workflows, automation, and integrations.",
  },
  {
    q: "Does Decrypt only build AI products?",
    a: "No. We build practical software first and add AI where it improves reporting, automation, search, documents, decisions, or user experience.",
  },
  {
    q: "Can Decrypt maintain existing websites and systems?",
    a: "Yes. We support website maintenance, content management, QA testing, deployments, server support, SharePoint workflows, Power Automate flows, and software improvements.",
  },
  {
    q: "Can Decrypt help if the idea is unclear?",
    a: "Yes. We start by decoding the problem into a clear plan, scope, workflow, architecture, and delivery path before development begins.",
  },
] as const;

// ── About section ──
export const ABOUT_INTRO =
  "Decrypt is an AI-powered software studio that helps businesses build intelligent systems, automate operations, modernize workflows, and maintain reliable digital products.";

export const ABOUT_BODY =
  "We combine product discovery, UI/UX, software engineering, web and mobile app development, WordPress, SharePoint, Power Automate, backend systems, content operations, QA, deployments, and post-launch maintenance. Our work is practical: reduce manual work, improve visibility, connect tools, and make digital systems easier to manage.";

export const ABOUT_DIFFERENTIATORS = [
  "We decode unclear business problems before writing code.",
  "We build software around real workflows, not templates.",
  "We combine product, content, project management, and engineering.",
  "We support AI where it improves operations, reporting, dashboards, or automation.",
  "We stay involved after launch through QA, maintenance, and deployment support.",
] as const;

export const ABOUT_STATS = [
  { label: "Industries served", value: "Manufacturing, SaaS, language services, education, healthcare, ecommerce" },
  { label: "Engagement style", value: "Discovery to deployment, one team, no handoffs between agencies" },
  { label: "Where AI fits", value: "Reporting, automation, search, documents, and decision support, never decoration" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Studio",
    links: [
      { label: "What we do", href: "#what" },
      { label: "How we work", href: "#how" },
      { label: "Work", href: "#work" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Pricing", href: "#pricing" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Start",
    links: [{ label: "Start a project", href: "#start" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

// Form options
export const NEED_OPTIONS = [
  "AI software or automation",
  "Custom software",
  "ERP / CRM / dashboard",
  "Web application",
  "Mobile app",
  "Website development",
  "Website maintenance",
  "SharePoint / Power Automate",
  "LMS management",
  "QA / deployment",
  "Not sure yet",
] as const;

export const BUDGET_OPTIONS = [
  "Under $10k",
  "$10k to $50k",
  "$50k to $150k",
  "$150k+",
  "Not sure",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP",
  "1 to 3 months",
  "3 months or more",
  "Just exploring",
] as const;
