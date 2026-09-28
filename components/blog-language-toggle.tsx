import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { BlogLang } from '@/lib/blog-i18n';

interface BlogLanguageToggleProps {
  lang: BlogLang;
  pairSlug: string;
}

const OPTIONS: { lang: BlogLang; label: string; name: string }[] = [
  { lang: 'ms', label: 'BM', name: 'Bahasa Melayu' },
  { lang: 'en', label: 'EN', name: 'English' },
];

// Suis bahasa untuk artikel berpasangan. Setiap bahasa kekal di URL sendiri
// (supaya Google mengindeks kedua-duanya); suis ini hanya pautan ke pasangannya.
export function BlogLanguageToggle({ lang, pairSlug }: BlogLanguageToggleProps) {
  return (
    <nav
      aria-label="Bahasa artikel / Article language"
      className="inline-flex items-center rounded-full border border-border/70 bg-card/70 p-1 text-sm backdrop-blur-md"
    >
      {OPTIONS.map((option) => {
        const base = 'rounded-full px-3 py-1 font-medium transition-colors';
        if (option.lang === lang) {
          return (
            <span
              key={option.lang}
              aria-current="true"
              title={option.name}
              className={cn(base, 'bg-primary text-primary-foreground')}
            >
              {option.label}
            </span>
          );
        }
        return (
          <Link
            key={option.lang}
            href={`/blog/${pairSlug}`}
            hrefLang={option.lang}
            title={option.name}
            className={cn(base, 'text-muted-foreground hover:text-foreground')}
          >
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
}
