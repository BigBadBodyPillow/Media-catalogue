import { useState, useEffect } from 'react';

//components
import SearchBar from './components/SearchBar.jsx';
import FavouritesList from './components/FavouritesList.jsx';
import SearchResults from './components/SearchResults.jsx';

//css
import './App.css';

function App() {
  const [jwtToken, setJwtToken] = useState(
    localStorage.getItem('jwtToken') || ''
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenLoading, setTokenLoading] = useState(false);
  const [showFavourites, setShowFavourites] = useState(true);
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favourites')) || [];
    } catch {
      return [];
    }
  });

  // if no jwt, get one
  useEffect(() => {
    if (!jwtToken) {
      fetchToken();
    }
  }, [jwtToken]);

  // generate token and add to localstorage
  const fetchToken = async () => {
    setTokenLoading(true);
    try {
      const res = await fetch('/api/token');
      const data = await res.json();

      setJwtToken(data.token);

      localStorage.setItem('jwtToken', data.token);
    } catch (err) {
      setError('Failed to get API token');
    } finally {
      setTokenLoading(false);
    }
  };

  // clear token and generate a new one
  const handleTokenExpiration = () => {
    localStorage.removeItem('jwtToken');
    setJwtToken('');
    fetchToken();
  };

  // store favouirites in local storage. not nessisary but i feel like
  // theres no point in having favourite if it cant be saved.
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  //fetch results from api
  const handleSearch = async () => {
    if (!searchTerm.trim() || !jwtToken) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const params = new URLSearchParams({
        term: searchTerm,
        media: mediaType,
      });
      const res = await fetch(`/api/search?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // if token is expired
      if (res.status === 403) {
        handleTokenExpiration();
        // setError('dasds');
        throw new Error('Token expired. Please try searching again.');
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Search failed');
      }
      const data = await res.json();
      setResults(data.results || []);
      // console.log('results', data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      // console.log('loading', loading);
    }
  };

  const isFavourite = (item) => favourites.some((fav) => fav.id === item.id);

  const addFavourite = (item) => {
    if (!isFavourite(item)) {
      setFavourites([...favourites, item]);
    }
  };

  const removeFavourite = (item) => {
    setFavourites(favourites.filter((fav) => fav.id !== item.id));
  };

  // todo maybe idk
  //
  //  ==change background==
  //
  // i like the dark veil but theres something about it
  // if i look at it for too long it makes be feel "ehh" about it.
  //
  // but if i use a simple grid background with linear gradients it looks simply good but not great.
  //
  // a background that i do love is the particles one that i used as the stars in space for
  // this project https://github.com/BigBadBodyPillow/event-manager
  // but i dont want to use the same thing  again

  return (
    <div className="app-container">
      <main className="container">
        <h1 className="mb-4 text-center">iTunes Media Catalogue</h1>
        {tokenLoading && (
          <div className="alert alert-info text-center">
            Getting API token...
          </div>
        )}

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mediaType={mediaType}
          setMediaType={setMediaType}
          onSearch={handleSearch}
          loading={loading}
          jwtToken={jwtToken}
          tokenLoading={tokenLoading}
        />

        <FavouritesList
          favourites={favourites}
          showFavourites={showFavourites}
          setShowFavourites={setShowFavourites}
          removeFavourite={removeFavourite}
        />

        <SearchResults
          results={results}
          error={error}
          isFavourite={isFavourite}
          addFavourite={addFavourite}
          removeFavourite={removeFavourite}
        />
      </main>
    </div>
  );
}

export default App;
