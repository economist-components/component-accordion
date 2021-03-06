import React from 'react';
import uniqueId from 'lodash.uniqueid';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function Panel({
  className,
  header,
  collapse = false,
  children,
  onClick,
  onFocus,
  idSuffix = uniqueId(),
}) {
  const headerId = `accordion__panel-header-${ idSuffix }`;
  const containerId = `accordion__panel-container-${ idSuffix }`;
  return (
    <div className={classNames('accordion__panel', className, { 'accordion__panel--collapsed': collapse })}>
      <div
        id={headerId}
        className="accordion__panel-header"
        role="tab"
        tabIndex="0"
        onClick={onClick}
        onFocus={onFocus}
        aria-controls={containerId}
        aria-selected={collapse === false}
      >
        {header}
      </div>
      <div
        id={containerId}
        className={classNames('accordion__panel-container', { 'accordion__panel-container--collapsed': collapse })}
        role="tabpanel"
        aria-labelledby={headerId}
        aria-hidden={collapse}
      >
        {children}
      </div>
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Panel.propTypes = {
    idSuffix: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    header: PropTypes.node,
    children: PropTypes.node,
    collapse: PropTypes.bool,
  };
}
