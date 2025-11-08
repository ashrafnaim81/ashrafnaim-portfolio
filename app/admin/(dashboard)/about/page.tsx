'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, Plus, Trash2, Edit2, Check } from 'lucide-react';

type Qualification = { icon: string; title: string; subtitle: string; description: string };
type ExpertiseArea = { title: string; description: string };
type Experience = { title: string; organization: string; period: string; description: string };
type Achievement = { title: string; items: string[] };

export default function AboutPageEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Profile fields
  const [profileTitle, setProfileTitle] = useState('');
  const [profileSubtitle, setProfileSubtitle] = useState('');
  const [profileJobTitle, setProfileJobTitle] = useState('');
  const [profileLocation, setProfileLocation] = useState('');
  const [profileYearsExperience, setProfileYearsExperience] = useState('');
  const [profileSummary, setProfileSummary] = useState('');
  const [profileImage, setProfileImage] = useState('');

  // Dynamic arrays
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseArea[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [published, setPublished] = useState(true);

  // Edit states
  const [editingQual, setEditingQual] = useState<number | null>(null);
  const [editingExpertise, setEditingExpertise] = useState<number | null>(null);
  const [editingExp, setEditingExp] = useState<number | null>(null);
  const [editingAch, setEditingAch] = useState<number | null>(null);

  useEffect(() => {
    fetchAboutPage();
  }, []);

  const fetchAboutPage = async () => {
    try {
      const res = await fetch('/api/about');
      if (res.ok) {
        const data = await res.json();
        setProfileTitle(data.profileTitle || '');
        setProfileSubtitle(data.profileSubtitle || '');
        setProfileJobTitle(data.profileJobTitle || '');
        setProfileLocation(data.profileLocation || '');
        setProfileYearsExperience(data.profileYearsExperience || '');
        setProfileSummary(data.profileSummary || '');
        setProfileImage(data.profileImage || '');
        setQualifications(data.qualifications || []);
        setExpertiseAreas(data.expertiseAreas || []);
        setExperiences(data.experiences || []);
        setAchievements(data.achievements || []);
        setPublished(data.published);
      }
    } catch (err) {
      setError('Failed to load about page data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileTitle,
          profileSubtitle,
          profileJobTitle,
          profileLocation,
          profileYearsExperience,
          profileSummary,
          profileImage,
          qualifications,
          expertiseAreas,
          experiences,
          achievements,
          published,
        }),
      });

      if (res.ok) {
        setSuccess('About page updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update about page');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update about page');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit About Page</h1>
        <p className="text-muted-foreground mt-1">Manage about page content</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-500 text-green-600">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title *</Label>
                <Input value={profileTitle} onChange={(e) => setProfileTitle(e.target.value)} required />
              </div>
              <div>
                <Label>Subtitle *</Label>
                <Input value={profileSubtitle} onChange={(e) => setProfileSubtitle(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label>Job Title *</Label>
              <Input value={profileJobTitle} onChange={(e) => setProfileJobTitle(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Location *</Label>
                <Input value={profileLocation} onChange={(e) => setProfileLocation(e.target.value)} required />
              </div>
              <div>
                <Label>Years Experience *</Label>
                <Input value={profileYearsExperience} onChange={(e) => setProfileYearsExperience(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label>Summary *</Label>
              <Textarea value={profileSummary} onChange={(e) => setProfileSummary(e.target.value)} rows={4} required />
            </div>
            <div>
              <Label>Profile Image Path</Label>
              <Input value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="/images/profile/profile.png" />
            </div>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Professional Qualifications</CardTitle>
              <Button type="button" size="sm" onClick={() => {
                setQualifications([...qualifications, { icon: 'Award', title: '', subtitle: '', description: '' }]);
                setEditingQual(qualifications.length);
              }}>
                <Plus className="h-4 w-4 mr-1" /> Add Qualification
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {qualifications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No qualifications added yet.</p>
            ) : (
              qualifications.map((qual, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                  {editingQual === i ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Icon</Label>
                          <Input value={qual.icon} onChange={(e) => {
                            const updated = [...qualifications];
                            updated[i].icon = e.target.value;
                            setQualifications(updated);
                          }} placeholder="Award" />
                        </div>
                        <div>
                          <Label>Subtitle</Label>
                          <Input value={qual.subtitle} onChange={(e) => {
                            const updated = [...qualifications];
                            updated[i].subtitle = e.target.value;
                            setQualifications(updated);
                          }} />
                        </div>
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input value={qual.title} onChange={(e) => {
                          const updated = [...qualifications];
                          updated[i].title = e.target.value;
                          setQualifications(updated);
                        }} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={qual.description} onChange={(e) => {
                          const updated = [...qualifications];
                          updated[i].description = e.target.value;
                          setQualifications(updated);
                        }} rows={2} />
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={() => setEditingQual(null)}>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => {
                          setQualifications(qualifications.filter((_, idx) => idx !== i));
                          setEditingQual(null);
                        }}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{qual.title || '(No title)'}</p>
                        <p className="text-sm text-muted-foreground">{qual.subtitle}</p>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingQual(i)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Expertise Areas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Expertise Areas</CardTitle>
              <Button type="button" size="sm" onClick={() => {
                setExpertiseAreas([...expertiseAreas, { title: '', description: '' }]);
                setEditingExpertise(expertiseAreas.length);
              }}>
                <Plus className="h-4 w-4 mr-1" /> Add Expertise
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {expertiseAreas.length === 0 ? (
              <p className="text-sm text-muted-foreground">No expertise areas added yet.</p>
            ) : (
              expertiseAreas.map((area, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                  {editingExpertise === i ? (
                    <>
                      <div>
                        <Label>Title</Label>
                        <Input value={area.title} onChange={(e) => {
                          const updated = [...expertiseAreas];
                          updated[i].title = e.target.value;
                          setExpertiseAreas(updated);
                        }} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input value={area.description} onChange={(e) => {
                          const updated = [...expertiseAreas];
                          updated[i].description = e.target.value;
                          setExpertiseAreas(updated);
                        }} />
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={() => setEditingExpertise(null)}>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => {
                          setExpertiseAreas(expertiseAreas.filter((_, idx) => idx !== i));
                          setEditingExpertise(null);
                        }}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{area.title || '(No title)'}</p>
                        <p className="text-sm text-muted-foreground">{area.description}</p>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingExpertise(i)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Experiences */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Professional Experience</CardTitle>
              <Button type="button" size="sm" onClick={() => {
                setExperiences([...experiences, { title: '', organization: '', period: '', description: '' }]);
                setEditingExp(experiences.length);
              }}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {experiences.length === 0 ? (
              <p className="text-sm text-muted-foreground">No experiences added yet.</p>
            ) : (
              experiences.map((exp, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                  {editingExp === i ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Title</Label>
                          <Input value={exp.title} onChange={(e) => {
                            const updated = [...experiences];
                            updated[i].title = e.target.value;
                            setExperiences(updated);
                          }} />
                        </div>
                        <div>
                          <Label>Period</Label>
                          <Input value={exp.period} onChange={(e) => {
                            const updated = [...experiences];
                            updated[i].period = e.target.value;
                            setExperiences(updated);
                          }} placeholder="2022 - Kini" />
                        </div>
                      </div>
                      <div>
                        <Label>Organization</Label>
                        <Input value={exp.organization} onChange={(e) => {
                          const updated = [...experiences];
                          updated[i].organization = e.target.value;
                          setExperiences(updated);
                        }} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={exp.description} onChange={(e) => {
                          const updated = [...experiences];
                          updated[i].description = e.target.value;
                          setExperiences(updated);
                        }} rows={2} />
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={() => setEditingExp(null)}>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => {
                          setExperiences(experiences.filter((_, idx) => idx !== i));
                          setEditingExp(null);
                        }}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{exp.title || '(No title)'}</p>
                        <p className="text-sm text-muted-foreground">{exp.organization} • {exp.period}</p>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingExp(i)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Achievements & Contributions</CardTitle>
              <Button type="button" size="sm" onClick={() => {
                setAchievements([...achievements, { title: '', items: [''] }]);
                setEditingAch(achievements.length);
              }}>
                <Plus className="h-4 w-4 mr-1" /> Add Achievement Category
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.length === 0 ? (
              <p className="text-sm text-muted-foreground">No achievements added yet.</p>
            ) : (
              achievements.map((ach, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                  {editingAch === i ? (
                    <>
                      <div>
                        <Label>Category Title</Label>
                        <Input value={ach.title} onChange={(e) => {
                          const updated = [...achievements];
                          updated[i].title = e.target.value;
                          setAchievements(updated);
                        }} placeholder="Bengkel & Ceramah" />
                      </div>
                      <div>
                        <Label>Items (one per line)</Label>
                        <Textarea
                          value={ach.items.join('\n')}
                          onChange={(e) => {
                            const updated = [...achievements];
                            updated[i].items = e.target.value.split('\n').filter(item => item.trim());
                            setAchievements(updated);
                          }}
                          rows={4}
                          placeholder="Penceramah AI dalam Pendidikan (25+ sesi)"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={() => setEditingAch(null)}>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => {
                          setAchievements(achievements.filter((_, idx) => idx !== i));
                          setEditingAch(null);
                        }}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{ach.title || '(No title)'}</p>
                        <p className="text-sm text-muted-foreground">{ach.items.length} item(s)</p>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingAch(i)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
