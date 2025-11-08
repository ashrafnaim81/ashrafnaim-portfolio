'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

type Stat = { value: string; label: string };
type Achievement = { icon: string; title: string; period: string; description: string };
type Skill = { name: string; level: string; description: string };

export default function HomePageEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [heroTitle, setHeroTitle] = useState('');
  const [heroJobTitle, setHeroJobTitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [stats, setStats] = useState<Stat[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [ctaTitle, setCtaTitle] = useState('');
  const [ctaDescription, setCtaDescription] = useState('');
  const [published, setPublished] = useState(true);

  // Edit states
  const [editingStat, setEditingStat] = useState<number | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<number | null>(null);
  const [editingSkill, setEditingSkill] = useState<number | null>(null);

  useEffect(() => {
    fetchHomePage();
  }, []);

  const fetchHomePage = async () => {
    try {
      const res = await fetch('/api/home');
      if (res.ok) {
        const data = await res.json();
        setHeroTitle(data.heroTitle || '');
        setHeroJobTitle(data.heroJobTitle || '');
        setHeroDescription(data.heroDescription || '');
        setHeroImage(data.heroImage || '');
        setStats(data.stats || []);
        setAchievements(data.achievements || []);
        setSkills(data.skills || []);
        setCtaTitle(data.ctaTitle || '');
        setCtaDescription(data.ctaDescription || '');
        setPublished(data.published);
      }
    } catch (err) {
      setError('Failed to load home page data');
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
      const res = await fetch('/api/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroTitle,
          heroJobTitle,
          heroDescription,
          heroImage,
          stats,
          achievements,
          skills,
          ctaTitle,
          ctaDescription,
          published,
        }),
      });

      if (res.ok) {
        setSuccess('Home page updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update home page');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update home page');
    } finally {
      setIsSaving(false);
    }
  };

  // Stats handlers
  const addStat = () => {
    setStats([...stats, { value: '', label: '' }]);
    setEditingStat(stats.length);
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const deleteStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
    setEditingStat(null);
  };

  // Achievements handlers
  const addAchievement = () => {
    setAchievements([...achievements, { icon: 'Award', title: '', period: '', description: '' }]);
    setEditingAchievement(achievements.length);
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const newAchievements = [...achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setAchievements(newAchievements);
  };

  const deleteAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
    setEditingAchievement(null);
  };

  // Skills handlers
  const addSkill = () => {
    setSkills([...skills, { name: '', level: '', description: '' }]);
    setEditingSkill(skills.length);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };

  const deleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
    setEditingSkill(null);
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
        <h1 className="text-3xl font-bold">Edit Home Page</h1>
        <p className="text-muted-foreground mt-1">Manage home page content</p>
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
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Title *</Label>
              <Input
                id="heroTitle"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="heroJobTitle">Job Title *</Label>
              <Textarea
                id="heroJobTitle"
                value={heroJobTitle}
                onChange={(e) => setHeroJobTitle(e.target.value)}
                rows={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="heroDescription">Description *</Label>
              <Textarea
                id="heroDescription"
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="heroImage">Image Path</Label>
              <Input
                id="heroImage"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/images/profile/profile.png"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Stats Section</CardTitle>
              <Button type="button" size="sm" onClick={addStat}>
                <Plus className="h-4 w-4 mr-1" /> Add Stat
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.length === 0 ? (
              <p className="text-sm text-muted-foreground">No stats added yet. Click "Add Stat" to add one.</p>
            ) : (
              stats.map((stat, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  {editingStat === index ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Value</Label>
                          <Input
                            value={stat.value}
                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                            placeholder="19+"
                          />
                        </div>
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={stat.label}
                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                            placeholder="Tahun Pengalaman"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={() => setEditingStat(null)}>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => deleteStat(index)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{stat.value || '(No value)'}</p>
                        <p className="text-sm text-muted-foreground">{stat.label || '(No label)'}</p>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingStat(index)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Achievements Section</CardTitle>
              <Button type="button" size="sm" onClick={addAchievement}>
                <Plus className="h-4 w-4 mr-1" /> Add Achievement
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.length === 0 ? (
              <p className="text-sm text-muted-foreground">No achievements added yet.</p>
            ) : (
              achievements.map((achievement, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  {editingAchievement === index ? (
                    <>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Icon (Award/GraduationCap/Briefcase)</Label>
                            <Input
                              value={achievement.icon}
                              onChange={(e) => updateAchievement(index, 'icon', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Period</Label>
                            <Input
                              value={achievement.period}
                              onChange={(e) => updateAchievement(index, 'period', e.target.value)}
                              placeholder="2025"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={achievement.title}
                            onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                            placeholder="Teknologis Profesional"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={achievement.description}
                            onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={() => setEditingAchievement(null)}>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => deleteAchievement(index)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{achievement.title || '(No title)'}</p>
                        <p className="text-sm text-muted-foreground">{achievement.period}</p>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingAchievement(index)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Skills Section</CardTitle>
              <Button type="button" size="sm" onClick={addSkill}>
                <Plus className="h-4 w-4 mr-1" /> Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {skills.length === 0 ? (
              <p className="text-sm text-muted-foreground">No skills added yet.</p>
            ) : (
              skills.map((skill, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  {editingSkill === index ? (
                    <>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={skill.name}
                              onChange={(e) => updateSkill(index, 'name', e.target.value)}
                              placeholder="Microsoft 365"
                            />
                          </div>
                          <div>
                            <Label>Level</Label>
                            <Input
                              value={skill.level}
                              onChange={(e) => updateSkill(index, 'level', e.target.value)}
                              placeholder="Advanced"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            value={skill.description}
                            onChange={(e) => updateSkill(index, 'description', e.target.value)}
                            placeholder="Power Platform, Teams, SharePoint"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={() => setEditingSkill(null)}>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => deleteSkill(index)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{skill.name || '(No name)'}</p>
                        <p className="text-sm text-muted-foreground">{skill.level} - {skill.description}</p>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingSkill(index)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card>
          <CardHeader>
            <CardTitle>Call-to-Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ctaTitle">CTA Title *</Label>
              <Input
                id="ctaTitle"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="ctaDescription">CTA Description *</Label>
              <Textarea
                id="ctaDescription"
                value={ctaDescription}
                onChange={(e) => setCtaDescription(e.target.value)}
                rows={3}
                required
              />
            </div>
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
