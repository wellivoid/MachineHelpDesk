import { en } from '@/shared/i18n/en';
import { es } from '@/shared/i18n/es';
import { pt } from '@/shared/i18n/pt';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: en,
    pt: pt,
    es: es,
  },
}));
