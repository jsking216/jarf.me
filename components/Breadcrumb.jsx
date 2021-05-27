import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Breadcrumb = (props) => {
  const { breadcrumbs } = props;

  return (
    <ul className="breadcrumb">
      {breadcrumbs.map((breadcrumb) => (
        <li key={breadcrumb.href}>
          {/* eslint-disable-next-line max-len */}
          {(!breadcrumb.isActive) ? <Link href={breadcrumb.href}>{breadcrumb.name}</Link> : (breadcrumb.name) }
        </li>
      ))}
    </ul>
  );
};

Breadcrumb.propTypes = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}).isRequired).isRequired;

export default Breadcrumb;
