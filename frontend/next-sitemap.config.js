/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://civic-ai-by-google-for-devlopers-3k.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [],
  },
};
