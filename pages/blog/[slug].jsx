import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import unified from 'unified';
import markdown from 'remark-parse';
import {
  metas, links, htmlAttributes, baseUrl,
} from '../../seo/meta';

function BlogPostPage(props) {
  const {
    pageProps: {
      blog,
      slug,
    },
  } = props;

  const pageMetas = () => {
    const meta = [
      {
        property: 'og:description',
        content: `jarf.me | Joshua King's Blog - ${blog.pageTitle}}`,
      },
      {
        name: 'description',
        content: `jarf.me | Joshua King's Blog - ${blog.pageTitle}`,
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${baseUrl}/images/profilepic.jpg` },
      {
        property: 'og:url',
        content: `${baseUrl}/${slug}`,
      },
      { property: 'og:title', content: `jarf.me | Joshua King's Blog - ${blog.pageTitle}` },
    ];
    meta.concat(metas);
    return meta;
  };

  const pageLinks = () => {
    const link = [{ rel: 'canonical', href: `${baseUrl}/${slug}` }];
    link.concat(links);
    return link;
  };

  return (
    <div>
      <Helmet
        html={htmlAttributes}
        title={`jarf.me | Joshua King's Blog - ${blog.pageTitle}`}
        meta={pageMetas()}
        link={pageLinks()}
      />
      <h1>{`${blog.pageTitle}(${blog.date})`}</h1>
      {/* eslint-disable react/no-danger */}
      <section dangerouslySetInnerHTML={{ __html: blog.content }} />
      <Link href="/blog/main">
        <a>Back to Index</a>
      </Link>
    </div>
  );
}

// pass props to BlogPostPage component
export async function getStaticProps(context) {
  const { slug } = context.params;
  const path = `${process.cwd()}/blog-content/${slug}.md`;

  const rawContent = fs.readFileSync(path, {
    encoding: 'utf-8',
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
      slug,
    },
  };
}

export async function getStaticPaths() {
  const path = `${process.cwd()}/blog-content`;
  const files = fs.readdirSync(path, 'utf-8');

  const markdownFileNames = files
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => fn.replace('.md', ''));

  return {
    paths: markdownFileNames.map((fileName) => ({
      params: {
        slug: fileName,
      },
    })),
    fallback: false,
  };
}

BlogPostPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default BlogPostPage;
