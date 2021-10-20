import React from 'react';
import PropTypes from 'prop-types';
import './Details.scss';

const Details = ({
  children,
  summary,
  textClass
}) => {
  return <details className="govuk-details">
    <summary className="govuk-details__summary">{summary}</summary>
    <div className={ textClass ?? 'govuk-details__text' }>
      {children}
    </div>
  </details>;
};

Details.propTypes = {
  summary: PropTypes.string.isRequired
};

export default Details;
