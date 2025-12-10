import React, { useEffect, useState } from 'react'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'

export default function BookCardList() {
  const [books, setBooks] = useState([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('All Genres')
  const [sortOption, setSortOption] = useState('Title')
  const [categories, setCategories] = useState([])

  // Пагінація
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 12

  // Завантаження категорій
  useEffect(() => {
    fetch('http://localhost:8000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err))
  }, [])

  // Завантаження книг з пагінацією
  useEffect(() => {
    const params = new URLSearchParams({
      page,
      limit,
      search: searchTerm || '',
      genre: genre !== 'All Genres' ? genre : '',
      sort_by: sortOption,
    })

    fetch(`http://localhost:8000/books?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.books)

        setBooks(data.books)
        setTotalPages(data.pages)
      })
      .catch((err) => console.log(err))
  }, [searchTerm, genre, sortOption, page])

  return (
    <>
      <Navbar />
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: '#f6fbfc', minHeight: '100vh' }}
      >
        <h1
          className="text-center fw-bold mb-3"
          style={{ color: '#0a5c91', fontSize: '2.5rem' }}
        >
          Literary Universe
        </h1>
        <p
          className="text-center mb-5"
          style={{ color: '#5c6b74', fontSize: '1.1rem' }}
        >
          Explore our curated collection spanning genres and perspectives
        </p>

        {/* Пошук і фільтри */}
        <div
          className="d-flex flex-column align-items-center gap-3 mb-5"
          style={{ width: '100%' }}
        >
          <input
            type="text"
            className="shadow-sm"
            placeholder="Search titles, authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: '15px',
              padding: '16px 24px',
              border: '1px solid #d0e7f3',
              width: '80%',
              maxWidth: '1200px',
              backgroundColor: '#ffffff',
              color: '#0a5c91',
              fontSize: '1rem',
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 12px rgba(0,150,255,0.25)')
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />

          <div className="d-flex gap-3">
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="form-select shadow-sm"
              style={{
                borderRadius: '10px',
                padding: '10px 18px',
                border: '1px solid #d0e7f3',
                color: '#0a5c91',
                backgroundColor: '#ffffff',
              }}
            >
              <option>All Genres</option>
              {categories.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="form-select shadow-sm"
              style={{
                borderRadius: '10px',
                padding: '10px 18px',
                border: '1px solid #d0e7f3',
                color: '#0a5c91',
                backgroundColor: '#ffffff',
              }}
            >
              <option value="Title">Sort by Title</option>
              <option value="Rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Картки книг */}
        <div className="container">
          {books.length > 0 ? (
            <div
              className="row justify-content-center"
              style={{ rowGap: '30px' }}
            >
              {books.map((book) => (
                <div
                  key={book.id}
                  className="col-sm-6 col-md-4 col-lg-3 d-flex"
                >
                  <div
                    className="card flex-fill border-0 shadow-sm rounded-4 overflow-hidden"
                    style={{
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                      backgroundColor: '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)'
                      e.currentTarget.style.boxShadow =
                        '0 10px 25px rgba(0,100,255,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow =
                        '0 5px 15px rgba(0,100,255,0.1)'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#e8f3f8',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '230px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={book.image_url || book.image}
                        alt={book.title}
                        className="img-fluid"
                        style={{
                          objectFit: 'contain',
                          maxHeight: '100%',
                          maxWidth: '100%',
                        }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5
                        className="fw-semibold mb-1"
                        style={{ color: '#003d73', fontSize: '1.05rem' }}
                      >
                        {book.title}
                      </h5>
                      <p
                        className="text-muted mb-1"
                        style={{ fontSize: '0.9rem' }}
                      >
                        by {book.authors}
                      </p>
                      <p
                        className="text-secondary mb-2"
                        style={{ fontSize: '0.9rem', flexGrow: 1 }}
                      >
                        {' '}
                        {book.description.length > 100
                          ? book.description.substring(0, 100) + '…'
                          : book.description}
                      </p>

                      {book.rating ? (
                        <p
                          style={{
                            color: '#ffb400',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                          }}
                        >
                          ⭐ {book.rating.toFixed(1)}
                        </p>
                      ) : (
                        <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>
                          (N/A)
                        </p>
                      )}

                      <div className="mt-auto d-flex justify-content-center align-items-center">
                        <a
                          href={`/books/${book.id}`}
                          className="btn btn-sm rounded-pill text-white"
                          style={{
                            backgroundColor: '#00a9b7',
                            padding: '6px 14px',
                            fontWeight: '500',
                            fontSize: '0.85rem',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = '#008c9a')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = '#00a9b7')
                          }
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No books found.</p>
          )}

          {/* Пагінація */}
          <div className="d-flex justify-content-center gap-2 mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <span className="align-self-center">
              {page} / {totalPages}
            </span>
            <button
              className="btn btn-outline-primary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
