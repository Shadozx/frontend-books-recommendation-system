import React from 'react'

export default function Footer() {
  return (
    <footer
      className="pt-5 pb-3"
      style={{ backgroundColor: '#003d73', color: '#ffffff' }}
    >
      <div className="container">
        <div className="row mb-4">
          {/* About */}
          <div className="col-md-4 mb-3">
            <h5 style={{ color: '#00a9b7' }}>About BookSense</h5>
            <p style={{ color: '#cfd8dc' }}>
              AI-powered book recommendations for every mood and interest.
              Discover, explore, and enjoy your next favorite book.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-md-2 mb-3">
            <h5 style={{ color: '#00a9b7' }}>Navigate</h5>
            <ul className="list-unstyled">
              <li><a href="/" style={{ color: '#cfd8dc', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/search" style={{ color: '#cfd8dc', textDecoration: 'none' }}>Search</a></li>
              <li><a href="/catalog" style={{ color: '#cfd8dc', textDecoration: 'none' }}>Catalog</a></li>
              <li><a href="/contact" style={{ color: '#cfd8dc', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3 mb-3">
            <h5 style={{ color: '#00a9b7' }}>Subscribe</h5>
            <p style={{ color: '#cfd8dc', fontSize: '0.9rem' }}>
              Get updates on new books and AI recommendations.
            </p>
            <div className="d-flex">
              <input
                type="email"
                placeholder="Email address"
                className="form-control rounded-start"
                style={{ border: 'none' }}
              />
              <button
                className="btn"
                style={{ backgroundColor: '#00a9b7', color: '#ffffff', borderRadius: '0 0.25rem 0.25rem 0' }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-3">
            <h5 style={{ color: '#00a9b7' }}>Follow Us</h5>
            <div className="d-flex gap-2 mt-2">
              <a href="#" style={{ color: '#ffffff', fontSize: '1.5rem' }}>🌐</a>
              <a href="#" style={{ color: '#ffffff', fontSize: '1.5rem' }}>🐦</a>
              <a href="#" style={{ color: '#ffffff', fontSize: '1.5rem' }}>📸</a>
              <a href="#" style={{ color: '#ffffff', fontSize: '1.5rem' }}>💼</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-3" style={{ borderTop: '1px solid #0a5c91', fontSize: '0.9rem', color: '#cfd8dc' }}>
          © 2025 BookSense. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
