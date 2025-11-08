'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Calendar, MapPin } from 'lucide-react';

interface Talk {
  id: string;
  title: string;
  description: string;
  type: string;
  venue?: string;
  location?: string;
  date: string;
  status: string;
  audience?: string;
  participants?: number;
  published: boolean;
}

export default function TalksManagementPage() {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/talks')
      .then(res => res.json())
      .then(data => setTalks(data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Talks & Workshops</h1>
          <p className="text-muted-foreground mt-1">Manage your talks and workshops</p>
        </div>
        <Link href="/admin/talks/new">
          <Button><Plus className="mr-2 h-4 w-4" />Create Talk</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Talks</CardTitle>
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">{talks.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">{talks.filter(t => t.published).length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">{talks.filter(t => t.status === 'upcoming').length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>All Talks</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {talks.map((talk) => (
              <div key={talk.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{talk.title}</h3>
                        <Badge variant={talk.status === 'completed' ? 'secondary' : 'default'}>{talk.status}</Badge>
                        {talk.published && <Badge variant="outline">Published</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{talk.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(talk.date).toLocaleDateString()}</span>
                        {talk.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{talk.location}</span>}
                        {talk.participants && <span>{talk.participants} participants</span>}
                      </div>
                    </div>
                    <Link href={`/admin/talks/${talk.id}`}>
                      <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" />Edit</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
