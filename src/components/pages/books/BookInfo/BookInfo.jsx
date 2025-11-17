// import { useNavigate, useParams } from 'react-router-dom'
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import Navbar from '../../../fragments/Navbar/Navbar'

// export default function BookInfo({}) {
//   const { id } = useParams()
//   const [book, setBook] = useState(null)
//   const [reviews, setReviews] = useState([])
//   const [recommendations, setRecommendations] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [loadingRecommendations, setLoadingRecommendations] = useState(false)
//   const [error, setError] = useState('')
//   const [recError, setRecError] = useState('')

//   // Завантажуємо дані про книгу та відгуки
//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         setLoading(true)
//         setError('')

//         console.log(id)

//         // Отримуємо інформацію про книгу
//         const bookResponse = await axios.get(
//           `http://localhost:9000/books/${id}`
//         )
//         setBook(bookResponse.data)

//         // Отримуємо відгуки про книгу
//         const reviewsResponse = await axios.get(
//           `http://localhost:9000/books/${id}/reviews`
//         )
//         setReviews(reviewsResponse.data)

//         setLoading(false)
//       } catch (err) {
//         setError('Failed to load book details and reviews')
//         setLoading(false)
//       }
//     }

//     fetchBookDetails()
//   }, [id])

//   // Завантаження рекомендацій для книги
//   const fetchRecommendations = async () => {
//     try {
//       setLoadingRecommendations(true)
//       setRecError('')

//       const response = await axios.post('http://localhost:9000/books/items', {
//         book_title: book.title,
//         top_n: 5,
//       })

//       setRecommendations(response.data)
//       setLoadingRecommendations(false)
//     } catch (err) {
//       setRecError('Failed to load recommendations')
//       setLoadingRecommendations(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: '100vh' }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="alert alert-danger">{error}</div>
//   }

//   if (!book) {
//     return <p>No book details available.</p>
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h1 className="text-center mb-4">{book.title}</h1>

//         {/* Виведення детальної інформації про книгу */}
//         <div className="row">
//           <div className="col-md-4">
//             <img
//               src={book.image || 'https://via.placeholder.com/150'}
//               className="img-fluid"
//               alt={book.title}
//             />
//           </div>
//           <div className="col-md-8">
//             <h3>Authors: {book.authors}</h3>
//             <p>{book.description}</p>
//             <p>Published: {book.published}</p>
//             {/* <p>Genre: {book.genre}</p> */}
//             <a
//               href="#"
//               className="btn btn-primary"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>

//         {/* Кнопка для отримання рекомендацій */}
//         <div className="mt-5">
//           <button className="btn btn-success" onClick={fetchRecommendations}>
//             Get Book Recommendations
//           </button>
//         </div>

//         {/* Відображення рекомендацій */}
//         {loadingRecommendations && (
//           <div className="mt-3">Loading recommendations...</div>
//         )}

//         {recError && <div className="alert alert-danger mt-3">{recError}</div>}

//         {recommendations.length > 0 && (
//           <div className="mt-4">
//             <h3>Recommended Books:</h3>
//             <ul className="list-group">
//               {recommendations.map((rec, index) => (
//                 <li key={index} className="list-group-item">
//                   <a href={`/books/${rec.id}`}>{rec.title}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <h3 className="mt-5">Reviews:</h3>
//         {reviews.length > 0 ? (
//           <ul className="list-group">
//             {reviews.map((review, index) => (
//               <li key={index} className="list-group-item">
//                 <h5>{review.user}</h5>
//                 <p>{review.text}</p>
//                 <small>Rating: {review.rating} / 5</small>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews available for this book.</p>
//         )}
//       </div>
//     </>
//   )
// }

import React, { useState, useEffect } from 'react'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'

