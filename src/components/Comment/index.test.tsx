import React from 'react';
import { render, screen } from '@testing-library/react';
import { Comment } from '../../AppSlice';
import CommentCard from '.';

const comment: Comment = {
  id: 1,
  postId: 1,
  name: 'comment test name 1',
  body: 'comment test body 1',
  email: 'comment@mail.com'
};

test('renders CommentCard component with comment data', () => {
  render(<CommentCard comment={comment} />);
  expect(screen.getByText(/comment test name 1/i)).toBeInTheDocument();
  expect(screen.getByText(/comment test body 1/i)).toBeInTheDocument();
  expect(screen.getByText(/comment@mail.com/i)).toBeInTheDocument();
});
