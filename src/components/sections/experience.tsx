import { motion } from "framer-motion";
import { ExternalLink, Calendar, Code, Gamepad2, ShoppingCart, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "Web Developer",
    organization: "Website Gereja RPBI Sion Karawang",
    date: "Nov 2024 – Jan 2025",
    description: "Developed a comprehensive church information system utilizing MVC architecture and OOP principles.",
    achievements: [
      "Built features for worship schedules, events, gallery, and registration",
      "Implemented FAQ and contact management systems",
      "Collaborated efficiently in a team environment using Laravel"
    ],
    tags: ["Laravel", "PHP", "MVC", "OOP", "MySQL"],
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    id: 2,
    title: "Game Developer",
    organization: "\"Whisper Of The Forest\" Academic Project",
    date: "Sep 2025 – Dec 2025",
    description: "Developed a fully functional indie game as an academic project at UMN, focusing on mechanics, AI, and storytelling.",
    achievements: [
      "Designed and implemented gameplay mechanics, AI systems, and interactive menus",
      "Structured chapters and overarching storyline",
      "Conducted thorough testing & debugging before publishing"
    ],
    tags: ["C#", "Unity", "Game Design", "AI Systems"],
    link: "https://youtu.be/6PbXFbymnG8?si=4U9IBkwdnLpmy6KH",
    icon: Gamepad2,
    color: "from-purple-500/20 to-pink-500/20",
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
      "Implemented secure authentication and Role-Based Access Control (RBAC)"
    ],
    tags: ["PHP", "MySQL", "Chatbot", "RBAC", "E-Commerce"],
    icon: ShoppingCart,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    id: 4,
    title: "Mobile App Developer",
    organization: "Academic Project | Toko Juara Kelas E-Commerce App",
    date: "2026",
    description: "Developed a mobile e-commerce application for school and store product ordering using React Native Expo, TypeScript, and Supabase.",
    achievements: [
      "Implemented user authentication, persistent login sessions, product browsing, wishlist, cart, checkout, and order history features",
      "Integrated Supabase for authentication, database management, storage, and order data processing",
      "Built QRIS-based payment flow with payment proof upload and admin payment verification",
      "Developed an admin dashboard to manage products, categories, users, orders, payment verification, and customer chat",
      "Implemented pickup and delivery flows with address form, distance-based shipping fee calculation, and customer order completion",
      "Added NFC inventory management using NFC scanning to read card UID and manage item stock data",
      "Designed responsive UI components including bottom navigation, order monitoring, and admin sidebar navigation",
      "Improved reliability by handling authentication flow, order status updates, image upload, and database security policies"
    ],
    tags: ["React Native Expo", "TypeScript", "Supabase", "QRIS", "NFC"],
    icon: Smartphone,
    color: "from-emerald-500/20 to-cyan-500/20",
    borderColor: "border-emerald-500/30"
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience & Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l border-border/50 ml-4 md:ml-0 md:pl-8 space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary z-10" />
                
                <div className={`p-6 rounded-2xl border ${project.borderColor} bg-gradient-to-br ${project.color} backdrop-blur-sm bg-opacity-10 card-hover-effect relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-background/50 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-primary mb-1">
                        <project.icon className="w-5 h-5" />
                        <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                      </div>
                      <div className="text-lg font-medium text-muted-foreground">{project.organization}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border w-fit">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-background/50 hover:bg-background/80">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Project <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
