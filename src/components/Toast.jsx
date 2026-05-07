import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="nova-toast">
      <i className="fas fa-check-circle"></i>
      {message}
    </div>
  )
}
