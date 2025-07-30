import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { expect, vi } from 'vitest';

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

    //trigger search
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    // results
    await waitFor(() => {
      expect(screen.getByText('Test Track')).toBeInTheDocument();
    });
  });

  // error if token fetch fails
  it('should set error message when fetchToken fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Fetch error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Failed to get API token')).toBeInTheDocument();
    });
  });

  //  when token is expired
  it('should handle token expiration when API returns 403', async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ token: 'mock-jwt-token' }),
        ok: true,
      })
      .mockResolvedValueOnce({ status: 403 })
      // mock new token
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ token: 'new-mock-jwt-token' }),
        ok: true,
      });

    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText('Getting API token...')
      ).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    //trigger search
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText('Token expired. Please try searching again.')
      ).toBeInTheDocument();
    });
  });

  it('should handle non-OK response from API', async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ token: 'mock-jwt-token' }),
        ok: true,
      })
      .mockResolvedValueOnce({
        status: 500,
        ok: false,
        json: () => Promise.resolve({ error: 'Server error' }),
      });

    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText('Getting API token...')
      ).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    //trigger search
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  // when results are null
  it('should set results to empty array when data.results is null', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ results: null }),
      ok: true,
    });

    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    //trigger search
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    //if no results then results should be empty
    await waitFor(() => {
      expect(screen.queryByText('Test Track')).not.toBeInTheDocument();
    });
  });

  // when search term is empty
  it('should not perform search when searchTerm is empty', () => {
    localStorage.setItem('jwtToken', 'valid-token');

    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    // search
    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(searchButton);

    // expect(mockFetch).not.toHaveBeenCalled();
    expect(screen.queryByText('Test Track')).not.toBeInTheDocument();
  });

  //when no token
  it('should not perform search when jwtToken is missing', () => {
    localStorage.removeItem('jwtToken');
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    //trigger search
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(screen.queryByText('Test Track')).not.toBeInTheDocument();
  });

  // check if adding to favourite works
  it('should add item to favourite list when item is added to favourites', async () => {
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
                releaseDate: '2025/07/29',
              },
            ],
          }),
        ok: true,
      });

    render(<App />);

    // Wait for token to be fetched
    await waitFor(() => {
      expect(
        screen.queryByText('Getting API token...')
      ).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    //trigger search
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    fireEvent.click(searchButton);

    // Wait for search results to appear
    await waitFor(() => {
      expect(screen.getByText('Test Track')).toBeInTheDocument();
    });

    // check if theres only 1 instance after a search (when not added to favourite)
    const trackElements = screen.getAllByText('Test Track');
    expect(trackElements).toHaveLength(1);

    // add to favourite
    const addButton = screen.getByText('Add to Favourites');
    fireEvent.click(addButton);

    // after added there should be 2 instances (1 search result 1 in favocutre list)
    await waitFor(() => {
      const trackElements = screen.getAllByText('Test Track');
      expect(trackElements).toHaveLength(2);
    });
  });

  // check if removeing favourite wwork
  it('should remove item from favourites when remove button is clicked', async () => {
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

                releaseDate: '2025/07/29',
              },
            ],
          }),
        ok: true,
      });

    render(<App />);

    // Wait for token to be fetched
    await waitFor(() => {
      expect(
        screen.queryByText('Getting API token...')
      ).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    //trigger search
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    fireEvent.click(searchButton);

    // Wait for search results to appear
    await waitFor(() => {
      expect(screen.getByText('Test Track')).toBeInTheDocument();
    });

    // check if theres only 1 instance after a search (when not added to favourite)
    const trackElements = screen.getAllByText('Test Track');
    expect(trackElements).toHaveLength(1);

    // add to favourite
    const addButton = screen.getByText('Add to Favourites');
    fireEvent.click(addButton);

    // after added there should be 2 instances (1 search result 1 in favocutre list)
    await waitFor(() => {
      const trackElements = screen.getAllByText('Test Track');
      expect(trackElements).toHaveLength(2);
    });

    //remove from favourite
    const removeButton = screen.getByText('Remove Favourite');
    fireEvent.click(removeButton);

    // after removed from favourite there should be 1 instance
    await waitFor(() => {
      const trackElements = screen.getAllByText('Test Track');
      expect(trackElements).toHaveLength(1);
    });
  });

  //test initial state of favourites
  it('should set initial state of favourites to empty array', () => {
    // empty local storage
    const localStorageMock = {
      getItem: vi.fn((key) => {
        if (key === 'favourites') {
          return JSON.stringify([]);
        }
        return null;
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    render(<App />);

    // check if the favourites list is empty
    expect(screen.queryByText('No favourites yet.')).toBeInTheDocument();
  });

  //test favourite state if local storage is NOT empty
  it('favourite state should be set to local storage if not empty', () => {
    const mockFavourites = [
      {
        id: 1,
        trackName: 'Test Track',
        albumName: 'Test Album',
        releaseDate: '2025/07/29',
      },
    ];

    // mock local storage with item in favourite
    const localStorageMock = {
      getItem: vi.fn((key) => {
        if (key === 'favourites') {
          return JSON.stringify(mockFavourites);
        }
        return null;
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    render(<App />);

    // should appear in favourutite list
    expect(screen.getByText('Test Track')).toBeInTheDocument();
  });
});
