import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { getFormattedDate } from '../util/blog-utils';
import Breadcrumb from './Breadcrumb';

const BlogDetails = (props) => {
  const { blog } = props;

  const breadcrumbs = [{
    name: 'Blog',
    href: '/blog/main',
    isActive: false,
  },
  {
    name: blog.slug,
    href: '#',
    isActive: true,
  }];

  return (
    <>
      <Row><Col><h1>{`${blog.title} (${getFormattedDate(blog.date)})`}</h1></Col></Row>
      <Row><Col><Breadcrumb breadcrumbs={breadcrumbs} /></Col></Row>
      {/* eslint-disable react/no-danger */}
      <Row><Col><section dangerouslySetInnerHTML={{ __html: blog.content }} /></Col></Row>
      <Row>
        <Col>
          <Link href="/blog/main"><a>Back to Index</a></Link>
        </Col>
      </Row>
    </>
  );
};

BlogDetails.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}).isRequired;

export default BlogDetails;
