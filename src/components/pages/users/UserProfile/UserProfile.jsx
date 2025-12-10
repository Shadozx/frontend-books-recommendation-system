import React, { useState, useEffect } from 'react'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'
import { useAuthUser } from '../../../hooks/useAuthUser'

export default function UserProfile() {
  const authUser = useAuthUser()

  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const [editingReviewId, setEditingReviewId] = useState(null)
  const [editedSummary, setEditedSummary] = useState('')
  const [editedText, setEditedText] = useState('')
  const [editedScore, setEditedScore] = useState(5)

  // Завантаження відгуків авторизованого користувача
  useEffect(() => {
    if (!authUser?.id) return

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/reviews/user/${authUser.id}`
        )
        if (!res.ok) throw new Error('Reviews not found')

        setReviews(await res.json())
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [authUser])

  // --- Save edited review ---
  const handleSaveEdit = async (reviewId) => {
    try {
      const res = await fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: editedSummary,
          text: editedText,
          score: editedScore,
        }),
      })

      if (!res.ok) throw new Error('Failed to update review')

      // Update local state
      const updatedReviews = reviews.map((r) =>
        r.id === reviewId ? { ...r, text: editedText, score: editedScore } : r
      )
      setReviews(updatedReviews)
      setEditingReviewId(null)
    } catch (e) {
      console.error(e)
    }
  }

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
          {authUser?.username}'s Profile
        </h1>

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
                {authUser?.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="col-md-8">
              <h2
                className="fw-semibold mb-2"
                style={{ color: '#003d73', fontSize: '1.8rem' }}
              >
                {authUser?.username}
              </h2>

              <p style={{ color: '#0a5c91', fontSize: '1rem' }}>
                Total Reviews: {reviews.length}
              </p>
            </div>
          </div>
        </div>

        <div className="container mb-5" style={{ maxWidth: '1100px' }}>
          <h3
            className="fw-bold mb-4"
            style={{ color: '#0a5c91', fontSize: '1.8rem' }}
          >
            Your Reviews
          </h3>

          {loading ? (
            <p className="text-center" style={{ color: '#0a5c91' }}>
              Loading...
            </p>
          ) : reviews.length > 0 ? (
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

                    {editingReviewId === review.id ? (
                      <>
                        <textarea
                          className="form-control mb-2"
                          style={{ width: '100%', resize: 'vertical' }}
                          rows="5"
                          value={editedSummary}
                          onChange={(e) => setEditedSummary(e.target.value)}
                        />
                        <textarea
                          className="form-control mb-2"
                          style={{ width: '100%', resize: 'vertical' }}
                          rows="5"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-control mb-2"
                          style={{ width: '100%' }}
                          min="1"
                          max="5"
                          value={editedScore}
                          onChange={(e) =>
                            setEditedScore(Number(e.target.value))
                          }
                        />
                        <div className="d-flex gap-2">
                          <button
                            className="border-0 text-white fw-semibold"
                            style={{
                              backgroundColor: '#0a5c91',
                              padding: '8px 18px',
                              borderRadius: '20px',
                              fontSize: '0.95rem',
                              boxShadow: '0 4px 8px rgba(0,100,255,0.15)',
                              transition: 'background-color 0.2s ease',
                            }}
                            onClick={() => handleSaveEdit(review.id)}
                          >
                            Save Changes
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{
                              padding: '8px 18px',
                              borderRadius: '20px',
                              fontSize: '0.95rem',
                              boxShadow: '0 4px 8px rgba(0,100,255,0.15)',
                              transition: 'background-color 0.2s ease',
                            }}
                            onClick={() => setEditingReviewId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
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
                        <div className="mt-3 d-flex flex-column gap-1">
                          <p
                            style={{
                              color: '#ffb400',
                              fontWeight: '500',
                              fontSize: '0.9rem',
                              marginBottom: 0,
                            }}
                          >
                            ⭐ {review.score}/5
                          </p>
                          <p
                            style={{
                              color: '#0a5c91',
                              fontSize: '0.9rem',
                              marginBottom: 0,
                            }}
                          >
                            Reviewed on: {review.time}
                          </p>
                          <button
                            className="border-0 text-white fw-semibold"
                            style={{
                              backgroundColor: '#00a9b7',
                              padding: '8px 18px',
                              borderRadius: '20px',
                              fontSize: '0.95rem',
                              boxShadow: '0 4px 8px rgba(0,100,255,0.15)',
                              transition: 'background-color 0.2s ease',
                            }}
                            onClick={() => {
                              setEditedSummary(review.summary)
                              setEditingReviewId(review.id)
                              setEditedText(review.text)
                              setEditedScore(review.score)
                            }}
                          >
                            Edit Review
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ color: '#0a5c91' }}>
              You have no reviews yet.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
