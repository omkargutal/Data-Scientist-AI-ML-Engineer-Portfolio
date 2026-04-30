"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Download, Terminal, Database, BrainCircuit, LineChart, Code2, Layers, 
  Cpu, Mail, ExternalLink, Activity, Network, Calendar, MapPin, CheckCircle2, 
  ChevronRight, Briefcase, GraduationCap, Phone, Settings
} from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/Icons";


interface ProjectData {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  repoUrl: string;
  liveUrl: string;
  impact: string[];
  icon: string;
}

interface JourneyData {
  _id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

interface EducationData {
  _id: string;
  degree: string;
  institution: string;
  duration: string;
  details: string;
}

interface InsightData {
  _id: string;
  title: string;
  date: string;
  tag: string;
  url: string;
}

export default function Home() {
  const [data, setData] = useState({
    projects: [] as ProjectData[],
    journey: [] as JourneyData[],
    education: [] as EducationData[],
    insights: [] as InsightData[]
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Projects");

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const filteredProjects = activeCategory === "All Projects" 
    ? data.projects 
    : data.projects.filter(p => p.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'LineChart': return <LineChart className="w-32 h-32 text-blue-500" />;
      case 'Network': return <Network className="w-32 h-32 text-emerald-500" />;
      case 'BrainCircuit': return <BrainCircuit className="w-32 h-32 text-purple-500" />;
      case 'Activity': return <Activity className="w-32 h-32 text-orange-500" />;
      default: return <Code2 className="w-32 h-32 text-slate-500" />;
    }
  };

  const categories = ["All Projects", "Machine Learning", "Deep Learning", "NLP & GenAI"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50 py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-blue-500/20 tracking-tighter">OG</div>
          <div className="font-bold text-lg tracking-tight hidden sm:block">
            <span className="text-white">Omkar Gutal</span> <span className="text-slate-500 font-normal mx-2">|</span> <span className="text-slate-400 font-medium text-sm">Data Scientist & AI/ML Engineer</span>
          </div>
          <div className="font-bold text-lg tracking-tight sm:hidden text-white">Omkar Gutal</div>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#journey" className="hover:text-white transition">Journey</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <a href="#contact" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-medium transition flex items-center gap-2">
          Let&apos;s Talk <ArrowRight className="w-4 h-4" />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Open to New Opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Data Scientist <span className="text-slate-500">&</span> <br />
          <span className="text-gradient">AI/ML Engineer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          I build end-to-end machine learning solutions for forecasting, NLP, and predictive analytics. Transforming complex data into scalable, deployed AI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#projects" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
            View Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a href="/Resume_Omkar_Gutal.pdf" target="_blank" className="px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium transition flex items-center justify-center gap-2 border border-slate-700">
            Download Resume <Download className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Impact Snapshot */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {[
            { value: "1.5", label: "Years in Data Science & AI" },
            { value: "28+", label: "Production-Level Projects" },
            { value: "+20%", label: "Performance Boost in Models" },
            { value: "3", label: "ML Solutions Deployed" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`text-center ${i % 2 !== 0 ? 'border-l border-white/5' : ''} md:border-none`}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section: What I Do */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">My core competencies and areas of expertise in the data science and machine learning ecosystem.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { 
              title: "Machine Learning Expert", 
              icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
              desc: "Deep expertise in building predictive models using Random Forests, Neural Networks, and advanced ML algorithms" 
            },
            { 
              title: "Time Series Forecasting", 
              icon: <LineChart className="w-6 h-6 text-blue-400" />,
              desc: "Specialized in anomaly detection and predictive analytics for real-world business problems" 
            },
            { 
              title: "End-to-End Solutions", 
              icon: <Layers className="w-6 h-6 text-emerald-400" />,
              desc: "From data preprocessing to deployment, creating production-ready ML pipelines with CI/CD" 
            },
            { 
              title: "Data Engineering", 
              icon: <Database className="w-6 h-6 text-orange-400" />,
              desc: "Proficient in data wrangling, feature engineering, and building scalable data workflows" 
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 border border-white/5 hover:border-blue-500/30 transition-colors flex gap-4"
            >
              <div className="mt-1">{item.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professional Journey */}
      <section id="journey" className="py-24 bg-slate-900/50 border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Journey</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              My career path and experiences. View my full profile on <a href="https://www.linkedin.com/in/omkar-gutal-a25935249/" target="_blank" className="text-blue-400 hover:underline">LinkedIn</a>.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-slate-400">Loading journey details...</div>
          ) : (
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {data.journey.map((item) => (
                <div key={item._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 group-hover:bg-blue-600 group-hover:border-blue-500 text-slate-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 z-10">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 glass-card border-white/5 rounded-2xl group-hover:border-blue-500/30 transition-colors">
                    <div className="flex flex-col mb-4">
                      <h3 className="font-bold text-xl text-white">{item.role}</h3>
                      <div className="text-blue-400 font-medium">{item.company}</div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      {item.description.map((desc, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-blue-500 mt-1">▹</span> 
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">Featured Projects</h2>
            <p className="text-slate-400 max-w-2xl text-center md:text-left">Real-world applications showcasing end-to-end machine learning pipelines.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading projects...</div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project._id}
                  className="glass-card overflow-hidden group flex flex-col h-full"
                >
                  <div className="h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/40 z-10"></div>
                    <div className="relative z-20 opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-500">
                      {getIcon(project.icon)}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2 py-1 bg-white/10 text-slate-300 rounded text-[10px] uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="bg-white/5 rounded-lg p-4 mb-6 mt-auto">
                      <div className="text-xs text-slate-500 mb-2 font-semibold tracking-wider">IMPACT</div>
                      {project.impact.map((imp, idx) => (
                        <div key={idx} className="font-mono text-sm text-green-400 flex items-start gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium transition flex items-center gap-2">
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <a href={project.repoUrl} target="_blank" className={`px-4 py-2 ${project.liveUrl ? 'bg-white/10 hover:bg-white/20' : 'bg-blue-600 hover:bg-blue-500'} rounded text-sm font-medium transition flex items-center gap-2`}>
                        <Github className="w-4 h-4" /> View Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Technical Arsenal (Replaces Model Evaluation) */}
      <section className="py-24 bg-slate-900/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 p-64 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 p-64 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Full-stack data science expertise with production-grade ML implementation skills.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white"><Terminal className="w-5 h-5 text-blue-400" /> Languages & DB</h3>
              <div className="space-y-4">
                {[
                  { name: 'Python', val: '95%' },
                  { name: 'SQL', val: '90%' },
                  { name: 'R', val: '75%' },
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-blue-400">{skill.val}</span></div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{width: skill.val}}></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2 */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white"><BrainCircuit className="w-5 h-5 text-purple-400" /> Machine Learning</h3>
              <div className="space-y-4">
                {[
                  { name: 'Scikit-learn', val: '95%' },
                  { name: 'Random Forests', val: '92%' },
                  { name: 'TensorFlow', val: '88%' },
                  { name: 'Neural Networks', val: '87%' },
                  { name: 'PyTorch', val: '85%' },
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-purple-400">{skill.val}</span></div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500" style={{width: skill.val}}></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3 */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white"><Database className="w-5 h-5 text-emerald-400" /> Data Science</h3>
              <div className="space-y-4">
                {[
                  { name: 'Pandas', val: '95%' },
                  { name: 'NumPy', val: '93%' },
                  { name: 'Feature Engineering', val: '90%' },
                  { name: 'Statistical Analysis', val: '88%' },
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-emerald-400">{skill.val}</span></div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width: skill.val}}></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 4 */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white"><Network className="w-5 h-5 text-pink-400" /> GenAI & NLP</h3>
              <div className="space-y-4">
                {[
                  { name: 'Transformers', val: '85%' },
                  { name: 'Vector Databases', val: '83%' },
                  { name: 'LangChain', val: '82%' },
                  { name: 'RAG Pipelines', val: '80%' },
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-pink-400">{skill.val}</span></div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-pink-500" style={{width: skill.val}}></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 5 */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white"><Cpu className="w-5 h-5 text-orange-400" /> DevOps & Cloud</h3>
              <div className="space-y-4">
                {[
                  { name: 'FastAPI', val: '88%' },
                  { name: 'Docker', val: '85%' },
                  { name: 'MLflow', val: '82%' },
                  { name: 'Azure ML', val: '80%' },
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-orange-400">{skill.val}</span></div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-orange-500" style={{width: skill.val}}></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 6 */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white"><LineChart className="w-5 h-5 text-teal-400" /> Visualization</h3>
              <div className="space-y-4">
                {[
                  { name: 'Matplotlib', val: '90%' },
                  { name: 'Power BI', val: '87%' },
                  { name: 'Streamlit', val: '85%' },
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-teal-400">{skill.val}</span></div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-teal-500" style={{width: skill.val}}></div></div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Education & Credentials (Replaces MLOps) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Credentials</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Continuous learning and professional development in data science and AI.</p>
          </div>

          {loading ? (
            <div className="text-center text-slate-400">Loading education details...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {data.education.map((edu) => (
                <div key={edu._id} className="glass-card p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <div className="text-blue-400 font-medium mb-2">{edu.institution}</div>
                  {edu.duration && <div className="text-sm text-slate-500 mb-4">{edu.duration}</div>}
                  <p className="text-slate-400 text-sm">{edu.details}</p>
                </div>
              ))}
            </div>
          )}
      </section>

      {/* Blog & Insights */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Insights & Writings</h2>
            <p className="text-slate-400 max-w-2xl">I occasionally write about ML engineering, data storytelling, and optimizing pipelines.</p>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center text-slate-400">Loading insights...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {data.insights.map((post) => (
              <a href={post.url} target="_blank" key={post._id} className="glass-card p-6 group hover:-translate-y-1 transition-transform block">
                <div className="text-xs font-semibold px-2 py-1 bg-white/5 text-slate-300 rounded inline-block mb-4 uppercase tracking-wider">{post.tag}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                <div className="flex justify-between items-center text-sm text-slate-500 mt-4 pt-4 border-t border-white/10">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">Read <ChevronRight className="w-4 h-4" /></span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Let's Build Something Amazing (Replaces Try It Yourself & Footer) */}
      <section id="contact" className="py-24 border-t border-white/10 relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-blue-900/10 blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Let&apos;s Build Something <span className="text-gradient">Amazing</span></h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Open to collaboration, freelance opportunities, and data science projects. 
              Currently open to opportunities as a Data Scientist or AI/ML Engineer.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {['Machine Learning', 'Deep Learning', 'NLP', 'MLOps', 'Data Analytics'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Email</h4>
                  <p className="text-slate-400 text-sm mb-1">Best for detailed discussions</p>
                  <a href="mailto:gutalomkar01@gmail.com" className="text-blue-400 hover:underline">gutalomkar01@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">LinkedIn</h4>
                  <p className="text-slate-400 text-sm mb-1">Professional networking</p>
                  <a href="https://www.linkedin.com/in/omkar-gutal-a25935249/" target="_blank" className="text-blue-400 hover:underline">Connect with me</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Github className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">GitHub</h4>
                  <p className="text-slate-400 text-sm mb-1">Check out my repositories</p>
                  <a href="https://github.com/omkargutal" target="_blank" className="text-blue-400 hover:underline">View my code</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Phone</h4>
                  <p className="text-slate-400 text-sm mb-1">Quick conversations</p>
                  <a href="tel:+919373831167" className="text-blue-400 hover:underline">+91-9373831167</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Subject</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Project Opportunity" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="How can I help you?"></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold transition-colors flex items-center justify-center gap-2">
                Send Message <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-500 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Pune, Maharashtra, India</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Open to Opportunities</div>
            </div>
          </div>

        </div>

        <div className="text-slate-500 text-sm text-center mt-24 pb-8 flex flex-col items-center gap-4">
          <div>&copy; {new Date().getFullYear()} Omkar Gutal. All rights reserved.</div>
          <a href="/admin" className="px-4 py-2 rounded-full bg-slate-900 border border-white/10 text-xs font-medium hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2">
            <Settings className="w-3.5 h-3.5" /> Admin Studio Login
          </a>
        </div>
      </section>
    </div>
  );
}
