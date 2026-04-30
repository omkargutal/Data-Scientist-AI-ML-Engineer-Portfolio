import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/Icons";

export default function StockForecastingCaseStudy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-24 pb-20 px-6 md:px-12 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        
        <div className="flex gap-2 mb-4">
          <span className="text-xs font-semibold px-2 py-1 bg-blue-500/20 text-blue-300 rounded uppercase tracking-wider">Time Series</span>
          <span className="text-xs font-semibold px-2 py-1 bg-purple-500/20 text-purple-300 rounded uppercase tracking-wider">Deep Learning</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Algorithmic Stock Forecasting Pipeline</h1>
        
        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
          Predicting stock market trends is notoriously difficult. This project focuses on building an end-to-end pipeline to ingest historical Apple (AAPL) stock data, engineer features, and compare multiple models to predict future price trajectories up to 90 days out.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-blue-500/25">
            <Github className="w-4 h-4" /> View Source Code
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition flex items-center gap-2 border border-white/10">
            <ExternalLink className="w-4 h-4" /> Try Live Demo
          </button>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
               Business Problem
            </h2>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl leading-relaxed text-slate-300">
              Investors need reliable indications of stock trajectories to balance their portfolios. The objective was to create a robust model that outperforms naive forecasting (predicting the previous day&apos;s price) over medium-term horizons (30, 45, and 90 days) while minimizing Root Mean Square Error (RMSE).
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Engineering & EDA</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
              <li>Ingested 10+ years of daily OHLCV data using yfinance.</li>
              <li>Engineered 15+ technical indicators (RSI, MACD, Bollinger Bands) using pandas.</li>
              <li>Handled missing values and standardized feature scaling using Scikit-Learn&apos;s MinMaxScaler.</li>
              <li>Identified structural breaks and volatility clusters during EDA.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Model Architecture & Trade-offs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="font-bold text-blue-400 mb-2">XGBoost</h3>
                <p className="text-sm text-slate-400 mb-4">Used for its interpretability and rapid training times. Performed excellent on short-term horizons but struggled with long-term autoregressive dependencies without complex feature engineering.</p>
                <div className="font-mono text-xs text-slate-500">RMSE: 2.10 | Train Time: &lt; 2s</div>
              </div>
              <div className="p-6 bg-slate-900 border border-blue-500/30 rounded-xl">
                <h3 className="font-bold text-purple-400 mb-2">LSTM (Selected)</h3>
                <p className="text-sm text-slate-400 mb-4">Captured temporal dependencies utilizing a 60-day lookback window. Designed with Dropout layers to prevent overfitting. It provided the most stable 90-day trajectory.</p>
                <div className="font-mono text-xs text-slate-500">RMSE: 1.82 | Train Time: ~45s</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Key Learnings</h2>
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl leading-relaxed text-slate-300">
              The biggest lesson was that complex models (LSTM) don&apos;t always win automatically. Data quality and proper windowing were more critical than architectural depth. I also learned how to deploy the trained model inside a FastAPI backend, enabling real-time inference via a React dashboard.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
