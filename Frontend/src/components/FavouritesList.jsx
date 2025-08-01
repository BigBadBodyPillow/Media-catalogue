import React from 'react';

// icon
import BinIcon from '../assets/BinIcon.jsx';
import Favourite from '../assets/Bookmark.jsx';

//css
import '../styles/FavouritesList.css';

export default function FavouritesList({
  favourites,
  showFavourites,
  setShowFavourites,
  removeFavourite,
}) {
  return (
    <section className="favourites-container">
      {/* okay bootstrap is kinda nices but  it makes the html look too messy in my opinion */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Favourites</h5>

          {/* opened/closed classes is to change the svg fill when its opened */}
          <button
            className={`btn btn-sm favourite-toggle-button ${
              showFavourites ? 'opened' : 'closed'
            }`}
            onClick={() => setShowFavourites(!showFavourites)}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#favouritesCollapse"
            aria-label={`${showFavourites ? 'close' : 'open'} favourites list `}
            aria-expanded="false"
            aria-controls="favouritesCollapse"
          >
            <Favourite />
            {/* {showFavourites ? 'close' : 'open'} */}
            {/* {showFavourites ? 'x' : '+'} */}
            {/* {showFavourites ? '-' : '+'} */}
          </button>
        </div>
        <div
          className={`collapse ${showFavourites ? 'show' : ''}`}
          id="favouritesCollapse"
        >
          <div className="card-body">
            {/* if there are no favourites show the alert */}
            {favourites.length === 0 ? (
              <div className="alert alert-secondary text-center">
                No favourites yet.
              </div>
            ) : (
              <ul className="list-group list-group-flush favourites-list">
                {favourites.map((item) => (
                  <li
                    className="favourite-item list-group-item d-flex align-items-center justify-content-between"
                    key={item.id}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.coverImage}
                        alt={item.albumName}
                        draggable="false"
                      />

                      <span className="text-truncate">
                        {/* not sure if there will be many cases but this was to solve a specific error with the lil peep documentory */}
                        {/* if there is no trackname then show the album name */}
                        {item.trackName !== ''
                          ? item.trackName
                          : item.albumName}
                      </span>
                    </div>

                    <button
                      className="btn btn-sm remove-button"
                      onClick={() => removeFavourite(item)}
                      aria-label="Remove from favourites"
                    >
                      <BinIcon />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
