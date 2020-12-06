---
title: enabling https on my s3 static site
slug: enabling-https-s3-static-site
date: "05-12-2020"
---

Back when I was working with routing issues, I generated a certificate in AWS Certificate Manager in order to start serving the bucket through HTTPS.  Unfortunately, the cert took longer than an hour to get beyond a pending/verifying state, so I wasn't able to continue forward at tha time.  Today I took the time to set it up and it was pretty simple:

- Generate a cert for your domain (in this case i set it to jarf.me and *.jarf.me)
- ![certificate summary](/images/cert-summary.png)
- Create a cloudfront distribution for the bucket
- ![cloudfront settings](/images/cloudfront-settings.png)
- Serve using the SSL cert from the cloudfront distribution
- ![cloudfront summary](/images/cloudfront-summary.png)