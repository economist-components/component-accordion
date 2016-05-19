import 'babel-polyfill';
import Accordion from '../src';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import chai from 'chai';
chai.use(chaiEnzyme()).should();
describe('Accordion', () => {
  let props = {};
  before(() => {
    props = {
      list: [
        {
          title: 'Foo',
          href: '/foo',
          children: [
            {
              title: 'Bar',
              href: '/bar',
            },
          ],
        },
      ],
    };
  });

  it('renders a React element', () => {
    React.isValidElement(<Accordion {...props} />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let accordion = null;
    beforeEach(() => {
      rendered = mount(
        <Accordion {...props} />
      );
      accordion = rendered.find('.accordion');
    });

    it('should render the component', () => {
      accordion.should.have.exactly(1).descendants('.list__item--level-1');
      accordion.should.have.exactly(1).descendants('.list__item--level-2');
      accordion.find('.link-button__text').should.have.text('Foo');
      accordion.find('.accordion-expander--shadow').children().find('.accordion__link').should.have.text('Bar');
    });

    it('should hide/show the sub-lists', () => {
      accordion.find('.accordion-expander--not-visible').should.be.present();
      accordion.find('.accordion__link').at(0).simulate('click');
      accordion.find('.accordion-expander--visible').should.be.present();
      accordion.find('.accordion-expander--not-visible').should.not.be.present();
      accordion.find('.accordion__link').at(0).simulate('click');
      accordion.find('.accordion-expander--not-visible').should.be.present();
      accordion.find('.accordion-expander--visible').should.not.be.present();
    });

  });

});
