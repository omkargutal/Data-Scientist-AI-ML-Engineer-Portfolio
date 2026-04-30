import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Project, Journey, Education, Insight } from '@/models';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }

    let savedItem;

    switch (type) {
      case 'project':
        savedItem = await Project.create(data);
        break;
      case 'journey':
        savedItem = await Journey.create(data);
        break;
      case 'education':
        savedItem = await Education.create(data);
        break;
      case 'insight':
        savedItem = await Insight.create(data);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, item: savedItem });
  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
