export default function FavouritesList({
  favourites,
  showFavourites,
  setShowFavourites,
  removeFavourite,
}) {
  return (
    <div className="favourites-container">
      {/* okay bootstrap is kinda nices but  it makes the html look too messy in my opinion */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Favourites</h5>
          <button
            className="btn btn-sm"
            onClick={() => setShowFavourites(!showFavourites)}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#favouritesCollapse"
            aria-expanded="false"
            aria-controls="favouritesCollapse"
          >
            {/* need icon i think */}
            {showFavourites ? 'close' : 'open'}
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
                      <img src={item.coverImage} alt={item.albumName} />
                      {/* if there is no albumname show the trackName */}
                      {/* not sure if there will be many cases but this was to solve a specific error with the lil peep documentory */}
                      <span className="text-truncate">
                        {item.albumName ? item.albumName : item.trackName}
                      </span>
                    </div>
                    <button
                      className="btn btn-sm"
                      onClick={() => removeFavourite(item)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
