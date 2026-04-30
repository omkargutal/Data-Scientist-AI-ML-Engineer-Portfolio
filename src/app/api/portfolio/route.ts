import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Project, Journey, Education, Insight } from '@/models';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    
    const projects = await Project.find({});
    const journey = await Journey.find({});
    const education = await Education.find({});
    const insights = await Insight.find({});
    
    return NextResponse.json({
      projects,
      journey,
      education,
      insights
    });
  } catch (error: unknown) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
