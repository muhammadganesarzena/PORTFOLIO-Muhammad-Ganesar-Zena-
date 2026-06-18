import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Code, Gamepad2, ShoppingCart, Smartphone, Droplets, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

// ── PROJECTS DATA ──────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  tagColor: string;
  gradient: string;
  link?: string;
  visual: string;
}

const projects: Project[] = [
 {
    id: 1,
    title: "TOKO JUARA KELAS",
    description:
      "Mobile e-commerce app for school/store product ordering with authentication, wishlist, cart, checkout, QRIS payment proof upload, admin verification, delivery flows, NFC inventory, and Supabase backend.",
    tags: ["EXPO", "TYPESCRIPT", "SUPABASE", "QRIS", "NFC"],
    tagColor: "from-violet-500/20 to-cyan-500/20 border-violet-500/30 text-violet-200",
    gradient: "from-violet-900/40 via-cyan-900/20 to-slate-900",
    visual: "mobile",
    link: "https://github.com/muhammadganesarzena/TokoJuaraKelas",
  },
  {
    id: 2,
    title: "WHISPER OF THE FOREST",
    description:
      "2D/3D indie game built in Unity with custom AI systems, gameplay mechanics, storyline, and multiple chapters. Published and playable on itch.io.",
    tags: ["C#", "UNITY", "GAME AI", "OOP"],
    tagColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
    gradient: "from-emerald-900/40 via-teal-900/20 to-slate-900",
    visual: "game",
    link: "https://ganesar-zena.itch.io/whisper-of-the-forest",
  },
  {
    id: 3,
    title: "VITAMIN ULTIGAR",
    description:
      "E-commerce Shopee affiliate platform with an AI keyword chatbot for product recommendations, user dashboard, admin CRUD panel, and role-based access control.",
    tags: ["PHP", "MYSQL", "CHATBOT", "RBAC"],
    tagColor: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
    gradient: "from-cyan-900/40 via-blue-900/20 to-slate-900",
    visual: "ecommerce",
    link: "https://github.com/1bgss/Ultigar-Vit-Web",
  },
 

   {
    id: 4,
    title: "GEREJA RPBI SION",
    description:
      "Web-based information system for church activities including worship schedules, events, gallery, registration, and contact management using Laravel MVC architecture.",
    tags: ["LARAVEL", "PHP", "MYSQL", "MVC"],
    tagColor: "from-red-500/20 to-orange-500/20 border-red-500/30 text-red-300",
    gradient: "from-red-900/40 via-orange-900/20 to-slate-900",
    visual: "church",
    link: undefined,
  },

  {
    id: 5,
    title: "DARAHKITA",
    description:
      "Cross-platform mobile app to streamline blood donation requests, event coordination, and real-time stock monitoring. Features Google OAuth, OTP verification, interactive maps with radius-based search, admin dashboard with real-time KPIs, QR Code event check-ins, and mHealth gamification with XP & tier badges.",
    tags: ["REACT NATIVE", "TYPESCRIPT", "SUPABASE", "QR CODE", "mHEALTH"],
    tagColor: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300",
    gradient: "from-rose-900/40 via-red-900/20 to-slate-900",
    visual: "blood",
    link: "https://github.com/RasyaAbhista/DarahKita---Apps",
  },
];

// ── EXPERIENCE DATA ────────────────────────────────────────────────────────────

const experiences = [
  {
    id: 1,
    title: "Web Developer",
    organization: "Website Gereja RPBI Sion Karawang",
    date: "Nov 2024 – Jan 2025",
    description: "Developed a comprehensive church information system utilizing MVC architecture and OOP principles.",
    achievements: [
      "Built features for worship schedules, events, gallery, and registration",
      "Implemented FAQ and contact management systems",
      "Collaborated efficiently in a team environment using Laravel",
    ],
    tags: ["Laravel", "PHP", "MVC", "OOP", "MySQL"],
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    mockups: [] as { src: string; label: string }[],
  },
  {
    id: 2,
    title: "Game Developer",
    organization: '"Whisper Of The Forest" Academic Project',
    date: "Sep 2025 – Dec 2025",
    description: "Developed a fully functional indie game as an academic project at UMN, focusing on mechanics, AI, and storytelling.",
    achievements: [
      "Designed and implemented gameplay mechanics, AI systems, and interactive menus",
      "Structured chapters and overarching storyline",
      "Conducted thorough testing & debugging before publishing",
    ],
    tags: ["C#", "Unity", "Game Design", "AI Systems"],
    link: "https://youtu.be/6PbXFbymnG8?si=4U9IBkwdnLpmy6KH",
    icon: Gamepad2,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    mockups: [
      { src: "/mockups/whisper_1.png", label: "Main Menu" },
      { src: "/mockups/whisper_2.png", label: "Haunted House" },
      { src: "/mockups/whisper_3.png", label: "Ghost Encounter" },
      { src: "/mockups/whisper_4.png", label: "Indoor Scene" },
    ],
  },
  {
    id: 3,
    title: "Web Developer (Freelance)",
    organization: "E-Commerce Shopee Affiliate Website",
    date: "Dec 2024",
    description: "Built an e-commerce affiliate platform with integrated chatbot capabilities for Vitamin Ultigar.",
    achievements: [
      "Developed a keyword-based chatbot consultation system",
      "Created comprehensive user dashboards and admin CRUD interfaces",
      "Implemented secure authentication and Role-Based Access Control (RBAC)",
    ],
    tags: ["PHP", "MySQL", "Chatbot", "RBAC", "E-Commerce"],
    icon: ShoppingCart,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    mockups: [
      { src: "/mockups/ultigar_home.png", label: "Homepage" },
      { src: "/mockups/ultigar_chatbot.png", label: "AI Chatbot" },
      { src: "/mockups/ultigar_admin.png", label: "Admin Dashboard" },
    ],
  },
  {
    id: 4,
    title: "Mobile App Developer",
    organization: "Academic Project | Toko Juara Kelas E-Commerce App",
    date: "2026",
    description: "Developed a mobile e-commerce application for school and store product ordering using React Native Expo, TypeScript, and Supabase.",
    achievements: [
      "Implemented user authentication, persistent login sessions, product browsing, wishlist, cart, checkout, and order history",
      "Integrated Supabase for authentication, database management, storage, and order data processing",
      "Built QRIS-based payment flow with payment proof upload and admin payment verification",
      "Developed admin dashboard with product, category, user, order, and chat management",
      "Added NFC inventory management using NFC scanning to read card UID and manage item stock data",
    ],
    tags: ["React Native Expo", "TypeScript", "Supabase", "QRIS", "NFC"],
    icon: Smartphone,
    color: "from-emerald-500/20 to-cyan-500/20",
    borderColor: "border-emerald-500/30",
    mockups: [
      { src: "/mockups/tokojuarakelas_1.png", label: "Feed & Produk" },
      { src: "/mockups/tokojuarakelas_2.png", label: "Checkout & QRIS" },
    ],
  },
  {
    id: 5,
    title: "Mobile App Developer",
    organization: "Academic Project | DarahKita Blood Donation App",
    date: "2026",
    description: "Developed a cross-platform mobile application designed to streamline blood donation requests, event coordination, and real-time stock monitoring using React Native Expo, TypeScript, and Supabase.",
    achievements: [
      "Implemented multi-channel authentication (Email & Google OAuth) with OTP verification and persistent login sessions",
      "Designed a data security rollback mechanism via Supabase Admin to auto-purge orphan auth states during RLS anomalies",
      "Engineered interactive map system with React Native Maps & OpenStreetMap: radius-based calculation, live blood stock indicators, and custom markers",
      "Built Admin Dashboard with real-time KPI tracking, dynamic data visualizers via Supabase Realtime, and cascading data deletions",
      "Deployed QR Code ticket generation for automated event check-ins and a reward validation scheme via dynamic status changes",
      "Embedded mHealth gamification: user level profiling, XP distribution algorithms, and inventory rewards partitioned by rare tier badges",
    ],
    tags: ["React Native Expo", "TypeScript", "Supabase", "React Native Maps", "QR Code", "mHealth"],
    icon: Droplets,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "border-rose-500/30",
    mockups: [
      { src: "/mockups/darahkita.jpeg", label: "App Mockup" },
    ],
  },
];

// ── PROJECT VISUALS ────────────────────────────────────────────────────────────

