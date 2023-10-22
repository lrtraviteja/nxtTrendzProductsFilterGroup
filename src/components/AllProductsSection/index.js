import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const initialState = {
  productsList: [],
  isLoading: false,
  activeOptionId: sortbyOptions[0].optionId,
  activeCategoryId: '',
  activeRatingId: '',
  searchInput: '',
}

class AllProductsSection extends Component {
  state = initialState

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activeCategoryId,
      activeRatingId,
      searchInput,
    } = this.state
    // eslint-disable-next-line no-undef
    const apiUrl = `https://aps.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&rating=${activeRatingId}&title_search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.renderFailureView()
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        className="failure-img"
        alt="products failure"
      />
      <h1 className="no-products-heading">Oops! Something Went Wrong</h1>
      <p className="no-products-description">
        We are having some trouble processing your request.Please try again
      </p>
    </div>
  )

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  searchQuery = value => {
    this.setState({searchInput: value}, this.getProducts)
  }

  getActiveCategoryId = id => {
    this.setState({activeCategoryId: id}, this.getProducts)
  }

  getActiveRatingId = id => {
    this.setState({activeRatingId: id}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(initialState, this.getProducts)
  }

  renderNoProductsView = () => (
    <div className="no-products-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        className="no-products-img"
        alt="no products"
      />
      <h1 className="no-products-heading">No Products Found</h1>
      <p className="no-products-description">
        We could not find any products. Try other filters.
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    if (productsList.length === 0) {
      return this.renderNoProductsView()
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searchQuery={this.searchQuery}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          details={this.state}
          getActiveCategoryId={this.getActiveCategoryId}
          getActiveRatingId={this.getActiveRatingId}
          clearFilters={this.clearFilters}
        />

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
