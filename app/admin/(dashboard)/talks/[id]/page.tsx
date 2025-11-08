'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TalkForm from '@/components/talk-form';
import { Card, CardContent } from '@/components/ui/card';

export default function EditTalkPage() {
  const params = useParams();
  const [talk, setTalk] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/talks/${params.id}`)
      .then(res => res.json())
      .then(data => setTalk(data))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  if (!talk) {
    return <Card><CardContent className="py-12 text-center"><p className="text-destructive">Talk not found</p></CardContent></Card>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Talk/Workshop</h1>
        <p className="text-muted-foreground mt-1">Update talk details</p>
      </div>
      <TalkForm talk={talk} mode="edit" />
    </div>
  );
}
