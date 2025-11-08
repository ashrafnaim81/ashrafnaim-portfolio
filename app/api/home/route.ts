import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET home page content
export async function GET() {
  try {
    // Get the first (and should be only) home page entry
    const homePage = await prisma.homePage.findFirst({
      where: { published: true },
    });

    if (!homePage) {
      return NextResponse.json(
        { error: 'Home page not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const homePageWithParsedFields = {
      ...homePage,
      stats: homePage.stats ? JSON.parse(homePage.stats) : [],
      achievements: homePage.achievements ? JSON.parse(homePage.achievements) : [],
      skills: homePage.skills ? JSON.parse(homePage.skills) : [],
    };

    return NextResponse.json(homePageWithParsedFields);
  } catch (error) {
    console.error('Error fetching home page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home page' },
      { status: 500 }
    );
  }
}

// PUT update home page content
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
      heroTitle,
      heroJobTitle,
      heroDescription,
      heroImage,
      stats,
      achievements,
      skills,
      ctaTitle,
      ctaDescription,
      published,
    } = body;

    // Validation
    if (!heroTitle || !heroJobTitle || !heroDescription || !ctaTitle || !ctaDescription) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Get the existing home page entry
    const existingHomePage = await prisma.homePage.findFirst();

    if (!existingHomePage) {
      return NextResponse.json(
        { error: 'Home page not found' },
        { status: 404 }
      );
    }

    // Stringify JSON fields for storage
    const statsString = stats ? JSON.stringify(stats) : '[]';
    const achievementsString = achievements ? JSON.stringify(achievements) : '[]';
    const skillsString = skills ? JSON.stringify(skills) : '[]';

    // Update home page
    const homePage = await prisma.homePage.update({
      where: { id: existingHomePage.id },
      data: {
        heroTitle,
        heroJobTitle,
        heroDescription,
        heroImage: heroImage || null,
        stats: statsString,
        achievements: achievementsString,
        skills: skillsString,
        ctaTitle,
        ctaDescription,
        published: published !== undefined ? published : existingHomePage.published,
      },
    });

    // Parse JSON fields for response
    const homePageWithParsedFields = {
      ...homePage,
      stats: JSON.parse(homePage.stats),
      achievements: JSON.parse(homePage.achievements),
      skills: JSON.parse(homePage.skills),
    };

    return NextResponse.json(homePageWithParsedFields);
  } catch (error) {
    console.error('Error updating home page:', error);
    return NextResponse.json(
      { error: 'Failed to update home page' },
      { status: 500 }
    );
  }
}
