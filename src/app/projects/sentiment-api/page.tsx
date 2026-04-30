import Link from "next/link";
import { ArrowLeft, ExternalLink, Network } from "lucide-react";
import { GithubIcon as Github } from "@/components/Icons";

export default function SentimentApiCaseStudy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-24 pb-20 px-6 md:px-12 selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        
        <div className="flex gap-2 mb-4">
          <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded uppercase tracking-wider">NLP</span>
          <span className="text-xs font-semibold px-2 py-1 bg-teal-500/20 text-teal-300 rounded uppercase tracking-wider">FastAPI</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Real-time Sentiment Analysis API</h1>
        
        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
          Understanding customer feedback at scale requires automated classification. I built and deployed a fine-tuned NLP model capable of parsing unstructured text and classifying sentiment in real-time, built for high-throughput production environments.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-emerald-500/25">
            <Github className="w-4 h-4" /> View Source Code
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition flex items-center gap-2 border border-white/10">
            <ExternalLink className="w-4 h-4" /> Try Live Demo
          </button>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl leading-relaxed text-slate-300">
              The client needed to process thousands of reviews daily. Previous implementations using basic lexicon-based approaches (like VADER) struggled with sarcasm and complex contextual phrasing. A machine learning approach was necessary, but it needed to be fast enough to not block the data ingestion pipeline.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Architecture</h2>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center">
               <div className="text-center">
                 <Network className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                 <p className="text-sm text-slate-400">Request → Nginx → Gunicorn/Uvicorn → FastAPI → ONNX Runtime → RoBERTa</p>
               </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Optimization for Inference</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
              <li>Started with a HuggingFace RoBERTa model fine-tuned on a custom dataset of 50k reviews.</li>
              <li>Exported the trained PyTorch model to <strong>ONNX</strong> format, reducing inference latency by 40%.</li>
              <li>Quantized the model weights to FP16, allowing deployment on cost-effective CPU instances.</li>
              <li>Achieved a sustained throughput of 500+ requests per second with &lt; 50ms latency.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                 <h3 className="font-bold text-emerald-400 mb-2">Accuracy</h3>
                 <p className="text-sm text-slate-300">Improved F1-score from 74% (Lexicon) to 92% (RoBERTa).</p>
               </div>
               <div className="p-6 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                 <h3 className="font-bold text-teal-400 mb-2">Cost Savings</h3>
                 <p className="text-sm text-slate-300">Reduced monthly cloud computing costs by 60% through ONNX optimizations.</p>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
