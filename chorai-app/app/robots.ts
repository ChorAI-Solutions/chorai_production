import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/agb', '/datenschutz', '/impressum'],
      },
    ],
    sitemap: 'https://chorai.de/sitemap.xml',
  }
}