function ProjectVisual({ visual }: { visual: string }) {
  if (visual === "church") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-red-900/60 via-orange-900/40 to-slate-900 flex items-center justify-center">
        <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 opacity-80">
          <rect x="75" y="60" width="50" height="80" fill="none" stroke="#f97316" strokeWidth="2" rx="2" />
          <polygon points="100,10 60,60 140,60" fill="none" stroke="#f97316" strokeWidth="2" />
          <rect x="90" y="100" width="20" height="40" fill="#f97316" opacity="0.3" rx="2" />
          <rect x="83" y="75" width="12" height="12" fill="#f97316" opacity="0.5" rx="1" />
          <rect x="105" y="75" width="12" height="12" fill="#f97316" opacity="0.5" rx="1" />
          <line x1="100" y1="30" x2="100" y2="55" stroke="#f97316" strokeWidth="2" />
          <line x1="88" y1="43" x2="112" y2="43" stroke="#f97316" strokeWidth="2" />
          {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x) =>
            [20, 40, 60, 80, 100, 120, 140].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="0.5" fill="#f97316" opacity="0.2" />
            ))
          )}
        </svg>
      </div>
    );
  }
  if (visual === "game") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-900/60 via-teal-900/40 to-slate-900 flex items-center justify-center">
        <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 opacity-80">
          <ellipse cx="100" cy="120" rx="70" ry="20" fill="#064e3b" opacity="0.5" />
          <polygon points="100,20 130,80 140,120 100,110 60,120 70,80" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <polygon points="100,20 80,60 100,55 120,60" fill="#10b981" opacity="0.3" />
          <polygon points="80,60 60,120 100,110" fill="#10b981" opacity="0.2" />
          <polygon points="120,60 140,120 100,110" fill="#059669" opacity="0.2" />
          <circle cx="100" cy="55" r="8" fill="none" stroke="#6ee7b7" strokeWidth="1.5" />
          <circle cx="75" cy="90" r="5" fill="#6ee7b7" opacity="0.4" />
          <circle cx="125" cy="85" r="5" fill="#6ee7b7" opacity="0.4" />
          <circle cx="100" cy="100" r="4" fill="#34d399" opacity="0.6" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={40 + i * 30} y1={20} x2={40 + i * 30} y2={140} stroke="#10b981" strokeWidth="0.3" opacity="0.15" />
          ))}
        </svg>
      </div>
    );
  }
  if (visual === "mobile") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-violet-900/60 via-cyan-900/40 to-slate-900 flex items-center justify-center">
        <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 opacity-85">
          <rect x="68" y="14" width="64" height="132" rx="12" fill="none" stroke="#a78bfa" strokeWidth="2" />
          <rect x="77" y="31" width="46" height="86" rx="5" fill="#0891b2" opacity="0.16" />
          <rect x="85" y="43" width="30" height="8" rx="2" fill="#67e8f9" opacity="0.5" />
          <rect x="85" y="59" width="30" height="8" rx="2" fill="#a78bfa" opacity="0.45" />
          <rect x="85" y="75" width="30" height="8" rx="2" fill="#67e8f9" opacity="0.35" />
          <circle cx="100" cy="130" r="5" fill="#a78bfa" opacity="0.65" />
          <path d="M53 44h18M53 60h18M53 76h18" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
          <path d="M129 51h18M129 67h18M129 83h18" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
          <circle cx="56" cy="108" r="11" fill="none" stroke="#67e8f9" strokeWidth="1.5" opacity="0.55" />
          <path d="M51 108l3 3 7-8" stroke="#67e8f9" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          <rect x="132" y="104" width="20" height="20" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.65" />
          <path d="M137 114h10M142 109v10" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        </svg>
      </div>
    );
  }
  if (visual === "blood") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-rose-900/60 via-red-900/40 to-slate-900 flex items-center justify-center">
        <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 opacity-85">
          {/* blood drop shape */}
          <path d="M100 20 C100 20 65 70 65 100 A35 35 0 0 0 135 100 C135 70 100 20 100 20Z" fill="none" stroke="#fb7185" strokeWidth="2" opacity="0.8" />
          <path d="M100 40 C100 40 78 78 78 100 A22 22 0 0 0 122 100 C122 78 100 40 100 40Z" fill="#fb7185" opacity="0.15" />
          {/* cross / plus symbol */}
          <line x1="100" y1="84" x2="100" y2="116" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="84" y1="100" x2="116" y2="100" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          {/* map pin dots */}
          <circle cx="48" cy="60" r="5" fill="#fda4af" opacity="0.5" />
          <circle cx="48" cy="60" r="9" fill="none" stroke="#fda4af" strokeWidth="1" opacity="0.3" />
          <circle cx="152" cy="75" r="4" fill="#fda4af" opacity="0.5" />
          <circle cx="152" cy="75" r="8" fill="none" stroke="#fda4af" strokeWidth="1" opacity="0.3" />
          <circle cx="40" cy="120" r="3" fill="#fda4af" opacity="0.4" />
          <circle cx="160" cy="115" r="3" fill="#fda4af" opacity="0.4" />
          {/* radius circle */}
          <circle cx="100" cy="100" r="55" fill="none" stroke="#fb7185" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.25" />
          {/* connecting lines */}
          <line x1="48" y1="60" x2="100" y2="100" stroke="#fb7185" strokeWidth="0.7" opacity="0.2" />
          <line x1="152" y1="75" x2="100" y2="100" stroke="#fb7185" strokeWidth="0.7" opacity="0.2" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-900/60 via-blue-900/40 to-slate-900 flex items-center justify-center">
      <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 opacity-80">
        <rect x="30" y="20" width="140" height="100" rx="8" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
        <rect x="30" y="20" width="140" height="28" rx="8" fill="#06b6d4" opacity="0.15" />
        <circle cx="48" cy="34" r="5" fill="#06b6d4" opacity="0.6" />
        <circle cx="65" cy="34" r="5" fill="#0ea5e9" opacity="0.4" />
        <rect x="45" y="62" width="110" height="8" rx="2" fill="#06b6d4" opacity="0.3" />
        <rect x="45" y="76" width="80" height="8" rx="2" fill="#06b6d4" opacity="0.2" />
        <rect x="45" y="90" width="95" height="8" rx="2" fill="#06b6d4" opacity="0.2" />
        <rect x="60" y="130" width="80" height="22" rx="11" fill="#06b6d4" opacity="0.3" />
        <text x="100" y="145" textAnchor="middle" fill="#06b6d4" fontSize="10" opacity="0.8">EXPLORE</text>
        <circle cx="160" cy="34" r="4" fill="#f87171" opacity="0.5" />
        <circle cx="148" cy="34" r="4" fill="#fbbf24" opacity="0.5" />
      </svg>
    </div>
  );
}

