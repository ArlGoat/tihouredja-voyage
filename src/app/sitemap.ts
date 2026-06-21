import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tihouredjavoyage.site';
  const lastModified = new Date();

  // Define all core routes
  const routes = [
    '',
    '/about',
    '/book-now',
    '/craft',
    '/practical-information',
    '/faq',
    '/destinations/tadrart-rouge',
    '/destinations/ihrir-erg-admer',
    '/destinations/tassili-najjer-sefar',
  ];

  // Generate EN and FR versions
  const sitemapEntries = routes.flatMap((route) => [
    {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    },
    {
      url: `${baseUrl}/fr${route}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    },
  ]);

  return sitemapEntries;
}
