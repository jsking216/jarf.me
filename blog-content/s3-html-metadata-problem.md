---
title: s3 HTML metadata problem
slug: s3-html-metadata-problem
date: "09-12-2020"
---

After finally solving all of my refresh/routing problems between s3, cloudfront and react, the s3 bucket changed its handling of `.html` files when their extension isn't provided.  The "fix" is to update the Content-Type metadata post-upload.  Since I'm using [buddy.works](https://buddy.works) for my CI pipeline, I added a new AWS CLI step to the pipeline with the following commands
```
aws s3 cp \
	  --exclude "*" \
      --include "blog/*" \
      --content-type="text/html"  \
      --metadata-directive="REPLACE" \
      --recursive
      
aws s3 cp \
	  --exclude "*" \
      --include "404" \
      --content-type="text/html"  \
      --metadata-directive="REPLACE" \
      --recursive
```