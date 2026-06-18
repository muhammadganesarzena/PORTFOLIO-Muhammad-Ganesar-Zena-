import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ganezarz@gmail.com",
      href: "mailto:ganezarz@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+62 812 2192 3364",
      href: "tel:+6281221923364",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "in/muhammadganesarzena",
      href: "https://linkedin.com/in/muhammadganesarzena",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Tangerang Kota, Banten, 15151",
      href: null,
    },
  ];

  return (
    <section
  id="contact"
  className="py-24 bg-black border-y border-white/5 relative"
>
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Let's Connect</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-xl text-lg">
            I'm currently looking for an internship opportunity. Whether you have a position available or just want to say hi, my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="cursor-target bg-background/50 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{info.title}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="font-medium text-foreground">{info.value}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
