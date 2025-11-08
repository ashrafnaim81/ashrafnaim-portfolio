'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PortfolioForm from '@/components/portfolio-form';
import { Card, CardContent } from '@/components/ui/card';

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  icon?: string;
  color?: string;
  link?: string;
  impact?: string;
  images: string[];
  featured: boolean;
  published: boolean;
  order: number;
}

export default function EditPortfolioPage() {
  const params = useParams();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/portfolio/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      const data = await response.json();
      setProject(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">
            {error || 'Project not found'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground mt-1">
          Update project details and information
        </p>
      </div>

      <PortfolioForm project={project} mode="edit" />
    </div>
  );
}
