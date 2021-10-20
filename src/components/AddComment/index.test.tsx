import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddComment from '.';

const sendComment = jest.fn();

test('renders AddComment Component', () => {
  render(<AddComment handleClick={sendComment} />);
  expect(screen.getAllByRole('button')[0]).toHaveTextContent('Send');
});

test('AddComment will call sendComment function once click `Send` button', () => {
  render(<AddComment handleClick={sendComment} />);
  fireEvent.click(screen.getAllByRole('button')[0]);
  expect(sendComment).toBeCalled();
});
