import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all contacts (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filterRead = searchParams.get('read');
    const filterReplied = searchParams.get('replied');

    // Build where clause based on filters
    const where: any = {};
    if (filterRead !== null) {
      where.read = filterRead === 'true';
    }
    if (filterReplied !== null) {
      where.replied = filterReplied === 'true';
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST create new contact (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create contact in database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        organization: organization || null,
        subject,
        message,
        read: false,
        replied: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Contact saved successfully',
        id: contact.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to save contact' },
      { status: 500 }
    );
  }
}
