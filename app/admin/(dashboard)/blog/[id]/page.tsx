import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BlogForm from '@/components/blog-form';

async function getBlogPost(id: string) {
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
    },
  });

  if (!post) {
    return null;
  }

  return post;
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <BlogForm
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        coverImage: post.coverImage || '',
        published: post.published,
        categoryId: post.categoryId || '',
      }}
      isEdit
    />
  );
}
