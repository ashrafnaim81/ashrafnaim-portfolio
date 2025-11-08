import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET about page content
export async function GET() {
  try {
    // Get the first (and should be only) about page entry
    const aboutPage = await prisma.aboutPage.findFirst({
      where: { published: true },
    });

    if (!aboutPage) {
      return NextResponse.json(
        { error: 'About page not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const aboutPageWithParsedFields = {
      ...aboutPage,
      qualifications: aboutPage.qualifications ? JSON.parse(aboutPage.qualifications) : [],
      expertiseAreas: aboutPage.expertiseAreas ? JSON.parse(aboutPage.expertiseAreas) : [],
      experiences: aboutPage.experiences ? JSON.parse(aboutPage.experiences) : [],
      achievements: aboutPage.achievements ? JSON.parse(aboutPage.achievements) : [],
    };

    return NextResponse.json(aboutPageWithParsedFields);
  } catch (error) {
    console.error('Error fetching about page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about page' },
      { status: 500 }
    );
  }
}

// PUT update about page content
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
      profileTitle,
      profileSubtitle,
      profileJobTitle,
      profileLocation,
      profileYearsExperience,
      profileSummary,
      profileImage,
      qualifications,
      expertiseAreas,
      experiences,
      achievements,
      published,
    } = body;

    // Validation
    if (
      !profileTitle ||
      !profileSubtitle ||
      !profileJobTitle ||
      !profileLocation ||
      !profileYearsExperience ||
      !profileSummary
    ) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Get the existing about page entry
    const existingAboutPage = await prisma.aboutPage.findFirst();

    if (!existingAboutPage) {
      return NextResponse.json(
        { error: 'About page not found' },
        { status: 404 }
      );
    }

    // Stringify JSON fields for storage
    const qualificationsString = qualifications ? JSON.stringify(qualifications) : '[]';
    const expertiseAreasString = expertiseAreas ? JSON.stringify(expertiseAreas) : '[]';
    const experiencesString = experiences ? JSON.stringify(experiences) : '[]';
    const achievementsString = achievements ? JSON.stringify(achievements) : '[]';

    // Update about page
    const aboutPage = await prisma.aboutPage.update({
      where: { id: existingAboutPage.id },
      data: {
        profileTitle,
        profileSubtitle,
        profileJobTitle,
        profileLocation,
        profileYearsExperience,
        profileSummary,
        profileImage: profileImage || null,
        qualifications: qualificationsString,
        expertiseAreas: expertiseAreasString,
        experiences: experiencesString,
        achievements: achievementsString,
        published: published !== undefined ? published : existingAboutPage.published,
      },
    });

    // Parse JSON fields for response
    const aboutPageWithParsedFields = {
      ...aboutPage,
      qualifications: JSON.parse(aboutPage.qualifications),
      expertiseAreas: JSON.parse(aboutPage.expertiseAreas),
      experiences: JSON.parse(aboutPage.experiences),
      achievements: JSON.parse(aboutPage.achievements),
    };

    return NextResponse.json(aboutPageWithParsedFields);
  } catch (error) {
    console.error('Error updating about page:', error);
    return NextResponse.json(
      { error: 'Failed to update about page' },
      { status: 500 }
    );
  }
}
