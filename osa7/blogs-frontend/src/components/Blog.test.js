import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import Togglable from './Togglable';
import AdderForm from './AdderForm';
import { testBlog, testUser } from '../forTests/variables';

describe('<Blog>', () => {
  let testComponent;
  const mockHandler = jest.fn();

  beforeEach(() => {
    testComponent = render(
      <Blog
        blog={testBlog}
        user= {testUser}
        likeThis= {mockHandler}/>
    );
  });

  test('renders title and author, but not url and likes', () => {
    expect(testComponent.container).toHaveTextContent('The blog blog');
    expect(testComponent.container).toHaveTextContent('Mr tester');
    expect(testComponent.container).not.toHaveTextContent('10');
    expect(testComponent.container).not.toHaveTextContent('this is url');
  });

  test('renders url and likes too when show all is cliked', () => {
    const button = testComponent.getByText('show');
    fireEvent.click(button);
    expect(testComponent.container).toHaveTextContent('this is url');
    expect(testComponent.container).toHaveTextContent('10');
  });

  test('if like is clicked twice, both clicked are registered', () => {
    // lets get it to show first
    const buttons = testComponent.getAllByText('show');
    const button = buttons[0];
    fireEvent.click(button);
    const button2 = testComponent.getByText('Like');
    fireEvent.click(button2);
    fireEvent.click(button2);
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable
        button1label="show..."
        button2label="hide...">
        <div className="testDiv" />
      </Togglable>
    );
  });

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });
});
