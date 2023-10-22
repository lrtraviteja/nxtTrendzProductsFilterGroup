import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const {sortbyOptions, activeOptionId, changeSortby, searchQuery} = props

  const onChangeSortby = event => {
    changeSortby(event.target.value)
  }

  const getChangedText = event => {
    if (event.key === 'Enter') {
      searchQuery(event.target.value.toLowerCase())
    }
  }

  return (
    <div className="products-header">
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onKeyDown={getChangedText}
        />
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="search-icon"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
