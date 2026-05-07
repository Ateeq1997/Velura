import { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const features = [
  { icon: 'fa-medal', title: 'Premium Quality', desc: 'Handpicked styles that meet our strict quality standards.' },
  { icon: 'fa-shipping-fast', title: 'Free Shipping', desc: 'Complimentary delivery on all orders over $50.' },
  { icon: 'fa-exchange-alt', title: '30-Day Returns', desc: 'Easy hassle-free returns within 30 days of purchase.' },
  { icon: 'fa-headset', title: '24/7 Support', desc: 'Our team is always here to help you anytime.' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending')
  const [subEmail, setSubEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  const displayProducts = activeTab === 'trending' ? products : [...products].reverse()

  return (
    <>
      <Topbar />
      <Navbar showCarousel={true} />

      {/* Features */}
      <section className="container-fluid py-5">
        <div className="row px-xl-5 pb-3">
          {features.map((f, i) => (
            <div key={i} className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center feature-item mb-4">
                <div className="feature-icon">
                  <i className={`fa ${f.icon}`}></i>
                </div>
                <div>
                  <h6 className="font-weight-bold mb-1">{f.title}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-fluid pb-5">
        <div className="px-xl-5">
          <div className="section-heading">
            <h2>Shop by Category</h2>
            <p>Find exactly what you're looking for across our curated collections</p>
          </div>
          <div className="row">
            {categories.map(cat => (
              <div key={cat.id} className="col-lg-4 col-md-6">
                <Link to="/shop" className="text-decoration-none">
                  <div className="cat-card-nova">
                    <div className="cat-img">
                      <img src={cat.img} alt={cat.name} />
                    </div>
                    <div className="cat-body">
                      <h6 className="font-weight-bold mb-0" style={{ color: '#333' }}>{cat.name}</h6>
                      <span className="cat-count">{cat.count} items</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Banners */}
      <section className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-md-6 mb-4">
            <div className="offer-nova" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
              <img src="/img/offer-1.png" alt="Spring" className="offer-img" />
              <div className="offer-content">
                <span className="badge badge-pill" style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.72rem', padding: '6px 14px' }}>20% OFF ALL ORDERS</span>
                <h2 className="text-white font-weight-bold mt-3 mb-3">Spring<br />Collection</h2>
                <Link to="/shop" className="btn-hero" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                  Shop Now <i className="fa fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="offer-nova" style={{ background: 'linear-gradient(135deg, #0f3460 0%, #533483 100%)' }}>
              <img src="/img/offer-2.png" alt="Winter" className="offer-img" />
              <div className="offer-content">
                <span className="badge badge-pill" style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.72rem', padding: '6px 14px' }}>20% OFF ALL ORDERS</span>
                <h2 className="text-white font-weight-bold mt-3 mb-3">Winter<br />Collection</h2>
                <Link to="/shop" className="btn-hero" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                  Shop Now <i className="fa fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products with Tabs */}
      <section className="container-fluid pb-5">
        <div className="px-xl-5">
          <div className="section-heading">
            <h2>Our Products</h2>
            <p>Explore our most popular items loved by thousands of customers</p>
          </div>
          <div className="d-flex justify-content-center mb-4" style={{ gap: '8px' }}>
            {[
              { key: 'trending', label: 'Trending Now', icon: 'fa-fire' },
              { key: 'new', label: 'New Arrivals', icon: 'fa-star' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  borderRadius: '30px',
                  border: '2px solid',
                  borderColor: activeTab === tab.key ? 'var(--primary)' : '#eee',
                  background: activeTab === tab.key ? 'var(--primary)' : '#fff',
                  color: activeTab === tab.key ? '#fff' : '#555',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  padding: '10px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <i className={`fa ${tab.icon} mr-2`}></i>{tab.label}
              </button>
            ))}
          </div>
          <div className="row">
            {displayProducts.map(p => (
              <div key={p.id} className="col-lg-3 col-md-6 col-sm-12 pb-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <Link to="/shop" className="btn btn-outline-primary px-5 py-3 font-weight-bold" style={{ borderRadius: '30px' }}>
              View All Products <i className="fa fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="container-fluid pb-5">
        <div className="px-xl-5">
          <div className="subscribe-nova text-center">
            <div style={{ maxWidth: '560px', margin: '0 auto' }}>
              <span style={{ background: 'rgba(238,77,45,0.2)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, padding: '6px 16px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Newsletter</span>
              <h2 className="text-white font-weight-bold mt-3 mb-2">Stay Ahead of the Trends</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', marginBottom: '28px' }}>
                Get exclusive deals, style tips, and first access to new arrivals.
              </p>
              {subDone ? (
                <div style={{ background: 'rgba(46,204,113,0.15)', borderRadius: 12, padding: '16px 24px', color: '#2ecc71' }}>
                  <i className="fas fa-check-circle mr-2"></i>You're subscribed! Welcome to VELURA.
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (subEmail) { setSubDone(true); setSubEmail('') } }}>
                  <div className="input-group">
                    <input type="email" className="form-control sub-input" placeholder="Enter your email address" value={subEmail} onChange={e => setSubEmail(e.target.value)} required />
                    <div className="input-group-append">
                      <button className="btn btn-sub" type="submit"><i className="fa fa-paper-plane mr-1"></i>Subscribe</button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-fluid py-5" style={{ background: '#f9f9f9' }}>
        <div className="row px-xl-5 text-center">
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '10K+', label: 'Products Listed' },
            { value: '150+', label: 'Brands Available' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((s, i) => (
            <div key={i} className="col-6 col-md-3 mb-4 mb-md-0">
              <h2 className="font-weight-bold mb-1" style={{ color: 'var(--primary)', fontSize: '2.2rem' }}>{s.value}</h2>
              <p className="text-muted mb-0" style={{ fontSize: '0.88rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
