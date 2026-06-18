import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    id: 2,
    title: "WHISPER OF THE FOREST",
    description:
      "2D/3D indie game built in Unity with custom AI systems, gameplay mechanics, storyline, and multiple chapters. Published and playable on itch.io.",
    tags: ["C#", "UNITY", "GAME AI", "OOP"],
    tagColor:
      "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
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
    tagColor:
      "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
    gradient: "from-cyan-900/40 via-blue-900/20 to-slate-900",
    visual: "ecommerce",
    link: undefined,
  },
  {
    id: 4,
    title: "TOKO JUARA KELAS",
    description:
      "Mobile e-commerce app for school/store product ordering with authentication, wishlist, cart, checkout, QRIS payment proof upload, admin verification, delivery flows, NFC inventory, and Supabase backend.",
    tags: ["EXPO", "TYPESCRIPT", "SUPABASE", "QRIS", "NFC"],
    tagColor:
      "from-violet-500/20 to-cyan-500/20 border-violet-500/30 text-violet-200",
    gradient: "from-violet-900/40 via-cyan-900/20 to-slate-900",
    visual: "mobile",
    link: undefined,
  },
];

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
          {[0,1,2,3,4].map(i => (
            <line key={i} x1={40 + i*30} y1={20} x2={40+i*30} y2={140} stroke="#10b981" strokeWidth="0.3" opacity="0.15" />
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
  if (abs === 0) {
    return {
      x: 0,
      scale: 1,
      rotateY: 0,
      z: 100,
      opacity: 1,
      zIndex: 30,
    };
  }
  if (abs === 1) {
    const sign = offset > 0 ? 1 : -1;
    return {
      x: sign * 360,
      scale: 0.78,
      rotateY: sign * -25,
      z: -80,
      opacity: 0.7,
      zIndex: 20,
    };
  }
  const sign = offset > 0 ? 1 : -1;
  return {
    x: sign * 650,
    scale: 0.6,
    rotateY: sign * -42,
    z: -200,
    opacity: 0.25,
    zIndex: 10,
  };
}

export function Projects() {
  const [current, setCurrent] = useState(0);
  const total = projects.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  return (
   
      <section id="projects" className="py-24 bg-muted/30 border-y border-border relative">
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

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            A selection of real-world projects — from church platforms to indie games to e-commerce systems.
          </p>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-10">
          {projects.map((_, i) => (
            <button
              key={i}
              data-testid={`dot-project-${i}`}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

        {/* Carousel */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ height: 540, perspective: 1400 }}
        >
          <div className="relative w-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {projects.map((project, i) => {
              const offset = ((i - current + total) % total + total) % total;
              const normalizedOffset = offset > total / 2 ? offset - total : offset;

              if (Math.abs(normalizedOffset) > 2) return null;

              const style = getCardStyle(normalizedOffset);

              return (
                <motion.div
                  key={project.id}
                  data-testid={`card-project-${project.id}`}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    rotateY: style.rotateY,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="absolute"
                  style={{
                    width: 320,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    cursor: normalizedOffset !== 0 ? "pointer" : "default",
                  }}
                  onClick={() => normalizedOffset !== 0 && setCurrent(i)}
                >
                  <div
                    className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                      normalizedOffset === 0
                        ? "border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
                        : "border-border/50"
                    }`}
                    style={{
                      background: "linear-gradient(135deg, rgba(20,20,35,0.95) 0%, rgba(15,15,28,0.98) 100%)",
                    }}
                  >
                    {/* Project Image Area */}
                    <div className="relative h-44 overflow-hidden">
                      <ProjectVisual visual={project.visual} />
                      {normalizedOffset === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] via-transparent to-transparent" />
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold tracking-wider text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs font-mono px-2.5 py-0.5 rounded-full border bg-gradient-to-r ${project.tagColor}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <Button
                        data-testid={`btn-explore-${project.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.link) window.open(project.link, "_blank");
                        }}
                        className="w-full rounded-full font-semibold tracking-wider text-sm"
                        style={{
                          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                          boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                        }}
                        variant="default"
                      >
                        {project.link ? (
                          <>
                            <ExternalLink size={14} className="mr-2" />
                            EXPLORE
                          </>
                        ) : (
                          "EXPLORE"
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Prev / Next buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            data-testid="btn-prev-project"
            onClick={prev}
            className="w-12 h-12 rounded-full border border-border/60 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            data-testid="btn-next-project"
            onClick={next}
            className="w-12 h-12 rounded-full border border-border/60 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
