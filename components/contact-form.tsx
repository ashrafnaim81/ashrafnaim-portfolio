'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Ada masalah menghantar mesej. Sila cuba lagi.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Ada masalah menghantar mesej. Sila cuba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Hantar Mesej
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Web3Forms Access Key */}
          <input type="hidden" name="access_key" value="092abadc-3a1e-4290-ad39-74f12c17e165" />

          {/* Optional: Redirect after submission */}
          <input type="hidden" name="redirect" value="false" />

          {/* Optional: Custom subject for email */}
          <input type="hidden" name="from_name" value="Portfolio Website Contact Form" />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nama Penuh *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nama anda"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="email@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Nombor Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="012-345 6789"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium mb-2">
              Organisasi/Sekolah
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nama sekolah atau organisasi"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subjek *
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            >
              <option value="">Pilih subjek...</option>
              <option value="Jemputan Bengkel/Ceramah">Jemputan Bengkel/Ceramah</option>
              <option value="Kerjasama Projek">Kerjasama Projek</option>
              <option value="Konsultasi">Konsultasi</option>
              <option value="Pertanyaan Am">Pertanyaan Am</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Mesej *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Tulis mesej anda di sini..."
              disabled={isSubmitting}
            />
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md text-green-800 dark:text-green-200">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Mesej Berjaya Dihantar!</p>
                <p className="text-sm">Terima kasih kerana menghubungi saya. Saya akan membalas dalam masa 24-48 jam.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Mesej Gagal Dihantar</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Menghantar...</span>
                <span className="animate-spin">⏳</span>
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Hantar Mesej
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Dengan menghantar mesej ini, anda bersetuju dengan dasar privasi kami.
            Saya akan membalas dalam masa 24-48 jam.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
