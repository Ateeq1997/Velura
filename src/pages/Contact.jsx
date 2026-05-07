import { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const contactInfo = [
  { icon: 'fa-map-marker-alt', title: 'Our Store', lines: ['123 VELURA Avenue', 'New York, NY 10001'] },
  { icon: 'fa-phone-alt', title: 'Phone', lines: ['+1 (800) 123-4567', 'Mon–Sat, 9am–6pm EST'] },
  { icon: 'fa-envelope', title: 'Email', lines: ['support@VELURA.com', 'hello@VELURA.com'] },
  { icon: 'fa-clock', title: 'Working Hours', lines: ['Monday – Saturday', '9:00 AM – 8:00 PM'] },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="page-header-nova">
        <h1>Contact Us</h1>
        <div className="breadcrumb-nova">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fa fa-angle-right"></i></span>
          <span className="current">Contact</span>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="px-xl-5">
          <div className="row mb-5">
            {contactInfo.map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6 mb-4">
                <div className="contact-info-item h-100">
                  <div className="contact-icon">
                    <i className={`fa ${item.icon}`}></i>
                  </div>
                  <h6 className="font-weight-bold mt-3 mb-2" style={{ color: '#1a1a2e' }}>{item.title}</h6>
                  {item.lines.map((line, j) => (
                    <p key={j} className="mb-0" style={{ fontSize: '0.88rem', color: '#888' }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="checkout-card">
                <h5 className="font-weight-bold mb-4"><i className="fa fa-paper-plane mr-2 text-primary"></i>Send Us a Message</h5>

                {sent ? (
                  <div style={{ background: 'rgba(46,204,113,0.1)', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
                    <i className="fas fa-check-circle" style={{ fontSize: '2.5rem', color: '#2ecc71', marginBottom: 12, display: 'block' }}></i>
                    <h6 className="font-weight-bold mb-2">Message Sent!</h6>
                    <p className="text-muted mb-3" style={{ fontSize: '0.88rem' }}>Thank you for contacting VELURA. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="btn btn-outline-primary px-4" style={{ borderRadius: 10 }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your Name *</label>
                          <input type="text" name="name" className="form-control form-control-nova" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address *</label>
                          <input type="email" name="email" className="form-control form-control-nova" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Subject *</label>
                      <select name="subject" className="form-control form-control-nova" value={form.subject} onChange={handleChange} required>
                        <option value="">Select a subject</option>
                        {['Order Inquiry', 'Product Question', 'Return & Refund', 'Shipping Issue', 'General Feedback', 'Other'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Message *</label>
                      <textarea name="message" className="form-control form-control-nova" rows="5" value={form.message} onChange={handleChange} required placeholder="Tell us how we can help you..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary px-5 py-3 font-weight-bold" style={{ borderRadius: '12px' }}>
                      <i className="fa fa-paper-plane mr-2"></i>Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="col-lg-5">
              <div style={{ borderRadius: 16, overflow: 'hidden', height: '100%', minHeight: '400px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
                <iframe
                  title="VELURA Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1617898297546!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
