// import axios from 'axios'
// import Navbar from '../../../fragments/Navbar/Navbar'
// import React, { useState, useEffect } from 'react'

// export default function UserRecommendations() {
//   const [selectedUser, setSelectedUser] = useState('')
//   const [users, setUsers] = useState([])
//   const [recommendations, setRecommendations] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   // Завантаження списку користувачів
//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const response = await axios.get('http://localhost:9000/users')
//         // console.log(response.data) // Перевіряємо, що приходить від сервера
//         const responseData = (await response).data

//         // console.log(responseData)

//         // Перевіряємо, чи є дані масивом
//         if (Array.isArray(responseData)) {
//           setUsers(responseData.filter((user) => user.id && user.name))

//           //   setUsers(response.data)
//         } else {
//           console.error('Data is not in expected array format')
//           // Можна вивести тип даних для кращого розуміння
//           console.error('Data type:', typeof response.data)
//         }
//       } catch (error) {
//         console.error('Error fetching users:', error)
//       }
//     }
//     fetchUsers()
//   }, [])

//   const fetchRecommendations = async () => {
//     if (!selectedUser) {
//       setError('Please select a user')
//       return
//     }

//     try {
//       setLoading(true)
//       setError('')
//       setRecommendations([])

//       const response = await axios.post('http://localhost:9000/books/users', {
//         user_id: selectedUser,
//         top_n: 5,
//       })

//       setRecommendations(response.data)
//       setLoading(false)
//     } catch (err) {
//       setError('Failed to fetch recommendations')
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h1 className="text-center mb-4">Personalized Book Recommendations</h1>

//         {/* Вибір користувача зі списку */}
//         <div className="mb-4">
//           <label htmlFor="userSelect" className="form-label">
//             Select User:
//           </label>
//           <select
//             id="userSelect"
//             className="form-select"
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//           >
//             <option value="">-- Select a User --</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="text-center mb-4">
//           <button className="btn btn-primary" onClick={fetchRecommendations}>
//             Get Recommendations
//           </button>
//         </div>

//         {loading && (
//           <div className="d-flex justify-content-center">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}

//         {error && <div className="alert alert-danger">{error}</div>}

//         {recommendations.length > 0 && (
//           <ul className="list-group">
//             {recommendations.map((book) => (
//               <li key={book.id} className="list-group-item">
//                 <h5>
//                   <a href={`/books/${book.id}`}>{book.title}</a>
//                 </h5>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   )
// }

import React, { useState, useEffect } from 'react'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'


