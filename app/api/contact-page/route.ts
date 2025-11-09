import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET contact page data
export async function GET() {
  try {
    const contactPage = await prisma.contactPage.findFirst({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!contactPage) {
      return NextResponse.json(
        { error: 'Contact page not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const pageData = {
      ...contactPage,
      socialMedia: JSON.parse(contactPage.socialMedia),
      quickActions: JSON.parse(contactPage.quickActions),
      faqs: JSON.parse(contactPage.faqs),
    };

    return NextResponse.json(pageData);
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact page' },
      { status: 500 }
    );
  }
}

// PUT/POST update contact page (admin only)
export async function PUT(request: NextRequest) {
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
      pageTitle,
      pageDescription,
      locationTitle,
      locationAddress,
      operatingHours,
      socialMedia,
      quickActions,
      responseTime,
      responseTimeDesc,
      faqs,
      published,
    } = body;

    // Stringify JSON fields
    const socialMediaString = JSON.stringify(socialMedia);
    const quickActionsString = JSON.stringify(quickActions);
    const faqsString = JSON.stringify(faqs);

    // Try to get existing contact page
    const existing = await prisma.contactPage.findFirst();

    let contactPage;
    if (existing) {
      // Update existing
      contactPage = await prisma.contactPage.update({
        where: { id: existing.id },
        data: {
          pageTitle,
          pageDescription,
          locationTitle,
          locationAddress,
          operatingHours,
          socialMedia: socialMediaString,
          quickActions: quickActionsString,
          responseTime,
          responseTimeDesc,
          faqs: faqsString,
          published: published !== undefined ? published : true,
        },
      });
    } else {
      // Create new
      contactPage = await prisma.contactPage.create({
        data: {
          pageTitle,
          pageDescription,
          locationTitle,
          locationAddress,
          operatingHours,
          socialMedia: socialMediaString,
          quickActions: quickActionsString,
          responseTime,
          responseTimeDesc,
          faqs: faqsString,
          published: published !== undefined ? published : true,
        },
      });
    }

    // Parse JSON fields for response
    const pageData = {
      ...contactPage,
      socialMedia: JSON.parse(contactPage.socialMedia),
      quickActions: JSON.parse(contactPage.quickActions),
      faqs: JSON.parse(contactPage.faqs),
    };

    return NextResponse.json(pageData);
  } catch (error) {
    console.error('Error updating contact page:', error);
    return NextResponse.json(
      { error: 'Failed to update contact page' },
      { status: 500 }
    );
  }
}

// Support POST as well
export const POST = PUT;
