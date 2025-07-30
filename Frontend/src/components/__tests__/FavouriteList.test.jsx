import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavouritesList from '../FavouritesList';

// coverage test says the class toggle is not tested, but it is obviously working(the svg fill changes)
describe('FavouritesList Component', () => {
  const mockFavourites = [
    {
      id: 1,
      trackName: 'Track 1',
      albumName: 'Album 1',
      coverImage: 'image1.jpg',
    },
    {
      id: 2,
      trackName: 'Track 2',
      albumName: 'Album 2',
      coverImage: 'image2.jpg',
    },
  ];
  const mockRemoveFavourite = vi.fn();
  const mockSetShowFavourites = vi.fn();

  it('should render without errors', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        showFavourites={true}
        setShowFavourites={mockSetShowFavourites}
        removeFavourite={mockRemoveFavourite}
      />
    );
  });

  //   empty favourite list
  it('should display "No favourites yet" message when favourites list is empty', () => {
    render(
      <FavouritesList
        favourites={[]}
        showFavourites={true}
        setShowFavourites={mockSetShowFavourites}
        removeFavourite={mockRemoveFavourite}
      />
    );
    expect(screen.getByText('No favourites yet.')).toBeInTheDocument();
  });

  // with favourites
  it('should render the list of favourites', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        showFavourites={true}
        setShowFavourites={mockSetShowFavourites}
        removeFavourite={mockRemoveFavourite}
      />
    );
    expect(screen.getByText('Track 1')).toBeInTheDocument();
    expect(screen.getByText('Track 2')).toBeInTheDocument();
  });

  // remove the item when remove button is clicked
  it('should call removeFavourite when the remove button is clicked', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        showFavourites={true}
        setShowFavourites={mockSetShowFavourites}
        removeFavourite={mockRemoveFavourite}
      />
    );

    // first button is to toggle the list open and closed, 2nd is the one that removes the first item
    const removeButton = screen.getAllByRole('button')[1];
    fireEvent.click(removeButton);
    expect(mockRemoveFavourite).toHaveBeenCalledWith(mockFavourites[0]);
  });

  //   check if collapsible works
  it('should call setShowFavourites when the toggle button is clicked', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        showFavourites={true}
        setShowFavourites={mockSetShowFavourites}
        removeFavourite={mockRemoveFavourite}
      />
    );

    // first button is the ones that opesn and closes the list
    const toggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleButton);

    // initial state is true, false means its closed
    expect(mockSetShowFavourites).toHaveBeenCalledWith(false);
  });

  // show album name if no trackanme
  it('should display albumName if trackName is not present', () => {
    const mockFavourites = [
      {
        id: 1,
        trackName: '',
        albumName: 'Album 1',
        coverImage: 'image1.jpg',
      },
    ];

    render(
      <FavouritesList
        favourites={mockFavourites}
        showFavourites={true}
        setShowFavourites={mockSetShowFavourites}
        removeFavourite={mockRemoveFavourite}
      />
    );

    expect(screen.getByText('Album 1')).toBeInTheDocument();
  });
});
