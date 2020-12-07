const baseUrl = 'http://jarf.me';

const metas = [
  { charset: 'utf-8' },
  { 'http-equiv': 'CONTENT-LANGUAGE', content: 'en-US' },
  { 'http-equiv': 'x-ua-compatible', content: 'ie=edge,chrome=1' },
  { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
  { property: 'og:site_name', content: 'jarf.me' },
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
  { rel: 'dns-prefetch preconnect', href: '//google-analytics.com', crossorigin: 'anonymous' },
  { rel: 'dns-prefetch preconnect', href: '//ajax.googleapis.com', crossorigin: 'anonymous' },
  { rel: 'manifest', href: `${baseUrl}/manifest.json` },
  { rel: 'shortcut icon', type: 'image/png', href: `${baseUrl}/favicon.ico` },
];

export {
  metas, links, htmlAttributes, baseUrl,
};
