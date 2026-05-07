import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart()
  const shipping = cartItems.length > 0 ? 8.99 : 0
  const total = cartTotal + shipping

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="page-header-nova">
        <h1>Shopping Cart</h1>
        <div className="breadcrumb-nova">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fa fa-angle-right"></i></span>
          <span className="current">Cart</span>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          {cartItems.length === 0 ? (
            <div className="col-12 text-center py-5">
              <div style={{ fontSize: '4rem', color: '#ddd', marginBottom: '24px' }}>
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h4 className="font-weight-bold mb-2" style={{ color: '#1a1a2e' }}>Your cart is empty</h4>
              <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/shop" className="btn btn-primary px-5 py-3 font-weight-bold" style={{ borderRadius: '12px', fontSize: '0.95rem' }}>
                <i className="fa fa-shopping-bag mr-2"></i>Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="col-lg-8">
                <div className="table-responsive cart-table mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: '60%' }}>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={item.img} alt={item.name} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 10, marginRight: 14 }} />
                              <div>
                                <h6 className="font-weight-bold mb-1" style={{ fontSize: '0.9rem', color: '#1a1a2e' }}>{item.name}</h6>
                                <p className="text-muted mb-0" style={{ fontSize: '0.78rem' }}>Category: {item.category}</p>
                              </div>
                            </div>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>${Number(item.price).toFixed(2)}</span>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <div className="qty-control">
                              <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)}><i className="fa fa-minus"></i></button>
                              <input type="number" value={item.qty || 1} onChange={e => updateQty(item.id, parseInt(e.target.value) || 1)} min="1" />
                              <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)}><i className="fa fa-plus"></i></button>
                            </div>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <span className="font-weight-bold" style={{ color: '#1a1a2e' }}>
                              ${(Number(item.price) * (item.qty || 1)).toFixed(2)}
                            </span>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '1.1rem', padding: '4px 8px' }}>
                              <i className="fa fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Link to="/shop" className="btn btn-outline-primary px-4" style={{ borderRadius: '10px' }}>
                    <i className="fa fa-arrow-left mr-2"></i>Continue Shopping
                  </Link>
                  <div className="input-group" style={{ maxWidth: '280px' }}>
                    <input type="text" className="form-control" placeholder="Coupon code" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #f0f0f0' }} />
                    <div className="input-group-append">
                      <button className="btn btn-primary" style={{ borderRadius: '0 10px 10px 0' }}>Apply</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="order-summary-card">
                  <h5 className="font-weight-bold mb-4">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-3 pb-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>Subtotal ({cartItems.length} items)</span>
                    <span className="font-weight-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 pb-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>Shipping</span>
                    <span className="font-weight-bold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="font-weight-bold" style={{ fontSize: '1.05rem' }}>Total</span>
                    <span className="font-weight-bold" style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>${total.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" className="btn btn-primary btn-block py-3 font-weight-bold" style={{ borderRadius: '12px', fontSize: '0.95rem' }}>
                    Proceed to Checkout <i className="fa fa-arrow-right ml-2"></i>
                  </Link>
                  <div className="text-center mt-3" style={{ fontSize: '0.78rem', color: '#aaa' }}>
                    <i className="fa fa-lock mr-1"></i>Secure encrypted checkout
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
