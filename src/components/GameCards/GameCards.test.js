/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import GameCards from './index.js';

fetchMock.enableMocks();

const mockApiResponse = {
  entries: [
    { fields: { image: { url: 'url1', title: 'title1' } } },
    { fields: { image: { url: 'url2', title: 'title2' } } },
  ],
};

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renderiza GameCards y maneja la respuesta del API', async () => {
  fetchMock.mockResponse(JSON.stringify(mockApiResponse));

  await act(async () => {
    render(<GameCards resetGame={() => {}} />);
  });

  expect(fetchMock).toHaveBeenCalledWith(
    'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=5'
  );

  const imageElement1 = screen.queryByText('Reset Game');
  const imageElement2 = screen.queryByText('Exit Game');

  expect(imageElement1).toBeDefined();
  expect(imageElement2).toBeDefined();
});
