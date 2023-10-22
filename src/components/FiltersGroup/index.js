import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    details,
    ratingsList,
    getActiveCategoryId,
    getActiveRatingId,
    clearFilters,
  } = props
  const {activeCategoryId, activeRatingId} = details

  const changeCategory = event => {
    const name = event.target.textContent
    console.log(name)
    const obj = categoryOptions.filter(each => each.name === name)
    const {categoryId} = obj[0]
    getActiveCategoryId(categoryId)
  }

  const changeRating = event => {
    const ratingId = event.target.alt.slice(-1)
    getActiveRatingId(ratingId)
  }

  return (
    <div className="filters-group-container">
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">
        {categoryOptions.map(each => (
          <li
            key={each.categoryId}
            id={each.categoryId}
            className="category-item"
          >
            <p
              onClick={changeCategory}
              className={
                activeCategoryId === each.categoryId
                  ? 'category-name active'
                  : 'category-name'
              }
            >
              {each.name}
            </p>
          </li>
        ))}
      </ul>
      <div>
        <h1 className="rating-heading">Rating</h1>
        <ul className="ratings-list">
          {ratingsList.map(each => (
            <li key={each.ratingId} className="rating-item">
              <img
                onClick={changeRating}
                src={each.imageUrl}
                alt={`rating ${each.ratingId}`}
                className="rating-image"
              />
              <p
                className={
                  activeRatingId === each.ratingId ? 'and-up active' : 'and-up'
                }
              >
                &amp; up
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={clearFilters}
        type="button"
        className="clear-filters-btn"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
