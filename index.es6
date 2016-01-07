import React from 'react';
import List from '@economist/component-list';
import Button from '@economist/component-link-button';
import Balloon from '@economist/component-balloon';

export default class Accordion extends React.Component {

  static get propTypes(){
    return {
      list: React.PropTypes.array.isRequired,
    };
  }

  targetIfNeeded({ internal }) {
    if (internal === false) {
      return { target: '_blank' };
    }
    return {};
  }

  renderListContent(array, level) {
    level++;

    return array.map((item) => {
      let linkContents = item.text || item.title;
      let listItem = '';
      const commonProps = {
        href: item.href,
        key: `${item.title}-${item.href}`,
        unstyled: true,
      };
      // Spread icon props.
      if (item.icon || (item.children && item.children.length > 0)) {
        commonProps.icon = {
          ...item.icon,
          size: '28px',
        }
      }
      // Add the arrow down for expandable links
      if (item.children && item.children.length > 0) {
        commonProps.icon.icon = "down";
      }

      if (item.internal === false) {
        listItem = (
          <Button
            className="accordion__link accordion__link--external"
            {...commonProps}
            target="_blank"
          >
            {linkContents}
          </Button>
        );
      } else {
        listItem = (<Button className="accordion__link" {...commonProps}>
        {linkContents}
        </Button>);
      }
      // Recursive part
      if (item.children && item.children.length > 0) {
        listItem = (<Balloon
            prefix="accordionExpander"
            className={`accordion__level${level}`}
            unstyled
            key={`${item.title}-${item.href}-level${level}`}
          >
          {listItem}
          <List>
            {this.renderListContent(item.children, level)}
          </List>
        </Balloon>);
      }
      return listItem;
    });
  }

  render() {
    const context = this.props.list;
    const level = 0;
    return (
      <List className="accordion">
        {this.renderListContent(context, level)}
      </List>
    );
  }
}
