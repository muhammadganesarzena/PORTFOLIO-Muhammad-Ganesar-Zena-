import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shield, Tent, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

const organizations = [
  {
    name: "Starlight 2025",
    institution: "UMN",
    role: "Ensurer / Security Division Member",
    period: "2025",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    image: "/organizations/starlight.png",
    instagram: "https://www.instagram.com/starlightumn?igsh=MTEweTd1ZDB6N3l6ZQ==",
  },
  {
    name: "Serah Tahunan UKM",
    institution: "UMN",
    role: "Accommodation Division Member",
    period: "2024–2025",
    icon: Tent,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    image: "/organizations/stukm.png",
    instagram: "https://www.instagram.com/serahtahunanumn?igsh=Z2F3eWlpN2tmZnU=",
  },
];

function OrgCard({ org, index }: { org: typeof organizations[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        key={org.name}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card className="cursor-target h-full overflow-visible hover:border-primary/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${org.bgColor} ${org.color}`}>
                <org.icon className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                {org.period}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{org.name}</h3>
            <div className="text-primary font-medium mb-3">{org.institution}</div>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>{org.role}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 border-pink-500/40 text-pink-500 hover:bg-pink-500/10 hover:text-pink-400"
              asChild
            >
              <a href={org.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </Button>
          </CardContent>
        </Card>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              <div
                className="relative group/thumb cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={org.image}
                  alt={`${org.name} photo`}
                  className="w-full object-cover max-h-56"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1.5 text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                    🔍 Klik untuk perbesar
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 text-xs text-muted-foreground text-center border-t border-border">
                {org.name} · {org.institution}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ImageLightbox
        src={org.image}
        alt={`${org.name} – ${org.institution}`}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

export function Organizations() {
  return (
    <section
  id="organizations"
  className="py-24 bg-black border-y border-white/5 relative"
>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Organizations & Leadership</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {organizations.map((org, index) => (
            <OrgCard key={org.name} org={org} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
