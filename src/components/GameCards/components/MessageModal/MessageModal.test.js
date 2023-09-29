/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, act } from '@testing-library/react';
import 'jest-localstorage-mock';
import MessageModal from './index.js';

test('renders the modal with message', async () => {
    
  const playerName = 'John';
  const onCloseGame = jest.fn();
  const onRestartGame = jest.fn();
  const show = true;
  localStorage.setItem('userName', playerName);
  await act(async () => {
    render(
      <MessageModal
        onCloseGame={onCloseGame}
        onRestartGame={onRestartGame}
        show={show}
      />
    );
  });

  expect(screen.getByRole('dialog')).toBeInTheDocument();

  expect(screen.getByText('You won the memory game!')).toBeInTheDocument();

  expect(screen.getByText('Restart Game')).toBeInTheDocument();
  expect(screen.getByText('Close Game')).toBeInTheDocument();
});
  
test('calls the onCloseGame callback when "Close Game" button is clicked', () => {
  const onCloseGame = jest.fn();
  const onRestartGame = jest.fn();
  const show = true;

  render(
    <MessageModal
      onCloseGame={onCloseGame}
      onRestartGame={onRestartGame}
      show={show}
    />
  );

  fireEvent.click(screen.getByText('Close Game'));

  expect(onCloseGame).toHaveBeenCalled();
});

test('calls the onRestartGame callback when "Restart Game" button is clicked', () => {
  const onCloseGame = jest.fn();
  const onRestartGame = jest.fn();
  const show = true;

  render(
    <MessageModal
      onCloseGame={onCloseGame}
      onRestartGame={onRestartGame}
      show={show}
    />
  );

  fireEvent.click(screen.getByText('Restart Game'));

  expect(onRestartGame).toHaveBeenCalled();
});
  