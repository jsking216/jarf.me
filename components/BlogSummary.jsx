import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Truncate from 'react-truncate-html';
import { getFormattedDate } from '../util/blog-utils';

const BlogSummary = (props) => {
  const { blog } = props;
  return (
    <div>
      <Link href={`/blog/${blog.slug}`}>
        <a>{`${blog.title} (${getFormattedDate(blog.date)})`}</a>
      </Link>
      <Truncate
        style={{ color: 'black' }}
        lines={2}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

BlogSummary.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}).isRequired;

export default BlogSummary;
