# Omkar Gutal | Data Scientist & AI/ML Engineer Portfolio

A premium, dynamic portfolio website built with **Next.js**, **Tailwind CSS**, and **MongoDB**. Designed to showcase end-to-end Machine Learning solutions, AI projects, and professional journey with a modern, high-impact aesthetic.

## 🚀 Live Features
- **Dynamic Content**: All projects, certificates, and work experiences are served live from MongoDB.
- **Admin Studio**: A built-in, passcode-protected dashboard (`/admin`) for adding new data without touching code.
- **Responsive Design**: Optimized for all devices with glassmorphism and smooth Framer Motion animations.
- **Impact Focused**: Showcases real-world metrics and ML solution deployments.

## 🛠 Tech Stack
- **Frontend**: Next.js 15+, React 19, Framer Motion, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB (via Mongoose)
- **Icons**: Lucide React
- **Containerization**: Docker & Docker Compose

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (Local or Atlas)
- Docker (Optional)

### Local Development
1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Setup Environment Variables**
   Create a `.env` file in the root:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Seed the Database (Optional)**
   If you want to populate the database with initial data:
   ```bash
   npx tsx scripts/seed.ts
   ```

---

## 🐳 Docker Deployment (Recommended)

This project is fully containerized and production-ready.

### Run with Docker Compose
To start the app and a local MongoDB instance together:
```bash
docker-compose up --build
```
*App will be available at `http://localhost:3000`.*

### Run standalone Docker Image
```bash
docker build -t portfolio-app .
docker run -p 3000:3000 --env MONGODB_URI=your_uri portfolio-app
```

---

## 🔐 Data Studio (Admin)
To update your portfolio live:
1. Navigate to `/admin`.
2. Enter your secret passcode.
3. Fill out the forms to instantly push new Projects, Journey items, or Education entries to your live site.

## 📄 License
This project is for personal use. All rights reserved &copy; 2026 Omkar Gutal.
