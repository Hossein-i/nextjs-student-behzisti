import type { MetadataRoute } from 'next';

export const manifest = (): MetadataRoute.Manifest => {
  return {
    name: 'سامانه دانشجویی بهزیستی',
    short_name: 'سامانه دانشجویی بهزیستی',
    description: '',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/assets/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
};
