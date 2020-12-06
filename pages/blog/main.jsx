import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import Truncate from 'react-truncate-html';
import fs from 'fs';
import matter from 'gray-matter';
import { v4 as uuid } from 'uuid';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import unified from 'unified';
import markdown from 'remark-parse';
import {
  metas, links, htmlAttributes, baseUrl,
} from '../../seo/meta';

function IndexPage(props) {
  const {
    pageProps: {
      blogs,
    },
  } = props;
  const pageMetas = () => {
    const meta = [
      {
        property: 'og:description',
        content: 'jarf.me | Joshua King\'s Blog - My personal place to talk about tech.',
      },
      {
        name: 'description',
        content: 'jarf.me | Joshua King\'s Blog - My personal place to talk about tech.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${baseUrl}/images/profilepic.jpg` },
      {
        property: 'og:url',
        content: `${baseUrl}/blog/main`,
      },
      { property: 'og:title', content: 'jarf.me | Joshua King\'s Blog' },
    ];
    meta.concat(metas);
    return meta;
  };

  const pageLinks = () => {
    const link = [{ rel: 'canonical', href: `${baseUrl}/blog/main` }];
    link.concat(links);
    return link;
  };

  return (
    <div>
      <h1>Rambling on tech</h1>
      <Helmet
        htmlAttributes={htmlAttributes}
        title={'jarf.me | Joshua King\'s Blog'}
        meta={pageMetas()}
        link={pageLinks()}
      />
      <ul>
        {blogs.map((blog) => (
          <div>
            <li key={blog.id}>
              <Link href={`/blog/${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
              <Truncate
                lines={2}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const pathPrefix = `${process.cwd()}/blog-content`;

  const files = fs.readdirSync(pathPrefix, 'utf-8');

  const blogs = files
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => {
      const path = `${pathPrefix}/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: 'utf-8',
      });
      const { data, content } = matter(rawContent);

      return { ...data, content, id: uuid() };
    })
    .sort((a, b) => {
      const sortableA = a.date.split('-').reverse().join('');
      const sortableB = b.date.split('-').reverse().join('');
      return sortableB - sortableA;
    });

  const formattedContent = await Promise.all(
    blogs.map(async (blog) => unified()
      .use(markdown)
      .use(highlight)
      .use(html)
      .process(blog.content)),
  );

  for (let i = 0; i < blogs.length; i += 1) {
    blogs[i].content = formattedContent[i].toString();
  }

  return {
    props: { blogs },
  };
}

IndexPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default IndexPage;
