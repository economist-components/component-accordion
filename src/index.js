import React from 'react';
import Panel from './panel';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Accordion extends React.Component {

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      activePanel: props.activePanel,
    };
  }

  componentWillReceiveProps({ activePanel }) {
    if (activePanel) {
      this.setState({
        activePanel,
      });
    }
  }

  setActivePanel(activePanel) {
    if (this.state.activePanel === activePanel) {
      activePanel = null;
    }
    this.setState({
      activePanel,
    });
  }

  enhancePanel(panel, index) {
    if (!panel || panel.type !== Panel) {
      return panel;
    }
    const setActivePanel = this.setActivePanel.bind(this, index);
    const props = {
      header: panel.props.header,
      children: panel.props.children,
      onClick: setActivePanel,
      collapse: this.state.activePanel !== index,
      key: index,
    };
    return (<Panel {...props} />);
  }

  render() {
    const { className, children } = this.props;
    return (
      <div className={classNames('accordion', className)} role="tablist" aria-live="polite">
        {Array.isArray(children) ? children.map(this.enhancePanel, this) : children}
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Accordion.propTypes = {
    activePanel: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
  };
}

export { Panel, Accordion };
