import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  category: String, // 'Machine Learning', 'Deep Learning', 'NLP & GenAI', etc.
  repoUrl: String,
  liveUrl: String,
  impact: [String],
  icon: String, // lucide-react icon name string, or we can hardcode
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

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Journey = mongoose.models.Journey || mongoose.model('Journey', JourneySchema);
export const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
export const Insight = mongoose.models.Insight || mongoose.model('Insight', InsightSchema);
