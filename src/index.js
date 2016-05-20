import React from 'react';
import Panel from './panel';
import classNames from 'classnames';

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
    activePanel: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
  };
}

export { Panel, Accordion };
