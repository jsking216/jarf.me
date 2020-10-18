const baseUrl = 'http://jarf.me';

const metas = [
  { charset: 'utf-8' },
  { 'http-equiv': 'CONTENT-LANGUAGE', content: 'en-US' },
  { 'http-equiv': 'x-ua-compatible', content: 'ie=edge,chrome=1' },
  { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
  { property: 'og:site_name', content: "Jarf.me | Joshua King" },
  {
    property: 'og:description',
    content: "Jarf.me - Joshua King's personal page",
  },
  {
    name: 'description',
    content: "Jarf.me - Joshua King's personal page",
  },
  { property: 'og:type', content: 'profile' },
  { property: 'og:image', content: `${baseUrl}/images/profilepic.jpg` },
  { property: 'og:updated_time', content: '2020-10-17T20:20:40-04:00' },
  { property: 'profile:first_name', content: 'Joshua' },
  { property: 'profile:last_name', content: 'King' },
  { property: 'profile:username', content: 'Jarf' },
  { property: 'profile:username', content: 'Jarf' },
  {
    property: 'og:url',
    content: baseUrl,
  },
  { property: 'og:title', content: "Jarf.me | Joshua King" },

];


const htmlAttributes = {
  xmlns: 'http://www.w3.org/1999/xhtml',
  lang: 'en',
  'xml:lang': 'en',
  version: 'XHTML+RDFa 1.0',
  'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
  'xmlns:dc': 'http://purl.org/dc/terms/',
  'xmlns:foaf': 'http://xmlns.com/foaf/0.1/',
  'xmlns:og': 'http://ogp.me/ns#',
  'xmlns:rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
  'xmlns:sioc': 'http://rdfs.org/sioc/ns#',
  'xmlns:sioct': 'http://rdfs.org/sioc/types#',
  'xmlns:skos': 'http://www.w3.org/2004/02/skos/core#',
  'xmlns:xsd:': 'http://www.w3.org/2001/XMLSchema#',
  'xmlns:schema': 'http://schema.org/',
  'xmlns:article': 'http://ogp.me/ns/article#',
  'xmlns:book': 'http://ogp.me/ns/book#',
  'xmlns:profile': 'http://ogp.me/ns/profile#',
  'xmlns:video': 'http://ogp.me/ns/video#',
  dir: 'ltr',
};

const links = [
  { rel: 'canonical', href: baseUrl },
  { rel: 'dns-prefetch preconnect', href: '//google-analytics.com', crossorigin: 'anonymous' },
  { rel: 'dns-prefetch preconnect', href: '//ajax.googleapis.com', crossorigin: 'anonymous' },
  { rel: 'manifest', href: `${baseUrl}/manifest.json` },
  { rel: 'shortcut icon', type: 'image/png', href: `${baseUrl}/favicon.ico` },
];

export { metas, links, htmlAttributes };