import { motion } from "framer-motion";
import { 
  SiPhp, SiLaravel, SiPython, SiMysql, SiHtml5,
  SiCanva, SiCss, SiTypescript, SiSupabase, SiExpo, SiUnity, SiReact
} from "react-icons/si";
import { Brain, Users, MessageSquare, Clock, Lightbulb, RefreshCw, PenTool, BarChart, Code2, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const hardSkills = [
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Expo", icon: SiExpo, color: "#ffffff" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Unity", icon: SiUnity, color: "#ffffff" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: Coffee, color: "#007396" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "Data Analysis", icon: BarChart, color: "#00C4B6" },
  { name: "Graphic Editing", icon: SiCanva, color: "#00C4CC" },
  { name: "OOP", icon: Code2, color: "#A8B9CC" },
];

const softSkills = [
  { name: "Problem-Solving", icon: Brain },
  { name: "Analytical Thinking", icon: Lightbulb },
  { name: "Teamwork", icon: Users },
  { name: "Communication", icon: MessageSquare },
  { name: "Time Management", icon: Clock },
  { name: "Creativity", icon: PenTool },
  { name: "Adaptability", icon: RefreshCw },
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
  id="skills"
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Technical Arsenal</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
            A balanced stack of programming languages, frameworks, and interpersonal skills cultivated through academic and professional projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Hard Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center lg:justify-start gap-2 border-b border-border pb-4 text-center lg:text-left">
              <Code2 className="text-primary" /> Hard Skills
            </h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {hardSkills.map((skill) => (
                <motion.div key={skill.name} variants={itemVariants}>
                  <Card className="cursor-target group hover:border-primary/50 transition-colors duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-3 h-28 relative">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <skill.icon className="w-8 h-8 transition-transform group-hover:scale-110" style={{ color: skill.color }} />
                      <span className="font-medium text-sm text-center">{skill.name}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center lg:justify-start gap-2 border-b border-border pb-4 text-center lg:text-left">
              <Brain className="text-primary" /> Soft Skills
            </h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {softSkills.map((skill) => (
                <motion.div key={skill.name} variants={itemVariants}>
                  <div className="cursor-target flex items-center justify-center sm:justify-start gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <skill.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-background relative overflow-hidden text-center lg:text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <h4 className="font-semibold mb-2">Interests</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                UI/UX Design & Web Development • Software Engineering & Data Analysis • AI & Machine Learning
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
