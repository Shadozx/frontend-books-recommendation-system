import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useAuthUser } from '../../../hooks/useAuthUser'

export default function BookInfo() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const authUser = useAuthUser()
  console.log(authUser)

  const token = localStorage.getItem('book-recommendation-token')

  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({
    summary: '',
    text: '',
    score: 5,
    user_id: authUser?.id, // тимчасово, поки не буде юзерів
  })

  useEffect(() => {
    const fetchBook = async () => {
      console.log(id)

      // --- 1. Основна книга ---
      const bookRes = await fetch(`http://localhost:8000/books/${id}`)
      console.log(bookRes)

      if (!bookRes.ok) throw new Error('Book not found')
      const bookData = await bookRes.json()
      setBook(bookData)
    }

    fetchBook()
  }, [id])

  useEffect(() => {
    // --- 2. Рекомендації ---
    const fetchRecommendations = async () => {
      const recRes = await fetch(
        `http://localhost:8000/recommendations/${id}/similar`
      )
      if (recRes.ok) {
        // console.log(recRes);

        const recData = await recRes.json()
        console.log(recData)
        console.log('rec')

        // Підвантажимо деталі книг по їх ID
        const recBooks = recData.books /*await Promise.all(
          recData.books.map(async (r) => {
            const bRes = await fetch(`http://localhost:8000/books/${r.book_id}`)
            return await bRes.json()
          })
        )*/
        console.log('rec books:', recBooks)

        setRecommendations(recBooks)
        console.log(recommendations.length)
      }
    }

    fetchRecommendations()
  }, [book])

  useEffect(() => {
    // --- 3. Відгуки ---
    const fetchReviews = async () => {
      const revRes = await fetch(`http://localhost:8000/reviews/book/${id}`)
      if (revRes.ok) {
        const revData = await revRes.json()
        setReviews(revData)

        // Для кожного відгуку підвантажуємо користувача
        const revWithUser = await Promise.all(
          revData.map(async (review) => {
            const userRes = await fetch(
              `http://localhost:8000/users/${review.user_id}`
            )
            if (!userRes.ok) throw new Error('User not found')
            const userData = await userRes.json()

            return {
              ...review,
              username: userData.username,
            }
          })
        )

        setReviews(revWithUser)
        setLoading(false)
      }
    }
    fetchReviews()
  }, [recommendations])

  const handleSubmitReview = async () => {
    try {
      console.log(newReview)

      const res = await fetch(`http://localhost:8000/reviews/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      })
      console.log(res)

      if (!res.ok) throw new Error('Error saving review')

      const created = await res.json()

      // Додаємо у список
      setReviews([{ ...created, username: 'You' }, ...reviews])

      // Ховаємо форму
      setShowForm(false)

      // Очищуємо поля
      setNewReview({
        summary: '',
        text: '',
        score: 5,
      })
    } catch (e) {
      console.error(e)
      alert('Failed to submit review')
    }
  }

  if (loading) return <p className="text-center mt-5">Loading...</p>
  if (!book) return <p className="text-center mt-5">Book not found</p>

  return (
    <>
      <Navbar />
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: '#f6fbfc', minHeight: '100vh' }}
      >
        <h1
          className="text-center fw-bold mb-4"
          style={{ color: '#0a5c91', fontSize: '2.5rem' }}
        >
          Book Information
        </h1>

        {/* Основний блок книги */}
        <div
          className="container bg-white shadow-sm rounded-4 p-4 mb-5"
          style={{ maxWidth: '1100px' }}
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
                  src={book.image_url}
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
              {book.authors && (
                <p
                  className="mb-1"
                  style={{
                    color: '#0a5c91',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                  }}
                >
                  by {book.authors.join(', ')}
                </p>
              )}
              {book.categories && (
                <p style={{ color: '#0a5c91', fontSize: '1rem' }}>
                  Categories: {book.categories.join(', ')}
                </p>
              )}
              {book.published_date && (
                <p style={{ color: '#0a5c91', fontSize: '1rem' }}>
                  Published: {book.published_date || 'N/A'}
                </p>
              )}
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
              {/* {book.avg_rating && (
                <p
                  style={{
                    color: '#ffb400',
                    fontWeight: '500',
                    fontSize: '1rem',
                  }}
                >
                  ⭐ {book.avg_rating} / 5
                </p>
              )} */}
            </div>
          </div>
        </div>

        {/* Рекомендовані книги */}
        {recommendations.length > 0 && (
          <div className="container mb-5" style={{ maxWidth: '1100px' }}>
            <h3
              className="fw-bold mb-4"
              style={{ color: '#0a5c91', fontSize: '1.8rem' }}
            >
              Users also read books
            </h3>
            <div
              className="row justify-content-start"
              style={{ rowGap: '30px' }}
            >
              {recommendations.map((rec) => (
                <div key={rec.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
                  <div
                    className="card flex-fill border-0 shadow-sm rounded-4 overflow-hidden"
                    style={{ backgroundColor: '#ffffff', cursor: 'pointer' }}
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
                      {rec?.authors && (
                        <p
                          className="mb-2"
                          style={{ fontSize: '0.9rem', color: '#0a5c91' }}
                        >
                          by {rec?.authors.join(', ')}
                        </p>
                      )}

                      {rec?.categories && (
                        <p
                          className="mb-2"
                          style={{ fontSize: '0.9rem', color: '#0a5c91' }}
                        >
                          Categories: {rec?.categories.join(', ')}
                        </p>
                      )}
                      <a
                        href={`/books/${rec.id}`}
                        className="btn btn-sm rounded-pill text-white mt-auto"
                        style={{
                          backgroundColor: '#00a9b7',
                          padding: '6px 14px',
                          fontWeight: '500',
                          fontSize: '0.85rem',
                        }}
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Відгуки */}
        <div className="container mb-5" style={{ maxWidth: '1100px' }}>
          <h3
            className="fw-bold mb-4"
            style={{ color: '#0a5c91', fontSize: '1.8rem' }}
          >
            Reviews
          </h3>

          {/* Кнопка Add review */}
          <button
            className="btn text-white fw-semibold mb-4"
            style={{
              backgroundColor: '#003d73',
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '0.95rem',
              boxShadow: '0 4px 8px rgba(0,100,255,0.15)',
              transition: 'background-color 0.2s ease',
            }}
            onClick={() => setShowForm(true)}
          >
            Add review
          </button>

          {/* Форма додавання відгуку */}
          {showForm && (
            <div
              className="p-4 rounded-4 shadow-sm mb-5"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #d0e7f3',
              }}
            >
              <h4 className="fw-bold mb-3" style={{ color: '#003d73' }}>
                Add new review
              </h4>

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: '#0a5c91' }}
                >
                  Summary
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newReview.summary}
                  onChange={(e) =>
                    setNewReview({ ...newReview, summary: e.target.value })
                  }
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: '#0a5c91' }}
                >
                  Review text
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  style={{ borderRadius: '10px' }}
                ></textarea>
              </div>

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: '#0a5c91' }}
                >
                  Rating (1–5)
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="5"
                  value={newReview.score}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      score: Number(e.target.value),
                    })
                  }
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn text-white fw-semibold"
                  style={{
                    backgroundColor: '#003d73',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 8px rgba(0,100,255,0.15)',
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={handleSubmitReview}
                >
                  Submit review
                </button>

                <button
                  className="btn text-white fw-semibold"
                  style={{
                    backgroundColor: '#00a9b7',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 8px rgba(0,169,183,0.15)',
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

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
                      className="fw-semibold mb-1"
                      style={{ color: '#003d73' }}
                    >
                      <a
                        href={`/users/${review.user_id}`}
                        style={{ color: '#003d73', textDecoration: 'none' }}
                      >
                        {review.username}
                      </a>
                    </h5>
                    <p
                      className="mb-2"
                      style={{ color: '#0a5c91', fontStyle: 'italic' }}
                    >
                      {review.summary}
                    </p>
                    <p style={{ color: '#0a5c91' }}>
                      {review?.text?.length > 250
                        ? review.text.substring(0, 250) + '…'
                        : review.text}
                    </p>
                    <p
                      style={{
                        color: '#ffb400',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      ⭐ {review.score}/5
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
