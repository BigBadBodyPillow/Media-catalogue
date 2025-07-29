import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from '../SearchResults';

describe('SearchResults Component', () => {
  const mockResults = [
    {
      id: 1,
      trackName: 'Track 1',
      albumName: 'Album 1',
      coverImage: 'image1.jpg',
      releaseDate: '2024/01/01',
    },
    {
      id: 2,
      trackName: 'Track 2',
      albumName: 'Album 2',
      coverImage: 'image2.jpg',
      releaseDate: '2025/07/29',
    },
  ];
  const mockIsFavourite = vi.fn();
  const mockAddFavourite = vi.fn();
  const mockRemoveFavourite = vi.fn();

  it('should render without errors', () => {
    render(
      <SearchResults
        results={mockResults}
        error={null}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
  });

  //check if error works
  it('should display an error message when an error prop is passed', () => {
    render(
      <SearchResults
        results={[]}
        error="an error message that would probably be about the jwt token"
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
    expect(
      screen.getByText(
        'an error message that would probably be about the jwt token'
      )
    ).toBeInTheDocument();
  });

  //   check if search results are displayed
  it('should render the list of results', () => {
    render(
      <SearchResults
        results={mockResults}
        error={null}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
    expect(screen.getByText('Track 1')).toBeInTheDocument();
    expect(screen.getByText('Track 2')).toBeInTheDocument();
  });
});
