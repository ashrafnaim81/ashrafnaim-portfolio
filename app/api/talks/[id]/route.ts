import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single talk
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const talk = await prisma.talk.findUnique({
      where: { id: params.id },
    });

    if (!talk) {
      return NextResponse.json(
        { error: 'Talk not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const talkWithParsedFields = {
      ...talk,
      images: talk.images ? JSON.parse(talk.images) : [],
    };

    return NextResponse.json(talkWithParsedFields);
  } catch (error) {
    console.error('Error fetching talk:', error);
    return NextResponse.json(
      { error: 'Failed to fetch talk' },
      { status: 500 }
    );
  }
}

// PUT update talk
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
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

    // Check if talk exists
    const existingTalk = await prisma.talk.findUnique({
      where: { id: params.id },
    });

    if (!existingTalk) {
      return NextResponse.json(
        { error: 'Talk not found' },
        { status: 404 }
      );
    }

    // Stringify images array for storage
    const imagesString = images ? JSON.stringify(images) : '[]';

    // Update talk
    const talk = await prisma.talk.update({
      where: { id: params.id },
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
        status: status || existingTalk.status,
        slides: slides || null,
        recording: recording || null,
        images: imagesString,
        published: published !== undefined ? published : existingTalk.published,
      },
    });

    // Parse JSON fields for response
    const talkWithParsedFields = {
      ...talk,
      images: JSON.parse(talk.images),
    };

    return NextResponse.json(talkWithParsedFields);
  } catch (error) {
    console.error('Error updating talk:', error);
    return NextResponse.json(
      { error: 'Failed to update talk' },
      { status: 500 }
    );
  }
}

// DELETE talk
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if talk exists
    const talk = await prisma.talk.findUnique({
      where: { id: params.id },
    });

    if (!talk) {
      return NextResponse.json(
        { error: 'Talk not found' },
        { status: 404 }
      );
    }

    // Delete talk
    await prisma.talk.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: 'Talk deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting talk:', error);
    return NextResponse.json(
      { error: 'Failed to delete talk' },
      { status: 500 }
    );
  }
}
