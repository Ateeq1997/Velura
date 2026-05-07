import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  const handleSub = e => {
    e.preventDefault()
    if (email) { setSubDone(true); setEmail('') }
  }

  return (
    <footer className="footer-nova mt-5">
      <div className="container-fluid px-xl-5 pt-5">
        <div className="row pt-3">
          {/* Brand col */}
          <div className="col-lg-4 col-md-12 mb-5">
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #ee4d2d, #ff7043)',
                color: '#fff',
                fontWeight: 900,
                fontSize: '1.5rem',
                padding: '4px 13px',
                borderRadius: '8px',
                letterSpacing: '1px',
                boxShadow: '0 3px 12px rgba(238,77,45,0.4)',
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1,
              }}>V</span>
              <span style={{
                fontWeight: 800,
                fontSize: '1.5rem',
                color: '#fff',
                letterSpacing: '-0.5px',
                fontFamily: "'Poppins', sans-serif",
              }}>ELURA</span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.87rem', lineHeight: '1.7' }}>
              Your ultimate fashion destination. Discover curated collections that blend style, comfort, and affordability. Dress better. Live bolder.
            </p>
            <div className="mt-3">
              <div className="d-flex align-items-center mb-2" style={{ gap: 10 }}>
                <i className="fa fa-map-marker-alt text-primary"></i>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem' }}>123 Fashion Street, New York, USA</span>
              </div>
              <div className="d-flex align-items-center mb-2" style={{ gap: 10 }}>
                <i className="fa fa-envelope text-primary"></i>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem' }}>hello@VELURA.com</span>
              </div>
              <div className="d-flex align-items-center" style={{ gap: 10 }}>
                <i className="fa fa-phone-alt text-primary"></i>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem' }}>+1 (800) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-4 mb-5">
            <h5 className="footer-heading">Quick Links</h5>
            <div className="d-flex flex-column">
              {[['/', 'Home'], ['/shop', 'Our Shop'], ['/detail', 'Product Detail'], ['/cart', 'Shopping Cart'], ['/checkout', 'Checkout'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <Link key={to} to={to} className="footer-link">
                  <i className="fa fa-angle-right text-primary"></i>{label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-4 mb-5">
            <h5 className="footer-heading">Categories</h5>
            <div className="d-flex flex-column">
              {["Men's Fashion", "Women's Fashion", "Kids' Collection", 'Accessories', 'Footwear', 'Bags'].map(cat => (
                <Link key={cat} to="/shop" className="footer-link">
                  <i className="fa fa-angle-right text-primary"></i>{cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-4 mb-5">
            <h5 className="footer-heading">Stay in the Loop</h5>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.84rem', marginBottom: '16px' }}>
              Subscribe for exclusive deals, new arrivals and style inspiration.
            </p>
            {subDone ? (
              <div style={{ background: 'rgba(46,204,113,0.15)', borderRadius: 10, padding: '14px 18px', color: '#2ecc71', fontSize: '0.87rem' }}>
                <i className="fas fa-check-circle mr-2"></i>Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSub}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control sub-input"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <button className="btn btn-sub" type="submit">Subscribe</button>
                  </div>
                </div>
              </form>
            )}
            <div className="mt-4">
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '10px' }}>Follow us on social media:</p>
              <div>
                {[['fab fa-facebook-f', 'Facebook'], ['fab fa-twitter', 'Twitter'], ['fab fa-instagram', 'Instagram'], ['fab fa-linkedin-in', 'LinkedIn'], ['fab fa-youtube', 'YouTube']].map(([icon, label]) => (
                  <button key={label} className="footer-social-btn" title={label}>
                    <i className={icon}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container-fluid px-xl-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left">
              &copy; {new Date().getFullYear()} <strong style={{ color: 'rgba(255,255,255,0.7)' }}>VELURA</strong>. All rights reserved.
            </div>
            <div className="col-md-6 text-center text-md-right mt-2 mt-md-0">
              <img src="/img/payment.png" alt="Payment methods" style={{ height: '24px', opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
