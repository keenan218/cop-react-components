// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import Link from '../Link';

// Styles
import './BackLink.scss';

export const DEFAULT_CLASS = 'govuk-back-link';
export const DEFAULT_TEXT = 'Back';
export const BackLink = ({
  children,
  href,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  return (
    <Link {...attrs} href={href} classBlock={classBlock} classModifiers={classModifiers} className={className}>{children}</Link>
  );
};

BackLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

BackLink.defaultProps = {
  children: DEFAULT_TEXT,
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default BackLink;
