import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'cat', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
