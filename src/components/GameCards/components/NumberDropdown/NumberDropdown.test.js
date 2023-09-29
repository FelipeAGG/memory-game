/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NumberDropdown from './index.js';

test('renders the NumberDropdown component', () => {
  const setNumberCards = jest.fn();
  const numberCards = 5;

  const { getByText, getByTestId } = render(
    <NumberDropdown setNumberCards={setNumberCards} numberCards={numberCards} />
  );

  const dropdownToggle = getByText('Image Number: 5');
  expect(dropdownToggle).toBeInTheDocument();

  fireEvent.click(dropdownToggle);

  const optionTwo = getByText('2');
  const optionFive = getByText('5');

  expect(optionTwo).toBeInTheDocument();
  expect(optionFive).toBeInTheDocument();

  fireEvent.click(optionTwo);

  expect(setNumberCards).toHaveBeenCalledWith(2);
});