export default function BookInfo() {
  const [book] = useState({
    id: 1,
    title: 'Atomic Habits',
    authors: 'James Clear',
    description:
      'Transform your life through the power of small, consistent changes. A book about practical strategies for forming good habits and breaking bad ones.',
    image:
      'https://m.media-amazon.com/images/I/81kg51XRc1L._AC_UF1000,1000_QL80_.jpg',
    published: '2018',
    rating: 4.8,
    // price: '₹203.00',
  })

  const [recommendations] = useState([
    {
      id: 2,
      title: 'Deep Work',
      authors: 'Cal Newport',
      image:
        'https://book-ye.com.ua/media/catalog/product/cache/274ba2bb1664e69238223826e1132b42/5/e/5ef8b4d8-c668-11ee-8192-00505684ea69_b99a2951-063a-11ef-819b-005056857596.jpg',
    },
    {
      id: 3,
      title: 'The 7 Habits of Highly Effective People',
      authors: 'Stephen R. Covey',
      image:
        'https://nashformat.ua/files/products/the-7-habits-of-highly-effective-people-944956.800x800.jpeg',
    },
    {
      id: 4,
      title: 'Can’t Hurt Me',
      authors: 'David Goggins',
      image:
        'https://i.harperapps.com/hqna/covers/9781335015037/y648.jpg',
    },
  ])

  const [reviews] = useState([
    { user: 'Anna', text: 'Absolutely life-changing. Clear and practical.', rating: 5 },
    { user: 'Mark', text: 'Simple but powerful advice.', rating: 4 },
  ])

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
          className="text-center fw-bold mb-4"
          style={{ color: '#0a5c91', fontSize: '2.5rem' }}
        >
          Book Information
        </h1>

        {/* Основний блок книги */}
        <div
          className="container bg-white shadow-sm rounded-4 p-4 mb-5"
          style={{
            maxWidth: '1100px',
          }}
        >
          <div className="row g-4 align-items-start">
            <div className="col-md-4 d-flex justify-content-center">
              <div
                style={{
                  backgroundColor: '#e8f3f8',
                  borderRadius: '15px',
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '320px',
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
                    borderRadius: '10px',
                  }}
                />
              </div>
            </div>

            <div className="col-md-8">
              <h2
                className="fw-semibold mb-2"
                style={{ color: '#003d73', fontSize: '1.8rem' }}
              >
                {book.title}
              </h2>
              <p
                className="mb-1"
                style={{ color: '#0a5c91', fontWeight: 500, fontSize: '1.1rem' }}
              >
                by {book.authors}
              </p>
              <p style={{ color: '#0a5c91', fontSize: '1rem' }}>
                Published: {book.published}
              </p>

              <p
                className="mt-3 mb-3"
                style={{
                  color: '#0a5c91',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                }}
              >
                {book.description}
              </p>

              <p
                style={{
                  color: '#ffb400',
                  fontWeight: '500',
                  fontSize: '1rem',
                }}
              >
                ⭐ {book.rating} / 5
              </p>

              {/* <div className="d-flex justify-content-between align-items-center mt-3">
                 <span
                  style={{
                    color: '#0047ab',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                  }}
                >
                  {book.price}
                </span> 
                <button
                  className="btn text-white rounded-pill"
                  style={{
                    backgroundColor: '#00a9b7',
                    padding: '10px 24px',
                    fontWeight: '500',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#008c9a')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#00a9b7')
                  }
                >
                  Buy Now
                </button>
              </div>*/}
            </div>
          </div>
        </div>

        {/* Рекомендовані книги */}
        <div className="container mb-5" style={{ maxWidth: '1100px' }}>
          <h3
            className="fw-bold mb-4"
            style={{ color: '#0a5c91', fontSize: '1.8rem' }}
          >
            Users also read books
          </h3>

          <div className="row justify-content-start" style={{ rowGap: '30px' }}>
            {recommendations.map((rec) => (
              <div key={rec.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
                <div
                  className="card flex-fill border-0 shadow-sm rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
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
                    }}
                  >
                    <img
                      src={rec.image}
                      alt={rec.title}
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
                      {rec.title}
                    </h5>
                    <p
                      className="mb-2"
                      style={{
                        fontSize: '0.9rem',
                        color: '#0a5c91',
                      }}
                    >
                      by {rec.authors}
                    </p>
                    <a
                      href={`/books/${rec.id}`}
                      className="btn btn-sm rounded-pill text-white mt-auto"
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
            ))}
          </div>
        </div>

        {/* Відгуки */}
        <div className="container mb-5" style={{ maxWidth: '1100px' }}>
          <h3
            className="fw-bold mb-4"
            style={{ color: '#0a5c91', fontSize: '1.8rem' }}
          >
            Reviews
          </h3>

          {reviews.length > 0 ? (
            <div className="row g-4">
              {reviews.map((review, i) => (
                <div key={i} className="col-md-6">
                  <div
                    className="p-4 rounded-4 shadow-sm"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d0e7f3',
                    }}
                  >
                    <h5
                      className="fw-semibold mb-2"
                      style={{ color: '#003d73' }}
                    >
                      {review.user}
                    </h5>
                    <p style={{ color: '#0a5c91' }}>{review.text}</p>
                    <p
                      style={{
                        color: '#ffb400',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      ⭐ {review.rating}/5
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ color: '#0a5c91' }}>
              No reviews yet.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
