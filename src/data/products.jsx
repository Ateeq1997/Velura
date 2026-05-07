export const products = [
  { id: 1, img: '/img/product-1.jpg', name: 'Classic Floral Dress', price: 89, oldPrice: 120, category: 'dresses', color: 'Red', size: 'M', rating: 4.5 },
  { id: 2, img: '/img/product-2.jpg', name: 'Striped Summer Tee', price: 39, oldPrice: 55, category: 'shirts', color: 'White', size: 'L', rating: 4.0 },
  { id: 3, img: '/img/product-3.jpg', name: 'Slim Fit Denim Jeans', price: 75, oldPrice: 95, category: 'jeans', color: 'Blue', size: 'M', rating: 4.8 },
  { id: 4, img: '/img/product-4.jpg', name: 'Elegant Evening Gown', price: 149, oldPrice: 200, category: 'dresses', color: 'Black', size: 'S', rating: 5.0 },
  { id: 5, img: '/img/product-5.jpg', name: 'Casual Linen Shirt', price: 49, oldPrice: 65, category: 'shirts', color: 'White', size: 'XL', rating: 3.5 },
  { id: 6, img: '/img/product-6.jpg', name: 'High-Waist Yoga Pants', price: 59, oldPrice: 80, category: 'sportswear', color: 'Black', size: 'S', rating: 4.2 },
  { id: 7, img: '/img/product-7.jpg', name: 'Boho Print Blouse', price: 45, oldPrice: 60, category: 'shirts', color: 'Red', size: 'M', rating: 4.6 },
  { id: 8, img: '/img/product-8.jpg', name: 'Leather Biker Jacket', price: 199, oldPrice: 280, category: 'jackets', color: 'Black', size: 'L', rating: 4.9 },
]

export const categories = [
  { id: 1, img: '/img/cat-1.jpg', name: "Men's Collection", count: 42 },
  { id: 2, img: '/img/cat-2.jpg', name: "Women's Collection", count: 68 },
  { id: 3, img: '/img/cat-3.jpg', name: "Kids' Collection", count: 27 },
  { id: 4, img: '/img/cat-4.jpg', name: 'Accessories', count: 34 },
  { id: 5, img: '/img/cat-5.jpg', name: 'Bags & Purses', count: 19 },
  { id: 6, img: '/img/cat-6.jpg', name: 'Footwear', count: 31 },
]

export const StarRating = ({ rating }) => {
  return (
    <div className="text-warning d-flex align-items-center" style={{ gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <i
          key={i}
          className={
            i <= Math.floor(rating)
              ? 'fas fa-star'
              : i - 0.5 <= rating
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          style={{ fontSize: '12px' }}
        ></i>
      ))}
    </div>
  )
}
