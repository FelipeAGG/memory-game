/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameCard from './index.js';

const defaultProps = {
  data: {
    uuid: 1,
    name: "test",
    image: "image/test.jpg"
  }, 
  isFlipped: false, 
  onClick: jest.fn(),
}

test('render game card and click on it', () => {
  render(<GameCard { ...defaultProps } />);
  const linkElement = screen.getByTestId("test");
  fireEvent.click(linkElement);
  expect(defaultProps.onClick).toHaveBeenCalled();
});
