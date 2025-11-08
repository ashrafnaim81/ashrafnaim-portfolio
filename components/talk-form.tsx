'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, Trash2, X, Plus } from 'lucide-react';

interface Talk {
  id?: string;
  title: string;
  description: string;
  type: string;
  venue?: string;
  location?: string;
  date: string;
  endDate?: string;
  audience?: string;
  participants?: number;
  status: string;
  slides?: string;
  recording?: string;
  images: string[];
  published: boolean;
}

interface TalkFormProps {
  talk?: Talk;
  mode: 'create' | 'edit';
}

export default function TalkForm({ talk, mode }: TalkFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<Talk>({
    title: talk?.title || '',
    description: talk?.description || '',
    type: talk?.type || '',
    venue: talk?.venue || '',
    location: talk?.location || '',
    date: talk?.date ? new Date(talk.date).toISOString().split('T')[0] : '',
    endDate: talk?.endDate ? new Date(talk.endDate).toISOString().split('T')[0] : '',
    audience: talk?.audience || '',
    participants: talk?.participants || undefined,
    status: talk?.status || 'upcoming',
    slides: talk?.slides || '',
    recording: talk?.recording || '',
    images: talk?.images || [],
    published: talk?.published !== undefined ? talk.published : false,
  });

  const [imageInput, setImageInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const url = mode === 'create'
        ? '/api/talks'
        : `/api/talks/${talk?.id}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save talk');
      }

      setSuccess(
        mode === 'create'
          ? 'Talk created successfully!'
          : 'Talk updated successfully!'
      );

      setTimeout(() => {
        router.push('/admin/talks');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!talk?.id) return;

    if (!confirm('Are you sure you want to delete this talk?')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/talks/${talk.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete talk');
      }

      router.push('/admin/talks');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  const addImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== imageToRemove),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Workshop/Talk Title"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Event description..."
              required
              disabled={isLoading}
              rows={4}
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select Type</option>
                <option value="Workshop">Workshop</option>
                <option value="Ceramah">Ceramah</option>
                <option value="Webinar">Webinar</option>
                <option value="Training">Training</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
                placeholder="e.g., Dewan Sekolah"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., Johor Bahru"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
                placeholder="e.g., Guru Sekolah Menengah"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Number of Participants</Label>
              <Input
                id="participants"
                type="number"
                value={formData.participants || ''}
                onChange={(e) =>
                  setFormData({ ...formData, participants: e.target.value ? parseInt(e.target.value) : undefined })
                }
                placeholder="e.g., 50"
                disabled={isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources & Materials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slides">Slides URL</Label>
            <Input
              id="slides"
              type="url"
              value={formData.slides}
              onChange={(e) =>
                setFormData({ ...formData, slides: e.target.value })
              }
              placeholder="https://..."
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recording">Recording URL</Label>
            <Input
              id="recording"
              type="url"
              value={formData.recording}
              onChange={(e) =>
                setFormData({ ...formData, recording: e.target.value })
              }
              placeholder="https://..."
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Event Images</Label>
            <div className="flex gap-2">
              <Input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImage();
                  }
                }}
                placeholder="Add image URL"
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={addImage}
                disabled={isLoading || !imageInput.trim()}
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="space-y-2 mt-2">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 border rounded"
                  >
                    <span className="text-sm flex-1 truncate">{img}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(img)}
                      disabled={isLoading}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              disabled={isLoading}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Published</span>
          </label>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          {mode === 'create' ? 'Create Talk' : 'Update Talk'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/talks')}
          disabled={isLoading}
        >
          Cancel
        </Button>

        {mode === 'edit' && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="ml-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Talk
          </Button>
        )}
      </div>
    </form>
  );
}
