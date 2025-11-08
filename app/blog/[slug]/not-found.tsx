import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-2xl mx-auto text-center py-12">
        <CardContent>
          <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Artikel Tidak Dijumpai</h1>
          <p className="text-muted-foreground mb-8">
            Maaf, artikel yang anda cari tidak wujud atau telah dipadam.
          </p>
          <Link href="/blog">
            <Button>Kembali ke Blog</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
