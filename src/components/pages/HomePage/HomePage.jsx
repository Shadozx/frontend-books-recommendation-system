import React from 'react'
import Navbar from '../../fragments/Navbar/Navbar'
import Footer from '../../fragments/Footer/Footer'
// import Navbar from '../../../fragments/Navbar/Navbar'

export default function HomePage() {

  document.title = 'Home page'
  return (
    <>
      <Navbar />
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: '#f6fbfc', minHeight: '100vh' }}
      >
        {/* Hero Section */}
        <div className="text-center mb-5" style={{ padding: '50px 20px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#0a5c91' }}>
            Welcome to BookSense
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#5c6b74',
              marginTop: '10px',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Discover books tailored to your mood, interests with our AI-powered
            recommendation system.
          </p>
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <a
              href="/books/search"
              className="btn rounded-pill text-white"
              style={{ backgroundColor: '#00a9b7', padding: '10px 20px' }}
            >
              Start Searching
            </a>
            <a
              href="/books/catalog"
              className="btn rounded-pill"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #00a9b7',
                color: '#00a9b7',
                padding: '10px 20px',
              }}
            >
              Browse Catalog
            </a>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="container py-5">
          <h2 className="text-center mb-4" style={{ color: '#0a5c91' }}>
            How It Works
          </h2>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '10px',
                  color: '#00a9b7',
                }}
              >
                📝
              </div>
              <h5>Describe Your Book</h5>
              <p style={{ color: '#5c6b74' }}>
                Enter what kind of book you’re looking for or how you want to
                feel.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '10px',
                  color: '#00a9b7',
                }}
              >
                😄
              </div>
              <h5>Select Your Mood</h5>
              <p style={{ color: '#5c6b74' }}>
                Pick an emotion or mood, and we’ll find books that match it.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '10px',
                  color: '#00a9b7',
                }}
              >
                🤖
              </div>
              <h5>AI-Powered Recommendations</h5>
              <p style={{ color: '#5c6b74' }}>
                Our AI analyzes your description and mood to suggest books
                you’ll love.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '10px',
                  color: '#00a9b7',
                }}
              >
                📚
              </div>
              <h5>Explore & Enjoy</h5>
              <p style={{ color: '#5c6b74' }}>
                Browse your recommended books, view details, and start reading.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div
          className="container py-5"
          style={{ backgroundColor: '#e8f3f8', borderRadius: '15px' }}
        >
          <h2 className="text-center mb-4" style={{ color: '#0a5c91' }}>
            Why BookSense?
          </h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h5>Personalized Recommendations</h5>
              <p style={{ color: '#5c6b74' }}>
                AI picks books that match your interests and mood.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Explore by Emotion</h5>
              <p style={{ color: '#5c6b74' }}>
                Find books that fit exactly how you want to feel.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Diverse Catalog</h5>
              <p style={{ color: '#5c6b74' }}>
                Explore books across multiple genres and perspectives.
              </p>
            </div>
          </div>
        </div>

        {/* Optional Call-to-Action */}
        <div className="text-center py-5">
          <h3 style={{ color: '#0a5c91', marginBottom: '20px' }}>
            Ready to Discover Your Next Favorite Book?
          </h3>
          <a
            href="/books/search"
            className="btn rounded-pill text-white"
            style={{
              backgroundColor: '#00a9b7',
              padding: '12px 25px',
              fontSize: '1.1rem',
            }}
          >
            Start Searching
          </a>
        </div>
      </div>

      <Footer />
    </>
  )
}
