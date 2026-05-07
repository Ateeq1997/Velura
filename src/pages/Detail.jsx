import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { useCart } from '../context/CartContext'
import { products, StarRating } from '../data/products'

export default function Detail() {
  const location = useLocation()
  const passedProduct = location.state?.product
  const product = passedProduct || products[0]

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Black')
  const [activeTab, setActiveTab] = useState('description')
  const [toast, setToast] = useState(null)
  const { addToCart } = useCart()

  const images = [product.img, ...products.slice(1, 4).map(p => p.img)]
  const related = products.filter(p => p.id !== product.id).slice(0, 4)

  const colorMap = { Black: '#222', White: '#f0f0f0', Red: '#e74c3c', Blue: '#3498db', Green: '#27ae60' }

  const handleAddToCart = () => {
    addToCart({ ...product, qty })
    setToast(`"${product.name}" added to cart!`)
  }

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="page-header-nova">
        <h1>Product Detail</h1>
        <div className="breadcrumb-nova">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fa fa-angle-right"></i></span>
          <Link to="/shop">Shop</Link>
          <span className="sep"><i className="fa fa-angle-right"></i></span>
          <span className="current">{product.name}</span>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          {/* Images */}
          <div className="col-lg-5 pb-5">
            <div className="main-product-img mb-3">
              <img src={images[activeImg]} alt={product.name} />
            </div>
            <div className="thumb-list">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`thumb-img${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="col-lg-7 pb-5">
            <div className="pl-lg-4">
              <div className="d-flex align-items-center mb-2" style={{ gap: 10 }}>
                <span style={{ background: 'rgba(238,77,45,0.1)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px' }}>
                  {product.category?.toUpperCase()}
                </span>
                {discount > 0 && (
                  <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px' }}>
                    -{discount}% OFF
                  </span>
                )}
              </div>

              <h2 className="font-weight-bold mb-2" style={{ color: '#1a1a2e' }}>{product.name}</h2>

              <div className="d-flex align-items-center mb-3" style={{ gap: 10 }}>
                <StarRating rating={product.rating} />
                <span style={{ fontSize: '0.82rem', color: '#888' }}>({product.rating} · 48 reviews)</span>
              </div>

              <div className="d-flex align-items-baseline mb-4" style={{ gap: 12 }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>${product.price}</span>
                <span style={{ fontSize: '1.1rem', color: '#bbb', textDecoration: 'line-through' }}>${product.oldPrice}</span>
                <span style={{ fontSize: '0.82rem', color: '#27ae60', fontWeight: 600 }}>You save ${product.oldPrice - product.price}</span>
              </div>

              <p style={{ color: '#666', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Experience the perfect blend of comfort and style with this premium piece from our curated collection.
                Crafted with high-quality materials and designed for modern life — whether you're dressing up or keeping it casual.
              </p>

              {/* Size */}
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Size: <strong>{selectedSize}</strong></span>
                  <a href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Size Guide <i className="fa fa-ruler ml-1"></i></a>
                </div>
                <div className="d-flex flex-wrap" style={{ gap: '8px' }}>
                  {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                    <button key={s} className={`size-btn${selectedSize === s ? ' active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-4">
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', display: 'block', marginBottom: '10px' }}>
                  Color: <strong>{selectedColor}</strong>
                </span>
                <div className="d-flex" style={{ gap: '10px' }}>
                  {Object.entries(colorMap).map(([name, hex]) => (
                    <button
                      key={name}
                      title={name}
                      className={`color-swatch${selectedColor === name ? ' active' : ''}`}
                      style={{ background: hex }}
                      onClick={() => setSelectedColor(name)}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Qty + Add to cart */}
              <div className="d-flex align-items-center mb-4 flex-wrap" style={{ gap: '12px' }}>
                <div className="qty-control">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}><i className="fa fa-minus"></i></button>
                  <input type="number" value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
                  <button onClick={() => setQty(qty + 1)}><i className="fa fa-plus"></i></button>
                </div>
                <button className="btn btn-primary px-4 py-3 font-weight-bold flex-fill" style={{ borderRadius: '12px', fontSize: '0.95rem' }} onClick={handleAddToCart}>
                  <i className="fas fa-shopping-cart mr-2"></i>Add to Cart
                </button>
                <Link to="/checkout" className="btn btn-dark px-4 py-3 font-weight-bold" style={{ borderRadius: '12px', fontSize: '0.95rem' }}>
                  Buy Now
                </Link>
              </div>

              {/* Meta */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', fontSize: '0.85rem', color: '#888' }}>
                <div className="mb-1"><strong style={{ color: '#444' }}>SKU:</strong> SN-00{product.id}</div>
                <div className="mb-1"><strong style={{ color: '#444' }}>Category:</strong> {product.category}</div>
                <div className="mb-2"><strong style={{ color: '#444' }}>Tags:</strong> fashion, trending, {product.color?.toLowerCase()}</div>
                <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                  <strong style={{ color: '#444' }}>Share:</strong>
                  {[['fab fa-facebook-f', 'Facebook'], ['fab fa-twitter', 'Twitter'], ['fab fa-instagram', 'Instagram'], ['fab fa-pinterest', 'Pinterest']].map(([icon, label]) => (
                    <a key={label} href="#" title={label} style={{ width: 30, height: 30, borderRadius: '50%', background: '#f5f5f5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '12px', textDecoration: 'none' }}>
                      <i className={icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="row px-xl-5 mt-2">
          <div className="col-12">
            <div className="card" style={{ border: '1px solid #f0f0f0', borderRadius: 16, overflow: 'hidden' }}>
              <div className="card-header bg-white" style={{ borderBottom: '1px solid #f0f0f0', padding: '0 24px' }}>
                <ul className="nav product-tabs">
                  {[
                    { key: 'description', label: 'Description' },
                    { key: 'info', label: 'Additional Info' },
                    { key: 'reviews', label: 'Reviews (3)' },
                  ].map(t => (
                    <li key={t.key} className="nav-item">
                      <button
                        className={`nav-link${activeTab === t.key ? ' active' : ''}`}
                        onClick={() => setActiveTab(t.key)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px' }}
                      >{t.label}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-body" style={{ padding: '28px 32px' }}>
                {activeTab === 'description' && (
                  <div>
                    <p style={{ color: '#666', lineHeight: '1.8', fontSize: '0.92rem' }}>
                      Experience the perfect blend of comfort and style with this premium {product.name}. Made from carefully selected materials, 
                      this piece delivers exceptional quality and lasting wear. The design is versatile enough for both casual outings and 
                      semi-formal settings, making it a must-have addition to your wardrobe.
                    </p>
                    <ul style={{ color: '#666', fontSize: '0.9rem', lineHeight: '2' }}>
                      <li>100% premium quality fabric</li>
                      <li>Available in multiple colors and sizes</li>
                      <li>Machine washable — easy care</li>
                      <li>Designed for a comfortable, tailored fit</li>
                      <li>Ethically manufactured</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'info' && (
                  <table className="table table-bordered" style={{ fontSize: '0.88rem' }}>
                    <tbody>
                      {[['Material', 'Cotton Blend'], ['Color', selectedColor], ['Size', selectedSize], ['Care', 'Machine wash cold'], ['Origin', 'Ethically made'], ['SKU', `SN-00${product.id}`]].map(([k, v]) => (
                        <tr key={k}><th style={{ background: '#f9f9f9', width: '200px' }}>{k}</th><td>{v}</td></tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {activeTab === 'reviews' && (
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="font-weight-bold mb-4">Customer Reviews</h6>
                      {[
                        { name: 'Sarah M.', date: 'March 15, 2026', rating: 5, text: 'Absolutely love this piece! Great quality and fits perfectly. Will definitely order again.' },
                        { name: 'James T.', date: 'Feb 28, 2026', rating: 4, text: 'Very nice product. Shipping was fast and packaging was excellent.' },
                        { name: 'Priya S.', date: 'Jan 10, 2026', rating: 5, text: 'Stunning! Exactly as described. The color is even better in person.' },
                      ].map((r, i) => (
                        <div key={i} className="media mb-4">
                          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1rem', marginRight: 14, flexShrink: 0 }}>
                            {r.name[0]}
                          </div>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <h6 className="font-weight-bold mb-0" style={{ fontSize: '0.9rem' }}>{r.name}</h6>
                              <small className="text-muted">{r.date}</small>
                            </div>
                            <StarRating rating={r.rating} />
                            <p className="mt-1" style={{ fontSize: '0.87rem', color: '#666' }}>{r.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-6">
                      <h6 className="font-weight-bold mb-4">Leave a Review</h6>
                      <form onSubmit={e => e.preventDefault()}>
                        <div className="form-group">
                          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your Name</label>
                          <input type="text" className="form-control form-control-nova" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your Email</label>
                          <input type="email" className="form-control form-control-nova" placeholder="email@example.com" />
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your Review</label>
                          <textarea className="form-control form-control-nova" rows="4" placeholder="Share your experience..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary px-4" style={{ borderRadius: '10px' }}>Submit Review</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="row px-xl-5 mt-5">
          <div className="col-12">
            <div className="section-heading text-left" style={{ textAlign: 'left' }}>
              <h2 style={{ textAlign: 'left' }}>Related Products</h2>
            </div>
            <div className="row mt-3">
              {related.map(p => (
                <div key={p.id} className="col-lg-3 col-md-6 pb-4">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <Footer />
    </>
  )
}
