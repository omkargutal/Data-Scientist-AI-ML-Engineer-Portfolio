import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  category: String,
  repoUrl: String,
  liveUrl: String,
  impact: [String],
  icon: String,
});

const JourneySchema = new mongoose.Schema({
  role: String,
  company: String,
  location: String,
  duration: String,
  description: [String],
});

const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  duration: String,
  details: String,
});

const InsightSchema = new mongoose.Schema({
  title: String,
  date: String,
  tag: String,
  url: String,
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Journey = mongoose.models.Journey || mongoose.model('Journey', JourneySchema);
const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
const Insight = mongoose.models.Insight || mongoose.model('Insight', InsightSchema);

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Project.deleteMany({});
  await Journey.deleteMany({});
  await Education.deleteMany({});
  await Insight.deleteMany({});

  const projects = [
    {
      title: 'Algorithmic Stock Forecasting',
      description: 'Built an end-to-end pipeline predicting APPL stock prices across 90-day horizons. Compared ARIMA, XGBoost, and LSTM models.',
      tags: ['Time Series', 'Deep Learning'],
      category: 'Deep Learning',
      repoUrl: 'https://github.com/omkargutal/Apple-Stock-Forecasting-System',
      impact: ['Reduced RMSE by 18% vs Baseline', 'LSTM achieved 94.2% Directional Accuracy'],
      icon: 'LineChart',
    },
    {
      title: 'Customer Segmentation',
      description: 'Built an end-to-end customer segmentation pipeline using K-Means, Hierarchical, and DBSCAN, deployed via FastAPI.',
      tags: ['FastAPI', 'Clustering'],
      category: 'Machine Learning',
      repoUrl: 'https://github.com/omkargutal/customer-segmentation-app',
      impact: ['Optimal model via Silhouette Score', 'Defined 4 customer personas'],
      icon: 'Network',
    },
    {
      title: 'GPT Mini Studio',
      description: 'Personalized GenAI platform using Python & FastAPI. Implemented a RAG pipeline using FAISS-based vector search for context-aware generation.',
      tags: ['GenAI & RAG', 'LLMs'],
      category: 'NLP & GenAI',
      repoUrl: 'https://github.com/omkargutal/GPT-Mini-Studio',
      impact: ['Credit-based rate limiting', 'Secure RESTful APIs'],
      icon: 'BrainCircuit',
    },
    {
      title: 'DysarthriaCare (SpeechEase)',
      description: 'AI-powered speech assistance system using audio processing and ML to improve speech clarity for dysarthria patients.',
      tags: ['Audio ML', 'Healthcare'],
      category: 'Deep Learning',
      repoUrl: 'https://github.com/omkargutal/DysarthriaCare',
      impact: ['Speech feature extraction', 'Pattern recognition pipelines'],
      icon: 'Activity',
    }
  ];

  const journey = [
    {
      role: 'Data Scientist Intern',
      company: 'Ai Variant',
      location: 'Bengaluru',
      duration: 'Dec 2025 - Present',
      description: [
        'Built and optimized machine learning models for time series forecasting, anomaly detection, and predictive analytics, improving performance through feature engineering and hyperparameter tuning.',
        'Extracted, cleaned, and transformed large datasets using Python and SQL, ensuring data quality through validation.',
        'Developed end-to-end data science workflows including data preprocessing, feature engineering, model training, and evaluation.'
      ]
    },
    {
      role: 'Product Development Engineer',
      company: 'Philips',
      location: 'Pune',
      duration: 'Aug 2024 - Jul 2025',
      description: [
        'Worked on Python-based automation, managed product-related data, and created as well as maintained documentation for Philips products.',
        'Collaborated with global teams to customize the Windchill PLM tool, improving release accuracy by 20%, and handled translation validation.',
        'Served as Product Data Owner for three major product launches.'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor Of Engineering in ECE',
      institution: 'Savitribai Phule Pune University',
      duration: '2021 - 2025',
      details: 'First class with distinction - 7.62/10'
    },
    {
      degree: 'Certificate Program in Data Science & Machine Learning',
      institution: 'NASSCOM',
      duration: '',
      details: 'Comprehensive program covering core ML concepts and data workflows.'
    },
    {
      degree: 'OCI AI Foundations Associate',
      institution: 'Oracle University',
      duration: '',
      details: 'Certified in foundational AI concepts and cloud infrastructure.'
    }
  ];

  const insights = [
    {
      title: 'Why XGBoost is still king for Tabular Data',
      date: 'Oct 2025',
      tag: 'Machine Learning',
      url: 'https://linkedin.com'
    },
    {
      title: 'Deploying PyTorch models with ONNX and FastAPI',
      date: 'Aug 2025',
      tag: 'MLOps',
      url: 'https://linkedin.com'
    },
    {
      title: 'Beyond RMSE: Evaluating Models for Business Value',
      date: 'Jul 2025',
      tag: 'Data Storytelling',
      url: 'https://linkedin.com'
    }
  ];

  await Project.insertMany(projects);
  await Journey.insertMany(journey);
  await Education.insertMany(education);
  await Insight.insertMany(insights);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch(console.error);
