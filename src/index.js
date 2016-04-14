import Balloon from '@economist/component-balloon';
import Button from '@economist/component-link-button';
import React from 'react';

function renderListContent(contentList, level = 0) {
  level++;

  return contentList.map((contentItem, i) => {
    let listcontentItem = '';
    let classNameList = [ 'accordion__link' ];
    const commonProps = {
      href: contentItem.href,
      key: `${ i }`,
    };
    if (contentItem.hr) {
      return <hr key={commonProps.key} className="accordion__hr" />;
    }

    // Spread icon props.
    if (contentItem.icon || (contentItem.children && contentItem.children.length > 0)) {
      commonProps.icon = {
        ...contentItem.icon,
        size: '28px',
      };
    }
    // Add the arrow down for expandable links
    if (contentItem.children && contentItem.children.length > 0) {
      commonProps.icon.icon = 'down';
    }

    if (contentItem.i13nModel) {
      commonProps.i13nModel = contentItem.i13nModel; // eslint-disable-line id-match
    }

    if (contentItem.target) {
      commonProps.target = contentItem.target;
    }

    if (contentItem.target === '_blank') {
      classNameList.push('accordion__link--external');
    }
    // By default we want the component unstyled.
    // But overridable via prop.
    commonProps.unstyled = contentItem.unstyled !== false;

    if (contentItem.className) {
      classNameList = classNameList.concat(contentItem.className.split(' '));
    }
    commonProps.className = `${ classNameList.join(' ') }`;

    listcontentItem = (
      <Button {...commonProps}>
        {contentItem.title}
      </Button>
    );
    // Recursive part
    if (contentItem.children && contentItem.children.length > 0) {
      listcontentItem = (
        <Balloon
          unstyled
          prefix="accordion-expander"
          className={`accordion__level${ level }`}
          key={`level${ level }-${ i }`}
          trigger={listcontentItem}
        >
        <ul className="list">
          {renderListContent(contentItem.children, level)}
        </ul>
      </Balloon>
    );
    }
    return (
      <li className="list__item" key={`level${ level }-${ i }`}>
        {listcontentItem}
      </li>
    );
  });
}

export default function Accordion({ list }) {
  return (
    <ul className="list accordion">
      {renderListContent(list)}
    </ul>
  );
}

const accordionMenuEntry = React.PropTypes.shape({
  title: React.PropTypes.string,
  href: React.PropTypes.string,
  target: React.PropTypes.string,
  unstyled: React.PropTypes.bool,
});
if (process.env.NODE_ENV !== 'production') {
  Accordion.propTypes = {
    list: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        title: React.PropTypes.string,
        href: React.PropTypes.string,
        target: React.PropTypes.string,
        unstyled: React.PropTypes.bool,
        children: React.PropTypes.arrayOf(accordionMenuEntry),
      }),
    ),
  };
}
