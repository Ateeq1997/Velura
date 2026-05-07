import { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { cartItems, cartTotal } = useCart()
  const shipping = cartItems.length > 0 ? 8.99 : 0
  const total = cartTotal + shipping
  const [placed, setPlaced] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setPlaced(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="page-header-nova">
        <h1>Checkout</h1>
        <div className="breadcrumb-nova">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fa fa-angle-right"></i></span>
          <Link to="/cart">Cart</Link>
          <span className="sep"><i className="fa fa-angle-right"></i></span>
          <span className="current">Checkout</span>
        </div>
      </div>

      {placed ? (
        <div className="container-fluid py-5 text-center">
          <div style={{ maxWidth: '480px', margin: '40px auto', padding: '48px 32px', background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(46,204,113,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '2.5rem', color: '#2ecc71' }}></i>
            </div>
            <h3 className="font-weight-bold mb-2" style={{ color: '#1a1a2e' }}>Order Placed!</h3>
            <p className="text-muted mb-4">Thank you for shopping with VELURA. Your order is confirmed and will be delivered soon.</p>
            <Link to="/shop" className="btn btn-primary px-5 py-3 font-weight-bold" style={{ borderRadius: '12px' }}>
              Continue Shopping <i className="fa fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-5">
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                <div className="checkout-card">
                  <h5 className="font-weight-bold mb-4"><i className="fa fa-user mr-2 text-primary"></i>Billing Details</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input type="text" className="form-control form-control-nova" required placeholder="John" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input type="text" className="form-control form-control-nova" required placeholder="Doe" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" className="form-control form-control-nova" required placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" className="form-control form-control-nova" required placeholder="+1 234 567 8900" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Address *</label>
                        <input type="text" className="form-control form-control-nova" required placeholder="Street address" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>City *</label>
                        <input type="text" className="form-control form-control-nova" required placeholder="New York" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>ZIP Code *</label>
                        <input type="text" className="form-control form-control-nova" required placeholder="10001" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Country *</label>
                        <select className="form-control form-control-nova" required>
                          <option value="">Select Country</option>
                          {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Pakistan'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="checkout-card mt-4">
                  <h5 className="font-weight-bold mb-4"><i className="fa fa-credit-card mr-2 text-primary"></i>Payment Method</h5>
                  <div className="row">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: 'fa-credit-card' },
                      { id: 'paypal', label: 'PayPal', icon: 'fab fa-paypal' },
                      { id: 'cod', label: 'Cash on Delivery', icon: 'fa-money-bill-wave' },
                    ].map(m => (
                      <div key={m.id} className="col-md-4 mb-3">
                        <label style={{ border: '2px solid #f0f0f0', borderRadius: 12, padding: '16px', cursor: 'pointer', display: 'block', textAlign: 'center', transition: 'all 0.2s' }}>
                          <input type="radio" name="payment" value={m.id} defaultChecked={m.id === 'card'} style={{ display: 'none' }} />
                          <i className={`${m.icon.startsWith('fab') ? m.icon : 'fa ' + m.icon} fa-2x mb-2 d-block text-primary`}></i>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#444' }}>{m.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="form-group mt-2">
                    <label>Card Number</label>
                    <input type="text" className="form-control form-control-nova" placeholder="**** **** **** ****" maxLength="19" />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" className="form-control form-control-nova" placeholder="MM / YY" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" className="form-control form-control-nova" placeholder="***" maxLength="3" />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block py-3 font-weight-bold mt-4" style={{ borderRadius: '12px', fontSize: '1rem' }}>
                  <i className="fa fa-lock mr-2"></i>Place Order — ${total.toFixed(2)}
                </button>
              </form>
            </div>

            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="order-summary-card">
                <h5 className="font-weight-bold mb-4">Order Summary</h5>
                {cartItems.length === 0 ? (
                  <p className="text-muted" style={{ fontSize: '0.88rem' }}>Your cart is empty. <Link to="/shop" style={{ color: 'var(--primary)' }}>Add items</Link></p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="d-flex align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <img src={item.img} alt={item.name} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, marginRight: 12 }} />
                      <div className="flex-fill">
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333', lineHeight: '1.3' }}>{item.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#aaa' }}>Qty: {item.qty || 1}</div>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                        ${(Number(item.price) * (item.qty || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
                <div className="d-flex justify-content-between mb-2 pt-2" style={{ fontSize: '0.88rem' }}>
                  <span style={{ color: '#888' }}>Subtotal</span>
                  <span className="font-weight-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3" style={{ fontSize: '0.88rem', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ color: '#888' }}>Shipping</span>
                  <span className="font-weight-bold">${shipping.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Total</span>
                  <span className="font-weight-bold" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
