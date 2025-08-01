import { useState } from 'react';

//css
import '../styles/SearchBar.css';

// for select box (value is used for the search api)
const MEDIA_TYPES = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movie' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'music', label: 'Music' },
  { value: 'audiobook', label: 'Audiobook' },
  { value: 'shortFilm', label: 'Short Film' },
  { value: 'tvShow', label: 'TV Show' },
  { value: 'software', label: 'Software' },
  { value: 'ebook', label: 'eBook' },
];

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  mediaType,
  setMediaType,
  onSearch,
  loading,
  jwtToken,
  tokenLoading,
}) {
  return (
    <section className="search-container">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          disabled={!jwtToken || tokenLoading}
        />
        <select
          className="form-select"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          disabled={!jwtToken || tokenLoading}
          aria-label="Select media type for search"
        >
          {MEDIA_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <button
          className="btn"
          type="button"
          onClick={onSearch}
          disabled={loading || !jwtToken || tokenLoading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </section>
  );
}
