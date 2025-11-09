'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SocialMedia {
  platform: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface QuickAction {
  title: string;
  link: string;
  icon: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContactPageData {
  pageTitle: string;
  pageDescription: string;
  locationTitle: string;
  locationAddress: string;
  operatingHours: string;
  socialMedia: SocialMedia[];
  quickActions: QuickAction[];
  responseTime: string;
  responseTimeDesc: string;
  faqs: FAQ[];
}

export default function ContactPageEditor() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [data, setData] = useState<ContactPageData>({
    pageTitle: '',
    pageDescription: '',
    locationTitle: '',
    locationAddress: '',
    operatingHours: '',
    socialMedia: [],
    quickActions: [],
    responseTime: '',
    responseTimeDesc: '',
    faqs: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/contact-page');
      if (response.ok) {
        const pageData = await response.json();
        setData(pageData);
      }
    } catch (error) {
      console.error('Error fetching contact page data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch('/api/contact-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // Social Media handlers
  const addSocialMedia = () => {
    setData({
      ...data,
      socialMedia: [
        ...data.socialMedia,
        { platform: '', name: '', url: '', icon: 'Link', color: 'text-gray-600' },
      ],
    });
  };

  const updateSocialMedia = (index: number, field: keyof SocialMedia, value: string) => {
    const updated = [...data.socialMedia];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, socialMedia: updated });
  };

  const removeSocialMedia = (index: number) => {
    setData({
      ...data,
      socialMedia: data.socialMedia.filter((_, i) => i !== index),
    });
  };

  // Quick Actions handlers
  const addQuickAction = () => {
    setData({
      ...data,
      quickActions: [...data.quickActions, { title: '', link: '', icon: 'Link' }],
    });
  };

  const updateQuickAction = (index: number, field: keyof QuickAction, value: string) => {
    const updated = [...data.quickActions];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, quickActions: updated });
  };

  const removeQuickAction = (index: number) => {
    setData({
      ...data,
      quickActions: data.quickActions.filter((_, i) => i !== index),
    });
  };

  // FAQ handlers
  const addFAQ = () => {
    setData({
      ...data,
      faqs: [...data.faqs, { question: '', answer: '' }],
    });
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const updated = [...data.faqs];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, faqs: updated });
  };

  const removeFAQ = (index: number) => {
    setData({
      ...data,
      faqs: data.faqs.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Edit Contact Page</h1>
          <p className="text-muted-foreground mt-1">
            Kemaskini maklumat hubungan, media sosial, dan FAQ
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Perubahan berjaya disimpan!
          </AlertDescription>
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Gagal menyimpan. Sila cuba lagi.
          </AlertDescription>
        </Alert>
      )}

      {/* Page Header Section */}
      <Card>
        <CardHeader>
          <CardTitle>Header Halaman</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pageTitle">Tajuk Halaman</Label>
            <Input
              id="pageTitle"
              value={data.pageTitle}
              onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
              placeholder="Hubungi Saya"
            />
          </div>
          <div>
            <Label htmlFor="pageDescription">Deskripsi</Label>
            <Textarea
              id="pageDescription"
              value={data.pageDescription}
              onChange={(e) => setData({ ...data, pageDescription: e.target.value })}
              rows={3}
              placeholder="Berminat untuk kerjasama..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Maklumat Hubungan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="locationTitle">Nama Lokasi</Label>
            <Input
              id="locationTitle"
              value={data.locationTitle}
              onChange={(e) => setData({ ...data, locationTitle: e.target.value })}
              placeholder="Pejabat Pendidikan Daerah Kluang"
            />
          </div>
          <div>
            <Label htmlFor="locationAddress">Alamat</Label>
            <Input
              id="locationAddress"
              value={data.locationAddress}
              onChange={(e) => setData({ ...data, locationAddress: e.target.value })}
              placeholder="Johor, Malaysia"
            />
          </div>
          <div>
            <Label htmlFor="operatingHours">Waktu Operasi</Label>
            <Textarea
              id="operatingHours"
              value={data.operatingHours}
              onChange={(e) => setData({ ...data, operatingHours: e.target.value })}
              rows={2}
              placeholder="Isnin - Jumaat&#10;8:00 AM - 5:00 PM"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Media Sosial</CardTitle>
            <Button onClick={addSocialMedia} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Platform
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.socialMedia.map((social, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Platform {index + 1}</h4>
                <Button
                  onClick={() => removeSocialMedia(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label>Platform</Label>
                  <Input
                    value={social.platform}
                    onChange={(e) => updateSocialMedia(index, 'platform', e.target.value)}
                    placeholder="Facebook"
                  />
                </div>
                <div>
                  <Label>Nama/Handle</Label>
                  <Input
                    value={social.name}
                    onChange={(e) => updateSocialMedia(index, 'name', e.target.value)}
                    placeholder="@ashraf.naim.9"
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    value={social.url}
                    onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <Label>Icon (Lucide name)</Label>
                  <Input
                    value={social.icon}
                    onChange={(e) => updateSocialMedia(index, 'icon', e.target.value)}
                    placeholder="Facebook"
                  />
                </div>
                <div>
                  <Label>Color (Tailwind class)</Label>
                  <Input
                    value={social.color}
                    onChange={(e) => updateSocialMedia(index, 'color', e.target.value)}
                    placeholder="text-blue-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tindakan Pantas</CardTitle>
            <Button onClick={addQuickAction} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Action
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.quickActions.map((action, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Action {index + 1}</h4>
                <Button
                  onClick={() => removeQuickAction(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={action.title}
                    onChange={(e) => updateQuickAction(index, 'title', e.target.value)}
                    placeholder="Jemput untuk Bengkel"
                  />
                </div>
                <div>
                  <Label>Link</Label>
                  <Input
                    value={action.link}
                    onChange={(e) => updateQuickAction(index, 'link', e.target.value)}
                    placeholder="/talks"
                  />
                </div>
                <div>
                  <Label>Icon (Lucide name)</Label>
                  <Input
                    value={action.icon}
                    onChange={(e) => updateQuickAction(index, 'icon', e.target.value)}
                    placeholder="Calendar"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Response Time */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="responseTime">Time (e.g., 24-48h)</Label>
              <Input
                id="responseTime"
                value={data.responseTime}
                onChange={(e) => setData({ ...data, responseTime: e.target.value })}
                placeholder="24-48h"
              />
            </div>
            <div>
              <Label htmlFor="responseTimeDesc">Deskripsi</Label>
              <Input
                id="responseTimeDesc"
                value={data.responseTimeDesc}
                onChange={(e) => setData({ ...data, responseTimeDesc: e.target.value })}
                placeholder="Purata masa respons..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Soalan Lazim (FAQ)</CardTitle>
            <Button onClick={addFAQ} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah FAQ
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.faqs.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">FAQ {index + 1}</h4>
                <Button onClick={() => removeFAQ(index)} variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label>Soalan</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                    placeholder="Berapa kos untuk bengkel?"
                  />
                </div>
                <div>
                  <Label>Jawapan</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    rows={3}
                    placeholder="Jawapan untuk soalan ini..."
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </div>
  );
}
