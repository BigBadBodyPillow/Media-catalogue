import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe('App Component', () => {
  beforeEach(() => {
    // reset
    vi.clearAllMocks();

    //localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('should display search results after a successful search', async () => {
    // for token
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ token: 'mock-jwt-token' }),
        ok: true,
      })

      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            results: [
              {
                id: 1,
                trackName: 'Test Track',
                artistName: 'Test Artist',
                collectionName: 'Test Album',
                releaseDate: '2025/07/29',
              },
            ],
          }),
        ok: true,
      });

    render(<App />);

    // token
    await waitFor(() => {
      expect(
        screen.queryByText('Getting API token...')
      ).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    // input
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    // results
    await waitFor(() => {
      expect(screen.getByText('Test Track')).toBeInTheDocument();
    });
  });
});
