import PortfolioForm from '@/components/portfolio-form';

export default function NewPortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground mt-1">
          Add a new project to your portfolio
        </p>
      </div>

      <PortfolioForm mode="create" />
    </div>
  );
}
