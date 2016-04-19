import 'babel-polyfill';
import Accordion from '../src';
import React from 'react';
import accordionData from '@economist/component-sections-card/lib/context';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import chai from 'chai';
chai.use(chaiEnzyme()).should();
describe('Accordion', () => {
  let testAccordionData = null;
  before(() => {
    testAccordionData = [
      {
        title: 'Sections',
        href: 'http://www.economist.com/sections',
        children: accordionData.sections,
      },
      {
        title: 'Blogs',
        href: 'http://www.economist.com/blogs',
        children: accordionData.blogs,
      },
      ...accordionData.media,
      {
        title: 'Print Edition',
        href: 'http://www.economist.com/printedition/',
      },
      {
        title: 'Products',
        href: 'http://www.economist.com/digital',
      },
      {
        title: 'Subscribe',
        href: 'https://subscriptions.economist.com/',
        target: '_blank',
        unstyled: false,
      },
    ];
  });

  it('renders a React element', () => {
    React.isValidElement(<Accordion list={testAccordionData} />).should.equal(true);
  });

  describe('Rendering', () => {
    it('should render the component', () => {
      const accordion = mount(<Accordion list={testAccordionData} />);
      const outerList = accordion.find('ul.list.accordion');
      const outerListChildren = outerList.children();
      outerListChildren.forEach((child) => {
        child.should.have.className('list__item');
      });
      const sectionsLi = outerListChildren.at(0);
      sectionsLi.find('.link-button__text').should.have.text('Sections');
      sectionsLi.find('.accordion-expander--shadow').find('a')
        .forEach((anchor, index) => {
          anchor.should.have.text(accordionData.sections[index].title);
        }
      );
      const blogsLi = outerListChildren.at(1);
      blogsLi.find('.link-button__text').should.have.text('Blogs');
      blogsLi.find('.accordion-expander--shadow').find('a')
        .forEach((anchor, index) => {
          anchor.should.have.text(accordionData.blogs[index].title);
        }
      );
      outerListChildren.at(2).find('a.link-button').should.have.text('Apps');
      outerListChildren.at(3).find('a.link-button').should.have.text('Audio');
      outerListChildren.at(4).find('a.link-button').should.have.text('Radio');
      outerListChildren.at(5).find('a.link-button').should.have.text('Video');
      outerListChildren.at(6).find('a.link-button').should.have.text('Films');
      outerListChildren.at(7).find('a.link-button').should.have.text('Print Edition');
      outerListChildren.at(8).find('a.link-button').should.have.text('Products');
      outerListChildren.at(9).find('a.link-button').should.have.text('Subscribe');
    });

    it('should hide/show the sub-lists', () => {
      const accordion = mount(<Accordion list={testAccordionData} />);
      const outerList = accordion.find('ul.list.accordion');
      const outerListChildren = outerList.children();
      const sectionsLi = outerListChildren.at(0);
      sectionsLi.should.have.exactly(1).descendants('.accordion-expander--not-visible');
      sectionsLi.find('a.link-button-icon--down').simulate('click');
      sectionsLi.should.have.exactly(1).descendants('.accordion-expander--visible');
    });

  });

});
