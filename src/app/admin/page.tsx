"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Briefcase, GraduationCap, LineChart, Code2, 
  PlusCircle, Lock, ArrowRight, CheckCircle2, AlertCircle, LogOut 
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState("project");
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null, message: string }>({ type: null, message: "" });

  // Simple client-side auth for the portfolio
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "omkar2026") {
      setIsAuthenticated(true);
    } else {
      setStatus({ type: 'error', message: "Invalid passcode" });
      setTimeout(() => setStatus({ type: null, message: "" }), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: "Saving to database..." });
    
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string | string[]> = {};
    
    formData.forEach((value, key) => {
      if (key === 'tags' || key === 'impact' || key === 'description') {
        data[key] = value.toString().split(',').map(s => s.trim()).filter(s => s);
      } else {
        data[key] = value.toString();
      }
    });

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, data })
      });
      
      if (res.ok) {
        setStatus({ type: 'success', message: "Successfully added to live site!" });
        (e.target as HTMLFormElement).reset();
      } else {
        const err = await res.json();
        setStatus({ type: 'error', message: err.error || "Failed to add" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: "Could not connect to API" });
    }
    
    setTimeout(() => setStatus({ type: null, message: "" }), 4000);
  };

  const tabs = [
    { id: "project", label: "Projects", icon: <Code2 className="w-4 h-4" /> },
    { id: "journey", label: "Journey", icon: <Briefcase className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "insight", label: "Insights", icon: <LineChart className="w-4 h-4" /> }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 max-w-md w-full border border-white/10 rounded-3xl"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-center text-white mb-2">Data Studio</h1>
          <p className="text-slate-400 text-center mb-8 text-sm">Enter passcode to access your database</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-center text-white tracking-widest focus:outline-none focus:border-blue-500 transition-colors" 
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2">
              Unlock Studio <ArrowRight className="w-5 h-5" />
            </button>
            {status.type === 'error' && (
              <p className="text-red-400 text-sm text-center mt-4 animate-pulse">{status.message}</p>
            )}
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-64 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full glass z-50 py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <Database className="w-5 h-5 text-blue-400" /> Data Studio
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" /> Lock
        </button>
      </nav>

      <div className="max-w-4xl mx-auto pt-32 px-6 pb-24 relative z-10">
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" 
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.icon} Add {tab.label}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="glass-card p-8 md:p-10 border border-white/10 rounded-3xl bg-slate-900/40 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">New {activeTab} Entry</h2>
              <p className="text-slate-400 text-sm">This will be pushed live to your MongoDB immediately.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {activeTab === 'education' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Degree / Certification Title</label>
                  <input required name="degree" type="text" placeholder="e.g. OCI AI Foundations" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Institution</label>
                  <input required name="institution" type="text" placeholder="e.g. Oracle University" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Duration / Year (Optional)</label>
                  <input name="duration" type="text" placeholder="e.g. 2026" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Details</label>
                  <textarea required name="details" rows={3} placeholder="Brief description of the certification..." className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                </div>
              </div>
            )}

            {activeTab === 'project' && (
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                    <input required name="title" type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                    <select required name="category" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500">
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Deep Learning">Deep Learning</option>
                      <option value="NLP & GenAI">NLP & GenAI</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                  <textarea required name="description" rows={3} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Tags (comma separated)</label>
                  <input required name="tags" type="text" placeholder="Python, FastAPI, AWS" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Repo URL</label>
                    <input name="repoUrl" type="url" placeholder="https://github.com/..." className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Live URL</label>
                    <input name="liveUrl" type="url" placeholder="https://..." className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Impact (comma separated)</label>
                  <input name="impact" type="text" placeholder="Increased speed by 20%, Reduced errors" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Icon Name</label>
                  <input required name="icon" type="text" defaultValue="Code2" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  <p className="text-xs text-slate-500 mt-1">Options: LineChart, Network, BrainCircuit, Activity, Code2</p>
                </div>
              </div>
            )}

            {activeTab === 'journey' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Role</label>
                  <input required name="role" type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Company</label>
                    <input required name="company" type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
                    <input required name="location" type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Duration</label>
                  <input required name="duration" type="text" placeholder="Jan 2024 - Present" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Description Bullets (comma separated)</label>
                  <textarea required name="description" rows={4} placeholder="Developed X, Optimized Y, Managed Z" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
                </div>
              </div>
            )}

            {activeTab === 'insight' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Article Title</label>
                  <input required name="title" type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Publish Date</label>
                    <input required name="date" type="text" placeholder="Oct 2025" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Tag</label>
                    <input required name="tag" type="text" placeholder="Machine Learning" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">URL to Article</label>
                  <input required name="url" type="url" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button 
                type="submit" 
                disabled={status.type === 'loading'}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 rounded-xl text-white font-bold transition-colors flex items-center gap-2"
              >
                {status.type === 'loading' ? (
                  <> <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Syncing... </>
                ) : (
                  <> <Database className="w-5 h-5" /> Save to Database </>
                )}
              </button>
            </div>

            {/* Status Toast */}
            <AnimatePresence>
              {status.type && status.type !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                >
                  {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span className="font-medium">{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
            
          </form>
        </motion.div>
      </div>
    </div>
  );
}
