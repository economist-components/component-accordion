import 'babel-polyfill';
import React from 'react';
import { Panel } from '../src';
import chai from 'chai';
import chaiSpies from 'chai-spies';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiSpies).use(chaiEnzyme()).should();
describe('Panel', () => {

  it('renders a React element', () => {
    React.isValidElement(<Panel />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let panel = null;
    beforeEach(() => {
      rendered = mount(
        <Panel idSuffix="foo" />
      );
      panel = rendered.find('.accordion__panel');
    });

    it('should have class=accordion__panel', () => {
      panel.should.have.attr('class', 'accordion__panel');
    });

    it('should accept className prop to append to class attr', () => {
      mount(<Panel className="foobar" />).find('.accordion__panel')
        .should.have.attr('class', 'accordion__panel foobar');
    });

    it('has accordion__panel--collapsed class if `collapse` prop is present', () => {
      mount(<Panel collapse />).find('.accordion__panel')
        .should.have.className('accordion__panel--collapsed');
    });

    describe('Panel Header', () => {
      let panelHeader = null;
      beforeEach(() => {
        panelHeader = panel.find('.accordion__panel-header');
      });

      it('has id of accordion__panel-header-{idSuffix}', () => {
        panelHeader.should.have.attr('id', 'accordion__panel-header-foo');
      });

      it('generates unique id if idSuffix is omitted', () => {
        mount(<Panel />).find('.accordion__panel-header')
          .should.have.attr('id').that.matches(/^accordion__panel-header-(\d+)$/);
      });

      it('has role=tab', () => {
        panelHeader.should.have.attr('role', 'tab');
      });

      it('has tabIndex=0', () => {
        panelHeader.should.have.attr('tabIndex', '0');
      });

      it('has aria-controls=accordion__panel-container-{idSuffix}', () => {
        panelHeader.should.have.attr('aria-controls', 'accordion__panel-container-foo');
      });

      it('has aria-selected=true', () => {
        panelHeader.should.have.attr('aria-selected', 'true');
      });

      it('has aria-selected=false if `collapse` prop is present', () => {
        mount(<Panel collapse />).find('.accordion__panel-header')
          .should.have.attr('aria-selected', 'false');
      });

      it('passes the onClick handler prop on', () => {
        const onClick = chai.spy();
        mount(<Panel onClick={onClick} />).find('.accordion__panel-header')
          .should.have.prop('onClick', onClick);
      });

      it('passes the onFocus handler prop on', () => {
        const onFocus = chai.spy();
        mount(<Panel onFocus={onFocus} />).find('.accordion__panel-header')
          .should.have.prop('onFocus', onFocus);
      });

      it('uses `header` prop to render children', () => {
        mount(<Panel header={<div className="header" />} />).find('.accordion__panel-header')
          .should.have.exactly(1).descendants('.header');
      });

    });

    describe('Panel Container', () => {
      let panelContainer = null;
      beforeEach(() => {
        panelContainer = panel.find('.accordion__panel-container');
      });

      it('has id of accordion__panel-header-{idSuffix}', () => {
        panelContainer.should.have.attr('id', 'accordion__panel-container-foo');
      });

      it('generates unique id if idSuffix is omitted', () => {
        mount(<Panel />).find('.accordion__panel-container')
          .should.have.attr('id').that.matches(/^accordion__panel-container-(\d+)$/);
      });

      it('has role=tabpanel', () => {
        panelContainer.should.have.attr('role', 'tabpanel');
      });

      it('has aria-labelledby=accordion__panel-header-{idSuffix}', () => {
        panelContainer.should.have.attr('aria-labelledby', 'accordion__panel-header-foo');
      });

      it('has aria-hidden=false', () => {
        panelContainer.should.have.attr('aria-hidden', 'false');
      });

      it('has aria-hidden=true if `collapse` prop is present', () => {
        mount(<Panel collapse />).find('.accordion__panel-container')
          .should.have.attr('aria-hidden', 'true');
      });

      it('passes children along', () => {
        mount(<Panel><div className="child" /></Panel>).find('.accordion__panel-container')
          .should.have.exactly(1).descendants('.child');
      });

    });

  });

});
