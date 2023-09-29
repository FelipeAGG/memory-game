import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App component with start screen', () => {
  render(<App />);

  expect(screen.getByText('Welcome to Memory Game')).toBeInTheDocument();

  expect(screen.getByText('Start Game')).toBeInTheDocument();

  expect(screen.queryByText('Hello,')).toBeNull();
});

test('starts the game when clicking "Start Game"', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Enter your name');
  fireEvent.change(input, { target: { value: 'John' } });

  const startGameButton = screen.getByText('Start Game');
  fireEvent.click(startGameButton);

  expect(screen.getByText('Hello, John!')).toBeInTheDocument();

  expect(screen.queryByText('Welcome to Memory Game')).toBeNull();
});

test('resets the game when clicking "Reset Game" again and press "Exit Game"', () => {
  render(<App />);

  const startGameButton = screen.getByText('Reset Game');
  fireEvent.click(startGameButton);

  expect(screen.getByText('Hello, John!')).toBeInTheDocument();

  const exitGameButton = screen.getByText('Exit Game');
  fireEvent.click(exitGameButton);

  expect(screen.getByText('Welcome to Memory Game')).toBeInTheDocument();
});
