import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
//import Togglable from './Togglable';
//import AdderForm from './AdderForm';
import { testBlog, testUser } from '../forTests/variables';
/*
export const testBlog = {
  title: 'The blog blog',
  author: 'Mr tester',
  url: 'this is url',
  user: 'dkpofskpdfsa',
  id: 'dkdfsjkfjdksf',
  likes: 0
};
expect.not.stringContaining(string)
*/
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
/*
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
/*
test.only('<AdderForm /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn();

  const component = render(
    <AdderForm addNewBlog={createNote} />
  );

  const input = component.container.querySelector('#inputTitle');
  const form = component.container.querySelector('form');

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  });
  fireEvent.submit(form);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' );
});
*/
