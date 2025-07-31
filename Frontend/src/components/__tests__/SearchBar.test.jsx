import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBar from '../SearchBar';

//check if the SearchBar component appears
describe('SearchBar Component', () => {
  it('should render the search input', () => {
    const mockProps = {
      searchTerm: '',
      setSearchTerm: vi.fn(),
      mediaType: 'all',
      setMediaType: vi.fn(),
      onSearch: vi.fn(),
      loading: false,
      jwtToken: 'mock-token',
      tokenLoading: false,
    };

    render(<SearchBar {...mockProps} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  // check if state updates when input changes
  it('should update the search term state when the input changes', () => {
    const setSearchTerm = vi.fn();
    const mockProps = {
      searchTerm: '',
      setSearchTerm,
      mediaType: 'all',
      setMediaType: vi.fn(),
      onSearch: vi.fn(),
      loading: false,
      jwtToken: 'mock-token',
      tokenLoading: false,
    };

    render(<SearchBar {...mockProps} />);

    //input text into search abr
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(setSearchTerm).toHaveBeenCalledWith('test');
  });

  // check if onSearch is called
  it('should call the onSearch function when the search button is clicked', () => {
    const onSearch = vi.fn();
    const mockProps = {
      searchTerm: '',
      setSearchTerm: vi.fn(),
      mediaType: 'all',
      setMediaType: vi.fn(),
      onSearch,
      loading: false,
      jwtToken: 'mock-token',
      tokenLoading: false,
    };

    render(<SearchBar {...mockProps} />);

    //trigger search
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalled();
  });
});
