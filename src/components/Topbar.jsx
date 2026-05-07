import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Topbar() {
  const { cartCount, wishlistCount } = useCart()

  return (
    <div className="topbar-wrapper">
      <div className="container-fluid">
        <div className="row py-2 px-xl-5 align-items-center">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center" style={{ gap: '16px' }}>
              <a href="#"><i className="fa fa-question-circle mr-1"></i>FAQs</a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <a href="#"><i className="fa fa-headset mr-1"></i>Help</a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <a href="#"><i className="fa fa-life-ring mr-1"></i>Support</a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="topbar-social d-inline-flex align-items-center" style={{ gap: '6px' }}>
              <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" title="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header row: logo + search + cart */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container-fluid">
          <div className="row align-items-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-flex">
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #ee4d2d, #ff7043)',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1.55rem',
                  padding: '4px 13px',
                  borderRadius: '8px',
                  letterSpacing: '1px',
                  boxShadow: '0 3px 12px rgba(238,77,45,0.4)',
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1,
                }}>V</span>
                <span style={{
                  fontWeight: 800,
                  fontSize: '1.55rem',
                  color: '#1a1a2e',
                  letterSpacing: '-0.5px',
                  fontFamily: "'Poppins', sans-serif",
                }}>ELURA</span>
              </Link>
            </div>
            <div className="col-lg-6 col-8">
              <div className="header-search-bar">
                <form onSubmit={e => e.preventDefault()}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search products, brands &amp; more…"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-4 d-flex justify-content-end align-items-center" style={{ gap: '10px' }}>
              <button className="cart-btn" title="Wishlist">
                <i className="fas fa-heart text-primary"></i>
                {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
              </button>
              <Link to="/cart" className="cart-btn" style={{ textDecoration: 'none' }} title="Cart">
                <i className="fas fa-shopping-cart text-primary"></i>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

