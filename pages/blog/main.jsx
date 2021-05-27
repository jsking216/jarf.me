import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import unified from 'unified';
import markdown from 'remark-parse';
import { Col, Container, Row } from 'react-bootstrap';
import BlogSummary from '../../components/BlogSummary';
import {
  metas, links, htmlAttributes, baseUrl,
} from '../../seo/meta';
import { getBlogFiles, getBlogContentsFromFilesArray } from '../../util/blog-utils';

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
      { property: 'og:image', content: `${baseUrl}/images/profilepic.webp` },
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

  /* MAYBE: consider using the Accordion from React-bootstrap to
  load all post content instead of truncating and loading a different page
  */
  return (
    <Container fluid id="blog">
      <Helmet
        htmlAttributes={htmlAttributes}
        title={'jarf.me | Joshua King\'s Blog'}
        meta={pageMetas()}
        link={pageLinks()}
      />
      <Row><Col><h1>Rambling on tech</h1></Col></Row>
      {blogs.map((blog) => (
        <Row key={blog.id}>
          <Col>
            <BlogSummary blog={blog} />
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export async function getStaticProps() {
  const blogs = getBlogContentsFromFilesArray(getBlogFiles());
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
