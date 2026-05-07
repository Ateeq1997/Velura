import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const categoryItems = [
  { icon: 'fa-tshirt', label: 'Dresses', sub: ["Men's Dresses", "Women's Dresses", "Baby's Dresses"] },
  { icon: 'fa-tshirt', label: 'Shirts' },
  { icon: 'fa-shopping-bag', label: 'Jeans' },
  { icon: 'fa-swimmer', label: 'Swimwear' },
  { icon: 'fa-bed', label: 'Sleepwear' },
  { icon: 'fa-running', label: 'Sportswear' },
  { icon: 'fa-female', label: 'Jumpsuits' },
  { icon: 'fa-user-tie', label: 'Blazers' },
  { icon: 'fa-mitten', label: 'Jackets' },
  { icon: 'fa-shoe-prints', label: 'Shoes' },
]

export default function Navbar({ showCarousel = false }) {
  const [navOpen, setNavOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(showCarousel)
  const [dressOpen, setDressOpen] = useState(false)
  const location = useLocation()
  const pagesRef = useRef(null)

  useEffect(() => {
    setNavOpen(false)
    setPagesOpen(false)
    if (!showCarousel) setCatOpen(false)
  }, [location.pathname, showCarousel])

  useEffect(() => {
    const handler = (e) => {
      if (pagesRef.current && !pagesRef.current.contains(e.target)) setPagesOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isPagesActive = ['/cart', '/checkout'].includes(location.pathname)

  return (
    <div className={`container-fluid${showCarousel ? ' mb-5' : ''}`} style={{ background: '#fff', borderBottom: '2px solid #f5f5f5' }}>
      <div className="row px-xl-5">
        <div className="col-lg-3 d-none d-lg-block" style={{ position: 'relative' }}>
          <button
            className="category-btn btn w-100 d-flex align-items-center justify-content-between text-white"
            onClick={() => setCatOpen(!catOpen)}
          >
            <span><i className="fa fa-bars mr-2"></i>All Categories</span>
            <i className={`fa fa-angle-${catOpen ? 'up' : 'down'}`}></i>
          </button>
          {catOpen && (
            <nav className="category-sidebar position-absolute w-100" style={{ top: '65px', left: 0, zIndex: 200, border: '1px solid #f0f0f0' }}>
              <div style={{ maxHeight: '410px', overflowY: 'auto' }}>
                {categoryItems.map((item, i) => (
                  <div key={i}>
                    {item.sub ? (
                      <>
                        <button
                          className="nav-link w-100 text-left btn btn-link"
                          onClick={() => setDressOpen(!dressOpen)}
                          style={{ textDecoration: 'none', borderRadius: 0, fontWeight: 500 }}
                        >
                          <i className="fa fa-tshirt mr-2 text-primary" style={{ width: 18 }}></i>
                          {item.label}
                          <i className={`fa fa-angle-${dressOpen ? 'up' : 'down'} float-right mt-1`}></i>
                        </button>
                        {dressOpen && (
                          <div style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
                            {item.sub.map((s, j) => (
                              <Link key={j} to="/shop" className="nav-link" style={{ paddingLeft: '40px', fontSize: '0.83rem' }} onClick={() => setCatOpen(false)}>
                                <i className="fa fa-angle-right mr-2 text-primary"></i>{s}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link to="/shop" className="nav-link" onClick={() => { if (!showCarousel) setCatOpen(false) }}>
                        <i className="fa fa-angle-right mr-2 text-primary" style={{ width: 16 }}></i>{item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>

        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg navbar-light py-0 px-0">
            <Link to="/" className="brand-logo d-block d-lg-none py-3">
              <span className="brand-accent">S</span>hopNova
            </Link>
            <button className="navbar-toggler" type="button" onClick={() => setNavOpen(!navOpen)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${navOpen ? 'show' : ''} collapse navbar-collapse`}>
              <div className="navbar-nav main-nav mr-auto py-0">
                <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active-link' : ''}`} end>Home</NavLink>
                <NavLink to="/shop" className={({ isActive }) => `nav-link${isActive ? ' active-link' : ''}`}>Shop</NavLink>
                <NavLink to="/detail" className={({ isActive }) => `nav-link${isActive ? ' active-link' : ''}`}>Product Detail</NavLink>

                <div className="nav-dropdown" ref={pagesRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <button
                    className={`nav-link btn btn-link${isPagesActive ? ' active-link' : ''}`}
                    onClick={() => setPagesOpen(!pagesOpen)}
                    style={{ textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', color: isPagesActive ? 'var(--primary)' : '#333' }}
                  >
                    Pages <i className={`fa fa-angle-${pagesOpen ? 'up' : 'down'} ml-1`} style={{ fontSize: '11px' }}></i>
                  </button>
                  {pagesOpen && (
                    <div className="nav-dropdown-menu">
                      <Link to="/cart" onClick={() => setPagesOpen(false)}>
                        <i className="fas fa-shopping-cart mr-2 text-primary"></i>Shopping Cart
                      </Link>
                      <Link to="/checkout" onClick={() => setPagesOpen(false)}>
                        <i className="fas fa-credit-card mr-2 text-primary"></i>Checkout
                      </Link>
                    </div>
                  )}
                </div>

                <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active-link' : ''}`}>Contact</NavLink>
              </div>

              <div className="navbar-nav ml-auto py-0 d-flex align-items-center" style={{ gap: '4px' }}>
                <a href="#" className="nav-link" style={{ color: '#555', fontWeight: 500 }}>
                  <i className="far fa-user mr-1"></i>Login
                </a>
                <Link to="/shop" className="btn btn-sm btn-primary px-3 ml-2" style={{ borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem' }}>
                  Shop Now
                </Link>
              </div>
            </div>
          </nav>

          {showCarousel && <HeroCarousel />}
        </div>
      </div>
    </div>
  )
}

function HeroCarousel() {
  const [active, setActive] = useState(0)
  const slides = [
    {
      img: '/img/carousel-1.jpg',
      badge: 'ðŸ”¥ Limited Time â€” 10% Off First Order',
      title: 'Discover Your\nStyle Identity',
      desc: 'Explore curated fashion collections for every occasion and season.',
      cta: 'Shop the Collection',
      ctaLink: '/shop',
    },
    {
      img: '/img/carousel-2.jpg',
      badge: 'âœ¨ New Season â€” Fresh Arrivals Are Here',
      title: 'Fashion That\nFits Your Life',
      desc: 'Premium quality clothing at prices everyone can afford. Shop smart today.',
      cta: 'Explore New Arrivals',
      ctaLink: '/shop',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="hero-carousel" style={{ position: 'relative' }}>
      {slides.map((s, i) => (
        <div key={i} style={{ display: i === active ? 'block' : 'none' }}>
          <div style={{ position: 'relative', height: '420px' }}>
            <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="carousel-caption">
              <span className="badge-promo">{s.badge}</span>
              <h1 style={{ whiteSpace: 'pre-line' }}>{s.title}</h1>
              <p className="slide-desc">{s.desc}</p>
              <div className="d-flex align-items-center flex-wrap" style={{ gap: '12px' }}>
                <Link to={s.ctaLink} className="btn-hero">{s.cta}</Link>
                <Link to="/contact" className="btn-hero-outline">Get in Touch</Link>
              </div>
            </div>
            <button
              onClick={() => setActive((active - 1 + slides.length) % slides.length)}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            ><i className="fa fa-angle-left"></i></button>
            <button
              onClick={() => setActive((active + 1) % slides.length)}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            ><i className="fa fa-angle-right"></i></button>
            <div className="carousel-indicator-dots">
              {slides.map((_, idx) => (
                <button key={idx} className={`dot${idx === active ? ' active' : ''}`} onClick={() => setActive(idx)}></button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
