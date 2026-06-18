import { motion } from "framer-motion";
import { MapPin, GraduationCap, Sparkles } from "lucide-react";
import { IdCardViewer } from "@/components/three/id-card-viewer";

export function About() {
  return (
   <section
  id="skills"
  className="py-24 bg-black border-y border-white/5 relative"
>
      {/* Lanyard full section — no clip, transparent canvas overlays whole area */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <IdCardViewer />
      </div>

      {/* Content left side */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">About Me</h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-5"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium">
              <Sparkles className="w-5 h-5" />
              <span>Informatics Student</span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I am an Informatics student at Universitas Multimedia Nusantara (6th semester),
              deeply passionate about web and software development. I thrive on solving complex
              problems and turning ideas into robust, user-centric applications.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Currently seeking an{" "}
              <strong className="text-foreground">internship opportunity</strong> to apply my
              skills in real-world scenarios, contribute to innovative projects, and continue
              growing as a software engineer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">Tangerang Kota, Banten</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Education</div>
                  <div className="font-medium">Universitas Multimedia Nusantara</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}