import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Instagram, MapPin, GraduationCap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IdCardViewer } from "@/components/three/id-card-viewer";
import FloatingLines from "@/components/ui/FloatingLines";
import { FaLaravel, FaGamepad, FaShoppingCart, FaMobileAlt, FaBrain } from "react-icons/fa";

const services = [
  {
    icon: <FaLaravel className="w-6 h-6" />,
    title: "Web Development",
    desc: "Full-stack web apps with Laravel & React",
  },
  {
    icon: <FaGamepad className="w-6 h-6" />,
    title: "Game Development",
    desc: "2D/3D games with Unity & C#",
  },
  {
    icon: <FaMobileAlt className="w-6 h-6" />,
    title: "APK Development",
    desc: "Mobile apps with React Native & Expo",
  },
  {
    icon: <FaBrain className="w-6 h-6" />,
    title: "Machine Learning",
    desc: "Prediksi & analisis data dengan Python",
  },
  {
    icon: <FaShoppingCart className="w-6 h-6" />,
    title: "Freelance Projects",
    desc: "Custom platforms, chatbots & e-commerce",
  },
];

export function HeroAbout() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };
  const scrollToWork = () => {
    const el = document.querySelector("#projects");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
   <section
  id="hero"
  className="py-24 bg-black border-y border-white/5 relative"
>
      {/* ── HERO HALF ─────────────────────────────────────────────────── */}
      <div className="relative min-h-[100dvh] flex items-center pt-24 pb-10">
        {/* FloatingLines background — z-5, behind everything */}
        <div className="absolute inset-0 w-full z-5 pointer-events-none hidden md:block">
         <FloatingLines
  linesGradient={[
    "#000000",
    "#000000",
    "000000",
    "#d1d5db",
    "#000000",
    "#000000",
    "#6b7280",
    "#000000",
  ]}
  enabledWaves={["top", "middle", "bottom"]}
  lineCount={9}
  lineDistance={62}
  bendRadius={21}
  bendStrength={12.5}
  interactive
  parallax
  animationSpeed={4.7}
  mixBlendMode="screen"
/>
        </div>

        {/* 3D ID Card — z-15, in front of FloatingLines, behind text */}
        <div className="absolute inset-0 w-full hidden md:block z-[15]">
          <IdCardViewer />
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-20 pointer-events-none">
          {/* LEFT — text only (card is now absolute on the right) */}
          <div className="md:w-1/2 flex flex-col gap-5 pointer-events-auto">
            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-muted/50 border border-border text-sm font-medium text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for Internship
            </motion.div>

            {/* Hello. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                Hello<span className="text-primary">.</span>
              </span>
              <div className="flex items-center gap-3 mt-1">
                <div className="h-[2px] w-8 bg-primary rounded-full" />
                <span className="text-xl md:text-2xl text-muted-foreground font-medium">I'm Muhammad Ganesar Zena</span>
              </div>
            </motion.div>

            {/* title */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
            >
              Informatics Student<br />
              <span className="text-gradient">&amp; Full Stack Developer</span>
            </motion.h1>

            {/* desc */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              I build precise, modern, and high-performance applications. Passionate about transforming ideas into elegant digital experiences.
            </motion.p>

            {/* buttons */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
            >
              <Button size="lg" className="cursor-target rounded-full h-12 px-7 text-base" onClick={scrollToWork}>
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="cursor-target rounded-full h-12 px-7 text-base bg-background" onClick={scrollToContact}>
                Contact Me
              </Button>
            </motion.div>

            {/* social icons */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { href: "https://id.linkedin.com/in/muhammadganesarzena", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { href: "https://www.instagram.com/ganesarzena_?igsh=MWI5MXJoemFwbjJvMA%3D%3D&utm_source=qr", icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { href: "https://github.com/muhammadganesarzena", icon: <Github className="h-5 w-5" />, label: "GitHub" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary hover:scale-110"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Mobile — compact card */}
          <div className="md:hidden relative h-[300px] w-full mt-8 pointer-events-auto">
            <IdCardViewer />
          </div>

          {/* scroll hint */}
          <motion.div
            className="mt-8 hidden sm:flex flex-col items-center md:items-start gap-2 text-muted-foreground pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.28em] font-mono">Scroll</span>
            <div className="h-7 w-[1px] bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* ── ABOUT HALF ────────────────────────────────────────────────── */}
      <div id="about" className="border-t border-border/50 py-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT — services list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-0"
            >
              {services.map((svc, i) => (
                <div key={svc.title} className="flex items-start gap-5 relative">
                  {/* vertical accent line */}
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-5 shrink-0" />
                    {i < services.length - 1 && (
                      <div className="w-[2px] flex-1 min-h-[48px] bg-primary/30" />
                    )}
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-primary shrink-0">
                      {svc.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-base">{svc.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{svc.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* RIGHT — about text + stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About me</h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I am an Informatics student at Universitas Multimedia Nusantara (6th semester), deeply passionate about web and software development. I thrive on solving complex problems and turning ideas into robust, user-centric applications.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Currently seeking an <strong className="text-foreground">internship opportunity</strong> to apply my skills in real-world scenarios, contribute to innovative projects, and continue growing as a software engineer.
              </p>

              {/* info chips */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Tangerang Kota, Banten
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Universitas Multimedia Nusantara
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
