import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { StarRating } from '../data/products'
import Toast from './Toast'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCart()
  const [toast, setToast] = useState(null)
  const isWished = wishlistItems.some(i => i.id === product.id)

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

  const handleAddToCart = () => {
    addToCart(product)
    setToast(`"${product.name}" added to cart!`)
  }

  return (
    <>
      <div className="product-card-nova">
        <div className="product-img-wrapper">
          {discount > 0 && <span className="product-badge">-{discount}%</span>}
          <img src={product.img} alt={product.name} />
          <div className="product-overlay">
            <Link to={`/detail`} state={{ product }} className="overlay-btn" title="View Detail">
              <i className="fas fa-eye"></i>
            </Link>
            <button className="overlay-btn" title="Quick Add" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i>
            </button>
            <button
              className="overlay-btn"
              title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={() => toggleWishlist(product)}
            >
              <i className={`${isWished ? 'fas' : 'far'} fa-heart${isWished ? ' text-danger' : ''}`}></i>
            </button>
          </div>
        </div>
        <div className="product-body">
          <StarRating rating={product.rating} />
          <p className="product-name mt-1">{product.name}</p>
          <div className="product-price-row">
            <span className="price-new">${product.price}</span>
            <span className="price-old">${product.oldPrice}</span>
          </div>
        </div>
        <button className="btn btn-add-cart" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart mr-2"></i>Add to Cart
        </button>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  )
}
