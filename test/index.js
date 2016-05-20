import 'babel-polyfill';
import React from 'react';
import { Accordion, Panel } from '../src';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiEnzyme()).should();
describe('Accordion', () => {

  it('renders a React element', () => {
    React.isValidElement(<Accordion />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let accordion = null;
    beforeEach(() => {
      rendered = mount(
        <Accordion />
      );
      accordion = rendered.find('.accordion');
    });

    it('has role=tablist', () => {
      accordion.should.have.attr('role', 'tablist');
    });

    it('has aria-live=polite', () => {
      accordion.should.have.attr('aria-live', 'polite');
    });

    it('has class=accordion', () => {
      accordion.should.have.attr('class', 'accordion');
    });

    it('accepts className prop to append to class attr', () => {
      mount(<Accordion className="foobar" />).find('.accordion')
        .should.have.attr('class', 'accordion foobar');
    });

    it('passes children along', () => {
      mount(<Accordion><div className="child" /></Accordion>).find('.accordion')
        .should.have.exactly(1).descendants('.child');
    });

    describe('Panel children', () => {
      let panelA = null;
      let panelB = null;
      beforeEach(() => {
        rendered = mount(
          <Accordion>
            <Panel idSuffix="a" />
            <Panel idSuffix="b" />
            <div className="child" />
          </Accordion>
        );
        accordion = rendered.find('.accordion');
        panelA = accordion.childAt(0);
        panelB = accordion.childAt(1);
      });

      it('enhances panels by auto collapsing all panels', () => {
        panelA.should.have.prop('collapse', true);
        panelB.should.have.prop('collapse', true);
      });

      it('enhances panels by setting an onClick handler', () => {
        panelA.should.have.prop('onClick').that.is.a('function');
        panelB.should.have.prop('onClick').that.is.a('function');
      });

      it('will keep panel open if given `activePanel` prop', () => {
        accordion = mount(
          <Accordion activePanel={0}>
            <Panel idSuffix="a" />
            <Panel idSuffix="b" />
            <div className="child" />
          </Accordion>
        ).find('.accordion');
        accordion.childAt(0).should.have.prop('collapse', false);
        accordion.childAt(1).should.have.prop('collapse', true);

        accordion = mount(
          <Accordion activePanel={1}>
            <Panel idSuffix="a" />
            <Panel idSuffix="b" />
          </Accordion>
        ).find('.accordion');
        accordion.childAt(0).should.have.prop('collapse', true);
        accordion.childAt(1).should.have.prop('collapse', false);
      });

      it('will change collapse state when `activePanel` prop changes', () => {
        class SamplePropChange extends React.Component {
          render() {
            return (
              <Accordion activePanel={(this.state || {}).activePanel || 0}>
                <Panel idSuffix="a" />
                <Panel idSuffix="b" />
                <div className="child" />
              </Accordion>
            );
          }
        }
        const wrapper = mount(<SamplePropChange />);
        accordion = wrapper.find('.accordion');
        accordion.childAt(0).should.have.prop('collapse', false);
        accordion.childAt(1).should.have.prop('collapse', true);

        wrapper.setState({ activePanel: 1 });

        accordion.childAt(0).should.have.prop('collapse', true);
        accordion.childAt(1).should.have.prop('collapse', false);
      });

      describe('clicking on panel', () => {

        it('sets panel `collapse` to false', () => {
          panelA.find('.accordion__panel-header').simulate('click');
          panelA.should.have.prop('collapse', false);
        });

        it('sets other panels `collapse` to true', () => {
          panelA.find('.accordion__panel-header').simulate('click');
          panelA.should.have.prop('collapse', false);
          panelB.should.have.prop('collapse', true);

          panelB.find('.accordion__panel-header').simulate('click');
          panelB.should.have.prop('collapse', false);
          panelA.should.have.prop('collapse', true);
        });

        it('closes panel if clicked on once expanded', () => {
          panelA.find('.accordion__panel-header').simulate('click');
          panelA.should.have.prop('collapse', false);
          panelB.should.have.prop('collapse', true);

          panelA.find('.accordion__panel-header').simulate('click');
          panelA.should.have.prop('collapse', true);
          panelB.should.have.prop('collapse', true);

          panelB.find('.accordion__panel-header').simulate('click');
          panelA.should.have.prop('collapse', true);
          panelB.should.have.prop('collapse', false);

          panelB.find('.accordion__panel-header').simulate('click');
          panelA.should.have.prop('collapse', true);
          panelB.should.have.prop('collapse', true);
        });

      });

    });

  });

});
