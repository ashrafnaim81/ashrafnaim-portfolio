import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all talks
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // For admin, show all talks. For public, show only published
    const where = session ? {} : { published: true };

    const talks = await prisma.talk.findMany({
      where,
      orderBy: [
        { date: 'desc' },
      ],
    });

    // Parse JSON fields
    const talksWithParsedFields = talks.map((talk) => ({
      ...talk,
      images: talk.images ? JSON.parse(talk.images) : [],
    }));

    return NextResponse.json(talksWithParsedFields);
  } catch (error) {
    console.error('Error fetching talks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch talks' },
      { status: 500 }
    );
  }
}

// POST create new talk
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      type,
      venue,
      location,
      date,
      endDate,
      audience,
      participants,
      status,
      slides,
      recording,
      images,
      published,
    } = body;

    // Validation
    if (!title || !description || !type || !date) {
      return NextResponse.json(
        { error: 'Title, description, type, and date are required' },
        { status: 400 }
      );
    }

    // Stringify images array for storage
    const imagesString = images ? JSON.stringify(images) : '[]';

    // Create talk
    const talk = await prisma.talk.create({
      data: {
        title,
        description,
        type,
        venue: venue || null,
        location: location || null,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        audience: audience || null,
        participants: participants ? parseInt(participants) : null,
        status: status || 'upcoming',
        slides: slides || null,
        recording: recording || null,
        images: imagesString,
        published: published !== undefined ? published : false,
      },
    });

    // Parse JSON fields for response
    const talkWithParsedFields = {
      ...talk,
      images: JSON.parse(talk.images),
    };

    return NextResponse.json(talkWithParsedFields, { status: 201 });
  } catch (error) {
    console.error('Error creating talk:', error);
    return NextResponse.json(
      { error: 'Failed to create talk' },
      { status: 500 }
    );
  }
}
