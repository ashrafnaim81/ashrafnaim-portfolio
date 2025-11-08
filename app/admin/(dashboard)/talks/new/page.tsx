import TalkForm from '@/components/talk-form';

export default function NewTalkPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Talk/Workshop</h1>
        <p className="text-muted-foreground mt-1">Add a new talk or workshop event</p>
      </div>
      <TalkForm mode="create" />
    </div>
  );
}
