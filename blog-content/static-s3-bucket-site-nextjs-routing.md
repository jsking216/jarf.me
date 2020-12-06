---
title: static S3 bucket site and NextJS routing
slug: static-s3-bucket-site-nextjs-routing
date: "22-11-2020"
---

My first post exposed a problem with my static s3 bucket setup.  I could access my `/blog` routes through navigation from my landing page, but when attempting to directly access the blog route(s) that I added, `/blog` - or any non-index route would return a 404.  After some brief googling, stack overflowing, etc. I found that react routing all is actually handled within `index.html` - thus it is giving the appearance of going to `/blog/main` but in reality we're still hitting `index.html`.

Following the instructions from [a write-up about s3 and react routing](https://medium.com/@xergiodf/react-router-404s-pages-nginx-apache-amazon-s3-93f9b55e21f3) didn't work for me.  After some more research, I found out that there is a configuratble error page in the s3 bucket's static hosting properties.  I updated it to point to `index.html` instead of what appeared to be a defaulted `error.html`.

I'm no longer receiving a 403 or 404 when accessing the route directly, but it is simply redirecting to my landing page and NOT to the requested route.  I'm not sure if it is a NextJS-specific problem because this supposedly should work with react routing, more to come...
