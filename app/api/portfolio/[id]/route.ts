import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single portfolio project
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const project = await prisma.portfolioProject.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const projectWithParsedFields = {
      ...project,
      tags: project.tags ? JSON.parse(project.tags) : [],
      images: project.images ? JSON.parse(project.images) : [],
    };

    return NextResponse.json(projectWithParsedFields);
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio project' },
      { status: 500 }
    );
  }
}

// PUT update portfolio project
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

    // Check if project exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // If slug is being changed, check it doesn't conflict
    if (slug && slug !== existingProject.slug) {
      const slugConflict = await prisma.portfolioProject.findUnique({
        where: { slug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Stringify arrays for storage
    const tagsString = tags ? JSON.stringify(tags) : '[]';
    const imagesString = images ? JSON.stringify(images) : '[]';

    // Update project
    const project = await prisma.portfolioProject.update({
      where: { id: params.id },
      data: {
        title,
        slug: slug || existingProject.slug,
        description,
        category,
        tags: tagsString,
        icon: icon || null,
        color: color || null,
        link: link || null,
        impact: impact || null,
        images: imagesString,
        featured: featured !== undefined ? featured : existingProject.featured,
        published: published !== undefined ? published : existingProject.published,
        order: order !== undefined ? order : existingProject.order,
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

    return NextResponse.json(projectWithParsedFields);
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio project' },
      { status: 500 }
    );
  }
}

// DELETE portfolio project
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

    // Check if project exists
    const project = await prisma.portfolioProject.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete project
    await prisma.portfolioProject.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio project' },
      { status: 500 }
    );
  }
}
