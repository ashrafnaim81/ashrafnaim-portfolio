import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Mail, Calendar, Eye, CheckCircle } from 'lucide-react';

async function getStats() {
  const [
    totalBlogPosts,
    publishedBlogPosts,
    totalPortfolio,
    totalContacts,
    unreadContacts,
    totalTalks,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.portfolioProject.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { read: false } }),
    prisma.talk.count(),
  ]);

  return {
    totalBlogPosts,
    publishedBlogPosts,
    totalPortfolio,
    totalContacts,
    unreadContacts,
    totalTalks,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts,
      description: `${stats.publishedBlogPosts} published`,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Portfolio Projects',
      value: stats.totalPortfolio,
      description: 'Total projects',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Contact Messages',
      value: stats.totalContacts,
      description: `${stats.unreadContacts} unread`,
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Talks & Workshops',
      value: stats.totalTalks,
      description: 'Total events',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/blog"
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">Create New Blog Post</span>
            </a>
            <a
              href="/admin/portfolio"
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="font-medium">Add Portfolio Project</span>
            </a>
            <a
              href="/admin/contacts"
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-medium">View Contact Messages</span>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle className="h-4 w-4" />
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database</span>
              <span className="text-sm font-medium">SQLite (Local)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">2.0.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
