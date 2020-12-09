---
title: Stripping HTML extension to fix NextJS S3 routes
slug: stripping-html-fix-nextjs-s3-routes
date: "10-12-2020"
---

The error redirect in S3 + the 404 redirect in cloudfront made every non-root route point to the index landing page.  I am able to route to the desired page by adding `.html` to the route because then that file actually exists.

The solution to the routing problem is to strip the `.html` extension from the statically generated files. I ended up using `glob` to remove the extension from all html files except the root `index.html` file.

I realized that messing with the `sitemap.xml` file on each update would start to get annoying, so I added the `nextjs-sitemap-generator` package and used it to generate a sitemap after each build.