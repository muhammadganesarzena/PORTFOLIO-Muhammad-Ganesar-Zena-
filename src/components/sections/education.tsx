import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, BookOpen, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

const certs = [
  {
    title: "Introduction to Python",
    issuer: "SoloLearn",
    icon: BookOpen,
    image: null,
    pdf: "/certificates/python-intro.pdf",
  },
  {
    title: "Python Intermediate",
    issuer: "SoloLearn",
    icon: BookOpen,
    image: null,
    pdf: "/certificates/python-intermediate.pdf",
  },
  {
    title: "HCIA-AI V3.5",
    issuer: "Huawei Certified ICT Associate",
    icon: Award,
    image: "/certificates/hcia-ai.png",
    pdf: null,
  },
  {
    title: "HCIA-openGauss V1.0",
    issuer: "Huawei Certified ICT Associate",
    icon: Award,
    image: "/certificates/hcia-opengauss.png",
    pdf: null,
  },
];

function CertCard({ cert, index }: { cert: typeof certs[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card className="cursor-target group hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
              <cert.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{cert.title}</h4>
              <div className="text-sm text-muted-foreground">{cert.issuer}</div>
            </div>
            <div className="text-xs text-primary/60 self-center opacity-0 group-hover:opacity-100 transition-opacity">
              Hover to preview
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              {cert.image ? (
                <div
                  className="relative group/thumb cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    className="w-full object-contain max-h-72"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1.5 text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                      🔍 Klik untuk perbesar
                    </div>
                  </div>
                </div>
              ) : cert.pdf ? (
                <div className="p-6 flex flex-col items-center gap-3 bg-gradient-to-br from-background to-muted/50">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">COURSE CERTIFICATE</div>
                    <div className="text-sm text-muted-foreground mt-1">Muhammad Ganesar Zena</div>
                    <div className="text-base font-medium text-primary mt-2">{cert.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{cert.issuer}</div>
                  </div>
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    View PDF →
                  </a>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {cert.image && (
        <ImageLightbox
          src={cert.image}
          alt={`${cert.title} – ${cert.issuer}`}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

export function Education() {
  return (
    
      <section id="education" className="py-24 bg-black border-y border-border relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Education & Certifications</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
              <GraduationCap className="text-primary" /> Academic Background
            </h3>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="cursor-target overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-foreground">Universitas Multimedia Nusantara</h4>
                      <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary">2023 – Present</span>
                    </div>
                    <div className="text-lg font-medium text-muted-foreground mb-4">Informatics • 6th Semester</div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted border border-border">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">GPA: 3.40 / 4.00</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="cursor-target bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-foreground">SMA YADIKA 5 Joglo</h4>
                      <span className="text-sm font-medium px-2 py-1 rounded bg-muted text-muted-foreground">2020 – 2023</span>
                    </div>
                    <div className="text-muted-foreground">Jakarta Barat</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
              <Award className="text-primary" /> Certifications
            </h3>
            <div className="space-y-4">
              {certs.map((cert, index) => (
                <CertCard key={index} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
