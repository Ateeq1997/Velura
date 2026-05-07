import { useState, useMemo } from 'react'
import Topbar from '../components/Topbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'r1', label: '$0 - $50', min: 0, max: 50 },
  { id: 'r2', label: '$50 - $100', min: 50, max: 100 },
  { id: 'r3', label: '$100 - $150', min: 100, max: 150 },
  { id: 'r4', label: '$150+', min: 150, max: Infinity },
]
const colors = ['All', 'Black', 'White', 'Red', 'Blue', 'Green']
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL']
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
]

export default function Shop() {
  const [priceFilter, setPriceFilter] = useState('all')
  const [colorFilter, setColorFilter] = useState('All')
  const [sizeFilter, setSizeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const range = priceRanges.find(r => r.id === priceFilter)
    let list = products.filter(p => {
      const matchPrice = p.price >= range.min && p.price <= range.max
      const matchColor = colorFilter === 'All' || p.color === colorFilter
      const matchSize = sizeFilter === 'All' || p.size === sizeFilter
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchPrice && matchColor && matchSize && matchSearch
    })
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [priceFilter, colorFilter, sizeFilter, sortBy, search])

  const clearFilters = () => {
    setPriceFilter('all'); setColorFilter('All'); setSizeFilter('All'); setSortBy('default'); setSearch('')
  }
  const hasFilters = priceFilter !== 'all' || colorFilter !== 'All' || sizeFilter !== 'All' || search !== ''

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="page-header-nova">
        <h1>Our Shop</h1>
        <div className="breadcrumb-nova">
          <a href="/">Home</a>
          <span className="sep"><i className="fa fa-angle-right"></i></span>
          <span className="current">Shop</span>
        </div>
      </div>

      <div className="container-fluid pt-3 pb-5">
        <div className="row px-xl-5">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-12">
            <div className="sidebar-card">
              <div className="sidebar-title d-flex justify-content-between align-items-center">
                <span><i className="fa fa-filter mr-2 text-primary"></i>Price Range</span>
              </div>
              {priceRanges.map(r => (
                <div key={r.id} className="d-flex align-items-center mb-2" style={{ cursor: 'pointer' }} onClick={() => setPriceFilter(r.id)}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${priceFilter === r.id ? 'var(--primary)' : '#ddd'}`, background: priceFilter === r.id ? 'var(--primary)' : '#fff', marginRight: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {priceFilter === r.id && <i className="fa fa-check text-white" style={{ fontSize: 9 }}></i>}
                  </div>
                  <span style={{ fontSize: '0.87rem', color: priceFilter === r.id ? 'var(--primary)' : '#555', fontWeight: priceFilter === r.id ? 600 : 400 }}>{r.label}</span>
                </div>
              ))}
            </div>

            <div className="sidebar-card">
              <div className="sidebar-title"><i className="fa fa-palette mr-2 text-primary"></i>Color</div>
              <div className="d-flex flex-wrap" style={{ gap: '8px' }}>
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setColorFilter(c)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '20px',
                      border: `2px solid ${colorFilter === c ? 'var(--primary)' : '#eee'}`,
                      background: colorFilter === c ? 'var(--primary)' : '#fff',
                      color: colorFilter === c ? '#fff' : '#555',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >{c}</button>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-title"><i className="fa fa-ruler mr-2 text-primary"></i>Size</div>
              <div className="d-flex flex-wrap" style={{ gap: '8px' }}>
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSizeFilter(s)}
                    style={{
                      width: s === 'All' ? 'auto' : 42,
                      height: 42,
                      padding: s === 'All' ? '0 14px' : 0,
                      borderRadius: '8px',
                      border: `2px solid ${sizeFilter === s ? 'var(--primary)' : '#eee'}`,
                      background: sizeFilter === s ? 'var(--primary)' : '#fff',
                      color: sizeFilter === s ? '#fff' : '#555',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="btn btn-outline-primary btn-block" style={{ borderRadius: 10 }}>
                <i className="fa fa-times mr-2"></i>Clear All Filters
              </button>
            )}
          </div>

          {/* Products */}
          <div className="col-lg-9 col-md-12">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap" style={{ gap: '12px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div className="input-group header-search-bar">
                  <input type="text" className="form-control" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent"><i className="fa fa-search text-primary"></i></span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center" style={{ gap: 12 }}>
                <span style={{ fontSize: '0.85rem', color: '#888', whiteSpace: 'nowrap' }}>
                  {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                </span>
                <select
                  className="form-control"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ borderRadius: 10, border: '2px solid #f0f0f0', fontSize: '0.87rem', padding: '8px 12px', minWidth: 180 }}
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-5">
                <i className="fa fa-search" style={{ fontSize: '3rem', color: '#ddd' }}></i>
                <h5 className="mt-3 text-muted">No products found</h5>
                <p className="text-muted" style={{ fontSize: '0.88rem' }}>Try adjusting your filters or search term</p>
                <button onClick={clearFilters} className="btn btn-primary px-4" style={{ borderRadius: 10 }}>Clear Filters</button>
              </div>
            ) : (
              <div className="row">
                {filtered.map(p => (
                  <div key={p.id} className="col-lg-4 col-md-6 col-sm-12 pb-4">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
