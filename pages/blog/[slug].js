import React from "react";
import Helmet from 'react-helmet';
import { metas, links, htmlAttributes, baseUrl } from '../../seo/meta';

function BlogPostPage(props) {

  const pageTitle = props.blog.title;

  const pageMetas = () => {
    const meta = [
      {
        property: 'og:description',
        content: `jarf.me | Joshua King's Blog - ${pageTitle}}`,
      },
      {
        name: 'description',
        content: `jarf.me | Joshua King's Blog - ${pageTitle}`,
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${baseUrl}/images/profilepic.jpg` },
      {
        property: 'og:url',
        content: `${baseUrl}/${props.slug}`,
      },
      { property: 'og:title', content: `jarf.me | Joshua King's Blog - ${pageTitle}` },
    ];
    meta.concat(metas);
    return meta;
  };

  const pageLinks = () => {
    const link = [{ rel: 'canonical', href: `${baseUrl}/${props.slug}` }];
    link.concat(links);
    return link;
  }

  return (
    <div>
      <Helmet
        { ...htmlAttributes }
        title={`jarf.me | Joshua King's Blog - ${pageTitle}`}
        meta={pageMetas()}
        link={pageLinks()}
      />
      <h1>{props.blog.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: props.blog.content }}></section>
    </div>
  );
}

// pass props to BlogPostPage component
export async function getStaticProps(context) {
  const fs = require("fs");
  const html = require("remark-html");
  const highlight = require("remark-highlight.js");
  const unified = require("unified");
  const markdown = require("remark-parse");
  const matter = require("gray-matter");

  const slug = context.params.slug;
  const path = `${process.cwd()}/blog-content/${slug}.md`;

    const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const { data, content } = matter(rawContent);

  const result = await unified()
    .use(markdown)
    .use(highlight)
    .use(html)
    .process(content);

  return {
    props: {
      blog: {
        ...data,
        content: result.toString(),
      },
      slug
    },
  };
}

export async function getStaticPaths(context) {
  const fs = require("fs");

  const path = `${process.cwd()}/blog-content`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownFileNames = files
  .filter((fn) => fn.endsWith(".md"))
  .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPostPage;