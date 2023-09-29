/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-localstorage-mock';
import GameCard from './index.js';

test('renders a card with a question mark image when not flipped', () => {
  const data = {
    uuid: 'unique-id-1',
    image: 'image-url',
    name: 'Card Name',
  };
  const onClick = jest.fn();

  render(<GameCard data={data} isFlipped={false} onClick={onClick} />);

  expect(screen.getByTestId(data.name)).toHaveClass('card-container');

  expect(screen.getByAltText(data.name)).toHaveAttribute('src', 'questionMark.svg');
});

test('renders a card with the image when flipped', () => {
  const data = {
    uuid: 'unique-id-2',
    image: 'image-url',
    name: 'Card Name 2',
  };
  const onClick = jest.fn();

  render(<GameCard data={data} isFlipped={true} onClick={onClick} />);

  expect(screen.getByTestId(data.name)).toHaveClass('card-container flipped');

  expect(screen.getByAltText(data.name)).toHaveAttribute('src', data.image);
});

test('calls the onClick callback when the card is clicked', () => {
  const data = {
    uuid: 'unique-id-3',
    image: 'image-url',
    name: 'Card Name 3',
  };
  const onClick = jest.fn();

  render(<GameCard data={data} isFlipped={false} onClick={onClick} />);

  fireEvent.click(screen.getByTestId(data.name));

  expect(onClick).toHaveBeenCalledWith(data);
});
