/* eslint-disable jest/valid-expect */
// import { render, screen } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import { shallow, mount, render } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
// eslint-disable-next-line no-unused-vars
import sinon from 'sinon';

// MOCK STORE
import configureStore from 'redux-mock-store';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
// React y Components
import React from 'react';
import App from './App';
import Intro from './components/Intro/Intro.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Recipe from './components/Recipe/Recipe.js';
import Form from './components/Form/Form.js';

// SETTINGS
Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());
React.useLayoutEffect = React.useEffect;

// START TESTS
describe('Client', () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    const initialState = {
      list: [{ title: 'Title', summary: 'Summary' }],
      diets: ['gluten free'],
      single: { title: 'Title', summary: 'Summary' },
    };
    store = mockStore(initialState);
  });

  describe('<App /> component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App />);
    });

    it('has four routes, each one with a component', () => {
      expect(wrapper.find(Route)).to.have.lengthOf(4);
      expect(wrapper.find(Route).first()).to.have.prop('component');
      expect(wrapper.find(Route).first()).to.not.have.prop('render');
    });
  });

  describe('<Intro /> component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Intro />);
    });

    it('has one <h1> tag element', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find('h1')).to.have.lengthOf(1);
      // eslint-disable-next-line jest/valid-expect
    });

    it('has "Food title" as <h1>', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find('#title')).to.have.html(
        '<h1 id="title">Food app</h1>'
      );
    });

    it('has a link to the main page', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find(Link)).to.have.lengthOf(1);
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find(Link).first()).to.have.prop('to');
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find(Link).first()).to.have.prop('to').deep.equal('/main');
    });
  });

  describe('<SearchBar /> component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(
        <Provider store={store}>
          <BrowserRouter>
            <SearchBar />
          </BrowserRouter>
        </Provider>
      );
      // wrapper = shallow(<SearchBar recipes={[]} diets={[]} />);
    });

    it('has one <form> element with class: form-container', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find('form')).to.have.lengthOf(1);
      expect(wrapper.find('form').hasClass('form-container')).to.equal(true);
      // eslint-disable-next-line jest/valid-expect
    });

    it('has the correct title in the first <div> with class="content"', () => {
      expect(wrapper.find('h2').html()).to.equal("Foodie's paradise");
      expect(wrapper.find('h2').parent().is('div')).to.equal(true);
      // expect(wrapper.find('div').at(0)).to.equal('h2');
    });

    // it('has a <button> of class dietBtn', () => {
    //   expect(wrapper.find('.dietBtn')).parent('button');
    // });
  });

  describe('<Recipe /> component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(
        <Provider store={store}>
          <BrowserRouter>
            <Recipe />
          </BrowserRouter>
        </Provider>
      );
    });

    it('has a proper title', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find('h1')).to.have.lengthOf(1);
      expect(wrapper.find('h1').hasClass('title')).to.equal(true);
      // eslint-disable-next-line jest/valid-expect
    });
  });

  describe('<Form /> component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(
        <Provider store={store}>
          <BrowserRouter>
            <Form />
          </BrowserRouter>
        </Provider>
      );
    });
    it('has six <label> elements', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find('label')).to.have.lengthOf(6);
      // eslint-disable-next-line jest/valid-expect
    });

    it('has one mapped <input type=checkbox>', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find('input[type=checkbox]')).to.have.lengthOf(1);
      // eslint-disable-next-line jest/valid-expect
    });

    it('has two <textarea>', () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find('textarea')).to.have.lengthOf(2);
      // eslint-disable-next-line jest/valid-expect
    });
  });
});
