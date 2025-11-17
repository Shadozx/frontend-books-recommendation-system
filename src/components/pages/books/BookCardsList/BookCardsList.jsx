// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Navbar from '../../../fragments/Navbar/Navbar'

// export default function BookCardList() {
//   const [books, setBooks] = useState([])
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         setError('')
//         const response = await axios.get('http://localhost:9000/books/all') // Запит до сервера для отримання каталогу
//         setBooks(response.data)
//       } catch (err) {
//         setError('Failed to load books. Please try again.')
//       }
//     }

//     fetchBooks()
//   }, [])

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h1 className="text-center mb-4">Book Catalog</h1>
//         {error && <div className="alert alert-danger">{error}</div>}
//         {books.length > 0 ? (
//           <div className="row">
//             {books.map((book, index) => (
//               <div key={index} className="col-md-4 mb-4">
//                 <div className="card h-100">
//                   {/* Зображення книги */}
//                   <div className="image-container">
//                     {book.image ? (
//                       <img
//                         src={book.image}
//                         className="card-img-top img-fluid"
//                         alt={book.title}
//                         style={{
//                           objectFit: 'contain', // Масштабування без обрізання
//                           maxHeight: '200px', // Максимальна висота
//                           width: '100%', // Ширина 100%
//                         }}
//                       />
//                     ) : (
//                       <img
//                         src="https://via.placeholder.com/200"
//                         className="card-img-top img-fluid"
//                         alt="default"
//                         style={{
//                           objectFit: 'contain',
//                           maxHeight: '200px',
//                           width: '100%',
//                         }}
//                       />
//                     )}
//                   </div>
//                   <div className="card-body">
//                     <a className="card-title" href={`/books/${book.id}`}>
//                       {book.title}
//                     </a>
//                     <p className="card-text">
//                       <strong>Authors:</strong> {book.authors || 'Unknown'}
//                     </p>
//                     <p className="card-text">
//                       {book.description || 'No description available.'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center">No books found in the catalog.</p>
//         )}
//       </div>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'

export default function BookCardList() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('All Genres')
  const [sortOption, setSortOption] = useState('Title')

  const mockBooks = [
    {
      id: 1,
      title: 'Atomic Habits',
      authors: 'James Clear',
      description:
        'Transform your life through the power of small, consistent changes.',
      image:
        'https://m.media-amazon.com/images/I/81kg51XRc1L._AC_UF1000,1000_QL80_.jpg',
      // price: '₹203.00',
      rating: 4.6,
      genre: 'Self-help',
    },
    {
      id: 2,
      title: 'Beyond the Stars',
      authors: 'Michael Chen',
      description:
        'An epic space odyssey that challenges our understanding of existence.',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/71tbalAHYCL.jpg',
      // price: '₹209.00',
      rating: 4.3,
      genre: 'Sci-fi',
    },
    {
      id: 3,
      title: 'Darkness Gathers',
      authors: 'Emma Elliot',
      description:
        'A turbulent story of passion and revenge on the Yorkshire moors.',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
      // price: '₹325.00',
      rating: null,
      genre: 'Drama',
    },
    {
      id: 4,
      title: 'Digital Fortress',
      authors: 'James Cooper',
      description:
        'In the age of digital warfare, no secret is safe from discovery.',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/71rOzy4cyAL.jpg',
      // price: '₹190.00',
      rating: 4.2,
      genre: 'Thriller',
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setBooks(mockBooks)
      setFilteredBooks(mockBooks)
    }, 300)
  }, [])

  useEffect(() => {
    let results = books.filter(
      (book) =>
        (genre === 'All Genres' || book.genre === genre) &&
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    if (sortOption === 'Title') {
      results.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOption === 'Rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setFilteredBooks(results)
  }, [searchTerm, genre, sortOption, books])

  return (
    <>
      <Navbar />
      <div
        className="container-fluid py-5"
        style={{
          backgroundColor: '#f6fbfc',
          minHeight: '100vh',
        }}
      >
        {/* Заголовок */}
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
              <option>Self-help</option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Thriller</option>
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
          {filteredBooks.length > 0 ? (
            <div className="row justify-content-center" style={{ rowGap: '30px' }}>
              {filteredBooks.map((book) => (
                <div key={book.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
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
                        src={book.image}
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
                        style={{
                          fontSize: '0.9rem',
                          flexGrow: 1,
                        }}
                      >
                        {book.description}
                      </p>

                      {/* Рейтинг */}
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

                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        {/* <span
                          style={{
                            color: '#0047ab',
                            fontWeight: '600',
                            fontSize: '1rem',
                          }}
                        >
                          {book.price}
                        </span> */}
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
        </div>
      </div>

      <Footer />
    </>
  )
}
