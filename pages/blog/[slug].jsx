import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import fs from 'fs';
import matter from 'gray-matter';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import unified from 'unified';
import markdown from 'remark-parse';
import { Container } from 'react-bootstrap';
import {
  metas, links, htmlAttributes, baseUrl,
} from '../../seo/meta';
import { getBlogFiles } from '../../util/blog-utils';
import BlogDetails from '../../components/BlogDetails';

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
        content: `jarf.me | Joshua King's Blog - ${blog.title}}`,
      },
      {
        name: 'description',
        content: `jarf.me | Joshua King's Blog - ${blog.title}`,
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${baseUrl}/images/profilepic.webp` },
      {
        property: 'og:url',
        content: `${baseUrl}/${slug}`,
      },
      { property: 'og:title', content: `jarf.me | Joshua King's Blog - ${blog.title}` },
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
    <Container fluid id="page">
      <Helmet
        html={htmlAttributes}
        title={`jarf.me | Joshua King's Blog - ${blog.title}`}
        meta={pageMetas()}
        link={pageLinks()}
      />
      <BlogDetails blog={blog} />
    </Container>
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
  const files = getBlogFiles();
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
