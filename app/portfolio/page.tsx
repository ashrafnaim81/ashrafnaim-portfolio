import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Portfolio - Ts. Ashraf bin Naim',
  description: 'Portfolio projek dan sistem yang dibangunkan oleh Ts. Ashraf bin Naim',
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getPortfolioProjects() {
  const projects = await prisma.portfolioProject.findMany({
    where: {
      published: true,
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  // Parse JSON fields
  return projects.map((project) => ({
    ...project,
    tags: project.tags ? JSON.parse(project.tags) : [],
    images: project.images ? JSON.parse(project.images) : [],
  }));
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  // Extract unique categories from projects
  const categories = ['Semua', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Projek dan sistem yang telah dibangunkan untuk memajukan pendidikan
          melalui teknologi
        </p>
      </div>

      {/* Filter Tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No projects available yet. Check back soon!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  {project.icon && (
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                      style={{
                        background: project.color
                          ? `linear-gradient(135deg, ${project.color}, ${project.color}dd)`
                          : 'linear-gradient(135deg, #3b82f6, #2563eb)'
                      }}
                    >
                      {project.icon}
                    </div>
                  )}
                  <Badge variant="secondary">{project.category}</Badge>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {project.link && (
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Project
                      </Link>
                    </Button>
                  </div>
                )}

                {project.impact && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-primary">Impact:</strong> {project.impact}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">Ada Projek untuk Saya?</h2>
            <p className="mb-6 opacity-90">
              Saya sedia untuk membantu dalam projek transformasi digital,
              sistem pendidikan, atau pembangunan aplikasi.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Hubungi Saya</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
