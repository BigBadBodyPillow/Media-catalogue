//css
import '../styles/ResultItem.css';

export default function ResultItem({
  item,
  isFavourite,
  addFavourite,
  removeFavourite,
}) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="result card h-100">
        <div className="result-head">
          <img
            src={item.coverImage}
            className="result-image"
            draggable={false}
            alt={item.albumName}
          />
          <div className="result-card-body">
            <h6 className="result-card-title text-truncate">
              {item.trackName !== '' ? item.trackName : item.albumName}
            </h6>
            <p className="result-artist-name text-truncate">
              {item.artistName}
            </p>
            <p className="card-text">
              <small className="">
                {item.releaseDate
                  ? new Date(item.releaseDate).toLocaleDateString()
                  : ''}
              </small>
            </p>
          </div>
        </div>
        <div className="result-button-container">
          <a
            href={item.collectionViewUrl}
            className="view-on-itunes btn btn-sm"
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
          >
            View on iTunes
          </a>
          {isFavourite(item) ? (
            <button
              className="remove-favourite btn btn-sm ms-2"
              onClick={() => removeFavourite(item)}
            >
              Remove Favourite
            </button>
          ) : (
            <button
              className="add-favourite btn btn-sm ms-2"
              onClick={() => addFavourite(item)}
            >
              Add to Favourites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
