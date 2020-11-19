---
title: static S3 bucket site and NextJS routing
slug: static-s3-bucket-site-nextjs-routing
date: "19-11-2020"
---

My first post exposed a problem with my static s3 bucket setup.  I could access my `/blog` routes through navigation from my landing page, but when attempting to directly access the blog route(s) that I added, `/blog` - or any non-index route would return a 404.  After some brief googling, stack overflowing, etc. I found that react routing all is actually handled within `index.html` - thus it is giving the appearance of going to `/blog/main` but in reality we're still hitting `index.html`.

Following the instructions from [a write-up about s3 and react routing](https://medium.com/@xergiodf/react-router-404s-pages-nginx-apache-amazon-s3-93f9b55e21f3)  I was able to directly access the blog routes.
