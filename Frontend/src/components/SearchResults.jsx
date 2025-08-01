import ResultItem from './ResultItem.jsx';

export default function SearchResults({
  results,
  error,
  isFavourite,
  addFavourite,
  removeFavourite,
}) {
  return (
    <section className="search-results-container col-md">
      {error && <div className="alert text-center">{error}</div>}
      <div className="row g-3 results-container">
        {results.map((item) => (
          <ResultItem
            key={item.id}
            item={item}
            isFavourite={isFavourite}
            addFavourite={addFavourite}
            removeFavourite={removeFavourite}
          />
        ))}
      </div>
    </section>
  );
}