export default function UserInfo() {
  const [user] = useState({
    id: 1,
    nickname: 'BookLover123',
    joinDate: '2025-01-02',
    totalReviews: 3,
    avgRating: 4.6,
  })

  const [reviews] = useState([
    {
      id: 101,
      title: 'Atomic Habits',
      summary: 'Life-changing book about building habits.',
      score: 5,
      helpfulness: '10/12',
      text: 'This book completely changed how I think about progress and motivation. The examples are simple but powerful.',
      time: '2025-04-18',
      // price: '₹203.00',
    },
    {
      id: 102,
      title: 'Deep Work',
      summary: 'Essential for productivity.',
      score: 4,
      helpfulness: '7/9',
      text: 'Very insightful. Makes you rethink how distractions impact real focus.',
      time: '2025-07-02',
      // price: '₹250.00',
    },
    {
      id: 103,
      title: 'Can’t Hurt Me',
      summary: 'Intense but motivating.',
      score: 5,
      helpfulness: '5/6',
      text: 'Raw, honest, and truly inspiring. David Goggins’ mindset is on another level.',
      time: '2025-01-10',
      // price: '₹310.00',
    },
  ])

  const [recommendations] = useState([
    {
      id: 201,
      title: 'The Power of Now',
      authors: 'Eckhart Tolle',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-2pAOkmRdvWof-zrJaf5-soLTsO-cHQ_BQ&s',
    },
    {
      id: 202,
      title: 'Mindset: The New Psychology of Success',
      authors: 'Carol S. Dweck',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTVnIJrWYK2L4BfRQ1m-xVXxD6akSvt-PRe8TdU_79ZBfbwVU8m',
    },
    {
      id: 203,
      title: 'The Subtle Art of Not Giving a F*ck',
      authors: 'Mark Manson',
      image: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg',
    },
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
          User Profile
        </h1>

        {/* Інформація про користувача */}
        <div
          className="container bg-white shadow-sm rounded-4 p-4 mb-5"
          style={{ maxWidth: '900px' }}
        >
          <div className="row g-4 align-items-center">
            <div className="col-md-4 d-flex justify-content-center">
              <div
                style={{
                  backgroundColor: '#e8f3f8',
                  borderRadius: '50%',
                  width: '160px',
                  height: '160px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '3rem',
                  color: '#0a5c91',
                  fontWeight: 'bold',
                }}
              >
                {user.nickname.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="col-md-8">
              <h2
                className="fw-semibold mb-2"
                style={{ color: '#003d73', fontSize: '1.8rem' }}
              >
                {user.nickname}
              </h2>
              <p style={{ color: '#0a5c91', fontSize: '1.1rem' }}>
                Joined on: {user.joinDate}
              </p>
              <p style={{ color: '#0a5c91', fontSize: '1rem' }}>
                Total Reviews: {user.totalReviews}
              </p>
              <p
                style={{
                  color: '#ffb400',
                  fontWeight: '500',
                  fontSize: '1rem',
                }}
              >
                ⭐ Average Rating: {user.avgRating}/5
              </p>
            </div>
          </div>
        </div>

        {/* Рецензії користувача */}
        <div className="container mb-5" style={{ maxWidth: '1100px' }}>
          <h3
            className="fw-bold mb-4"
            style={{ color: '#0a5c91', fontSize: '1.8rem' }}
          >
            User Reviews
          </h3>

          {reviews.length > 0 ? (
            <div className="row g-4">
              {reviews.map((review) => (
                <div key={review.id} className="col-md-6">
                  <div
                    className="p-4 rounded-4 shadow-sm h-100 d-flex flex-column"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d0e7f3',
                    }}
                  >
                    <h5
                      className="fw-semibold mb-1"
                      style={{ color: '#003d73' }}
                    >
                      {review.title}
                    </h5>
                    <p
                      className="mb-2"
                      style={{ color: '#0a5c91', fontWeight: 500 }}
                    >
                      {review.summary}
                    </p>
                    <p
                      className="flex-grow-1"
                      style={{
                        color: '#0a5c91',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                      }}
                    >
                      {review.text}
                    </p>

                    <div className="mt-3">
                      <p
                        style={{
                          color: '#ffb400',
                          fontWeight: '500',
                          fontSize: '0.9rem',
                          marginBottom: '0.2rem',
                        }}
                      >
                        ⭐ {review.score}/5
                      </p>
                      <p
                        style={{
                          color: '#0a5c91',
                          fontSize: '0.9rem',
                          marginBottom: '0.2rem',
                        }}
                      >
                        Helpfulness: {review.helpfulness}
                      </p>
                      <p
                        style={{
                          color: '#0a5c91',
                          fontSize: '0.9rem',
                          marginBottom: '0.2rem',
                        }}
                      >
                        Reviewed on: {review.time}
                      </p>
                      {/* <p
                        style={{
                          color: '#0047ab',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                        }}
                      >
                        {review.price}
                      </p> */}
                    </div>
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

        {/* Рекомендації користувачу */}
        <div className="container mb-5" style={{ maxWidth: '1100px' }}>
          <h3
            className="fw-bold mb-4"
            style={{ color: '#0a5c91', fontSize: '1.8rem' }}
          >
            Books you might like
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
      </div>
      <Footer />
    </>
  )
}
