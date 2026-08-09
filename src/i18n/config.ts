export const LOCALES = ['en', 'zh', 'bn'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<
  Locale,
  { label: string; short: string; htmlLang: string }
> = {
  en: { label: 'English', short: 'EN', htmlLang: 'en' },
  zh: { label: '中文', short: '中文', htmlLang: 'zh-CN' },
  bn: { label: 'বাংলা', short: 'বাংলা', htmlLang: 'bn' },
};

export const STORAGE_KEY = 'hxhd-locale';
