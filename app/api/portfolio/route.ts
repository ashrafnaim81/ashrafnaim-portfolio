import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all portfolio projects
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // For admin, show all projects. For public, show only published
    const where = session ? {} : { published: true };

    const projects = await prisma.portfolioProject.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // Parse JSON fields
    const projectsWithParsedFields = projects.map((project) => ({
      ...project,
      tags: project.tags ? JSON.parse(project.tags) : [],
      images: project.images ? JSON.parse(project.images) : [],
    }));

    return NextResponse.json(projectsWithParsedFields);
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio projects' },
      { status: 500 }
    );
  }
}

// POST create new portfolio project
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
      slug,
      description,
      category,
      tags,
      icon,
      color,
      link,
      impact,
      images,
      featured,
      published,
      order,
    } = body;

    // Validation
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const projectSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check if slug already exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { slug: projectSlug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Stringify arrays for storage
    const tagsString = tags ? JSON.stringify(tags) : '[]';
    const imagesString = images ? JSON.stringify(images) : '[]';

    // Create project
    const project = await prisma.portfolioProject.create({
      data: {
        title,
        slug: projectSlug,
        description,
        category,
        tags: tagsString,
        icon: icon || null,
        color: color || null,
        link: link || null,
        impact: impact || null,
        images: imagesString,
        featured: featured || false,
        published: published !== undefined ? published : true,
        order: order || 0,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Parse JSON fields for response
    const projectWithParsedFields = {
      ...project,
      tags: JSON.parse(project.tags),
      images: JSON.parse(project.images),
    };

    return NextResponse.json(projectWithParsedFields, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio project' },
      { status: 500 }
    );
  }
}
