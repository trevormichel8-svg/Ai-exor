export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_URL || "https://example.com";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/app`, lastModified: new Date() },
    { url: `${base}/dashboard`, lastModified: new Date() }
  ];
}
