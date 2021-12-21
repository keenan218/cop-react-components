// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import Markup from '../Markup';
import './Heading.scss';

const TAGS = { xl: 'h1', l: 'h1', m: 'h2', s: 'h3' };

const getProps = (size) => {
  const tagName = TAGS[size] || TAGS.l;
  const className = `govuk-heading-${size}`;
  if (size === 's') {
    return { tagName, className };
  }
  const captionClass = `govuk-caption-${size}`;
  return { tagName, className, captionClass };
};

const Heading = ({ children, size, caption, ...attrs }) => {
  const { tagName, className, captionClass } = getProps(size);
  return (
    <Markup {...attrs} tagName={tagName} className={className}>
      {caption && captionClass ? <span className={captionClass}>{caption}</span> : null}
      {children}
    </Markup>
  );
};

Heading.propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  caption: PropTypes.string
};

Heading.defaultProps = {
  size: 'l'
};

export const XLargeHeading = ({ children, caption, ...attrs }) => {
  return <Heading {...attrs} caption={caption} size="xl">{children}</Heading>;
};

export const LargeHeading = ({ children, caption, ...attrs }) => {
  return <Heading {...attrs} caption={caption} size="l">{children}</Heading>;
};

export const MediumHeading = ({ children, caption, ...attrs }) => {
  return <Heading {...attrs} caption={caption} size="m">{children}</Heading>;
};

export const SmallHeading = ({ children, caption, ...attrs }) => {
  // Note that the caption is ignored here as it is not applicable
  // for small headings.
  return <Heading {...attrs} size="s">{children}</Heading>;
};

export default Heading;