function getCardStyle(offset: number) {
  const abs = Math.abs(offset);
  if (abs === 0) return { x: 0, scale: 1, rotateY: 0, z: 100, opacity: 1, zIndex: 30 };
  if (abs === 1) {
    const sign = offset > 0 ? 1 : -1;
    return { x: sign * 360, scale: 0.78, rotateY: sign * -25, z: -80, opacity: 0.7, zIndex: 20 };
  }
  const sign = offset > 0 ? 1 : -1;
  return { x: sign * 650, scale: 0.6, rotateY: sign * -42, z: -200, opacity: 0.25, zIndex: 10 };
}

// ── MOCKUP GALLERY ─────────────────────────────────────────────────────────────

function MockupGallery({ mockups }: { mockups: { src: string; label: string }[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (mockups.length === 0) return null;

  const active = mockups[activeIdx];

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {/* Main preview */}
        <div
          className="relative rounded-xl overflow-hidden border border-white/10 cursor-zoom-in group/main bg-black/40"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={active.src}
            alt={active.label}
            className="w-full object-cover transition-transform duration-500 group-hover/main:scale-105"
            style={{ maxHeight: 200 }}
          />
          {/* overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover/main:bg-black/30 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover/main:opacity-100 transition-opacity flex items-center gap-1.5 text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
              🔍 Perbesar
            </div>
          </div>
          {/* label */}
          <div className="absolute bottom-2 left-2 text-[10px] text-white/70 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
            {active.label}
          </div>
          {/* count badge */}
          {mockups.length > 1 && (
            <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-white/70 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
              <Images size={10} />
              {activeIdx + 1}/{mockups.length}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {mockups.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {mockups.map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === activeIdx
                    ? "border-primary/80 scale-105 shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                    : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30"
                }`}
                style={{ width: 60, height: 40 }}
              >
                <img src={m.src} alt={m.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <ImageLightbox
        src={active.src}
        alt={active.label}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

// ── EXPERIENCE CARD ────────────────────────────────────────────────────────────

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const hasMockups = exp.mockups.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute -left-[41px] md:-left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary z-10" />

      <div
        className={`p-6 rounded-2xl border ${exp.borderColor} bg-gradient-to-br ${exp.color} backdrop-blur-sm relative overflow-hidden group`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-background/50 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />

        {/* Two-column layout when mockups exist */}
        <div className={hasMockups ? "grid lg:grid-cols-[1fr_260px] gap-6" : ""}>
          {/* ── Left: text content ── */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <exp.icon className="w-5 h-5" />
                  <h4 className="text-xl font-bold text-foreground">{exp.title}</h4>
                </div>
                <div className="text-lg font-medium text-muted-foreground">{exp.organization}</div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border w-fit shrink-0">
                <Calendar className="w-4 h-4" />
                {exp.date}
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

            <ul className="space-y-2 mb-6 flex-1">
              {exp.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            {/* Footer: tags + link */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-background/50 hover:bg-background/80">
                    {tag}
                  </Badge>
                ))}
              </div>
              {"link" in exp && exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* ── Right: mockup gallery ── */}
          {hasMockups && (
            <div className="flex flex-col justify-start">
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Images size={11} /> Screenshots
              </div>
              <MockupGallery mockups={exp.mockups} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── COMBINED COMPONENT ─────────────────────────────────────────────────────────

export function ProjectExperience() {
  const [current, setCurrent] = useState(0);
  const total = projects.length;
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  return (
    
      <section id="projects" className="py-24 bg-black border-y border-border relative">
        
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 70%), " +
            "linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Projects carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Project &amp; <span className="text-primary">Experience</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm">
            A selection of real-world projects and hands-on experience — from church platforms to indie games to e-commerce systems.
          </p>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-10">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-8 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

        {/* Carousel */}
        <div className="relative mx-auto flex items-center justify-center" style={{ height: 540, perspective: 1400 }}>
          <div className="relative w-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {projects.map((project, i) => {
              const offset = ((i - current + total) % total + total) % total;
              const normalizedOffset = offset > total / 2 ? offset - total : offset;
              if (Math.abs(normalizedOffset) > 2) return null;
              const style = getCardStyle(normalizedOffset);
              return (
                <motion.div
                  key={project.id}
                  animate={{ x: style.x, scale: style.scale, rotateY: style.rotateY, opacity: style.opacity, zIndex: style.zIndex }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="absolute"
                  style={{ width: 320, transformStyle: "preserve-3d", transformOrigin: "center center", cursor: normalizedOffset !== 0 ? "pointer" : "default" }}
                  onClick={() => normalizedOffset !== 0 && setCurrent(i)}
                >
                  <div
                    className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                      normalizedOffset === 0 ? "border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.25)]" : "border-border/50"
                    }`}
                    style={{ background: "linear-gradient(135deg, rgba(20,20,35,0.95) 0%, rgba(15,15,28,0.98) 100%)" }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <ProjectVisual visual={project.visual} />
                      {normalizedOffset === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] via-transparent to-transparent" />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold tracking-wider text-foreground mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag) => (
                          <span key={tag} className={`text-xs font-mono px-2.5 py-0.5 rounded-full border bg-gradient-to-r ${project.tagColor}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        onClick={(e) => { e.stopPropagation(); if (project.link) window.open(project.link, "_blank"); }}
                        className="w-full rounded-full font-semibold tracking-wider text-sm"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
                        variant="default"
                      >
                        {project.link ? (<><ExternalLink size={14} className="mr-2" />EXPLORE</>) : "EXPLORE"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex justify-center gap-4 mt-8 mb-24">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-border/60 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-border/60 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ── Experience divider ── */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-border/50" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-primary text-sm font-mono uppercase tracking-widest mb-1">Timeline</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Work Experience</h3>
          </motion.div>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* ── Experience timeline ── */}
        <div className="max-w-5xl mx-auto">
          <div className="relative border-l border-border/50 ml-4 md:ml-0 md:pl-8 space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
