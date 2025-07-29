import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultItem from '../ResultItem';

//  toLocaleDateString was being annoying, i tried explicitly setting the locale in the component
const toLocaleDateStringMock = vi.fn(() => '22/33/4444');
global.Date.prototype.toLocaleDateString = toLocaleDateStringMock;

describe('ResultItem Component', () => {
  const mockItem = {
    id: 1,
    trackName: 'Test Track',
    albumName: 'Test Album',
    artistName: 'Test Artist',
    coverImage: 'test.jpg',
    releaseDate: '22/33/4444',
    collectionViewUrl: 'https://example.com',
  };
  const mockIsFavourite = vi.fn();
  const mockAddFavourite = vi.fn();
  const mockRemoveFavourite = vi.fn();

  it('should render without errors', () => {
    render(
      <ResultItem
        item={mockItem}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
  });

  //   check if item gets displayed correctly
  it('should display the track name, artist name, and release date', () => {
    render(
      <ResultItem
        item={mockItem}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('22/33/4444')).toBeInTheDocument();
  });

  //   check if favourite buttun is displayed when item is not favourite
  it('should display "Add to Favourites" button when the item is not a favourite', () => {
    mockIsFavourite.mockReturnValue(false);
    render(
      <ResultItem
        item={mockItem}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
    expect(screen.getByText('Add to Favourites')).toBeInTheDocument();
  });

  //   check if favourite buttun is not displayed when item is a favourite
  it('should display "Remove Favourite" button when the item is a favourite', () => {
    mockIsFavourite.mockReturnValue(true);
    render(
      <ResultItem
        item={mockItem}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
    expect(screen.getByText('Remove Favourite')).toBeInTheDocument();
  });

  //check if favourite button works
  it('should call addFavourite when "Add to Favourites" button is clicked', () => {
    mockIsFavourite.mockReturnValue(false);
    render(
      <ResultItem
        item={mockItem}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
    const addButton = screen.getByText('Add to Favourites');
    fireEvent.click(addButton);
    expect(mockAddFavourite).toHaveBeenCalledWith(mockItem);
  });

  //check if remove favourite button works
  it('should call removeFavourite when "Remove Favourite" button is clicked', () => {
    mockIsFavourite.mockReturnValue(true);
    render(
      <ResultItem
        item={mockItem}
        isFavourite={mockIsFavourite}
        addFavourite={mockAddFavourite}
        removeFavourite={mockRemoveFavourite}
      />
    );
    const removeButton = screen.getByText('Remove Favourite');
    fireEvent.click(removeButton);
    expect(mockRemoveFavourite).toHaveBeenCalledWith(mockItem);
  });
});
