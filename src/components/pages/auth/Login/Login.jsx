import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  document.title = 'Log In'

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      setError('Invalid email or password')
      return
    }

    const data = await res.json()
    console.log(data)

    // Збереження токену
    localStorage.setItem('book-recommendation-token', data.access_token)

    navigate('/', { replace: true })
  }

  return (
    <>
      <Navbar />

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          backgroundColor: '#f6fbfc',
          paddingTop: '40px',
        }}
      >
        <div
          className="bg-white shadow-sm rounded-4 p-5"
          style={{
            width: '100%',
            maxWidth: '450px',
            border: '1px solid #d0e7f3',
          }}
        >
          <h2
            className="fw-bold mb-4 text-center"
            style={{ color: '#003d73', fontSize: '2rem' }}
          >
            Log In
          </h2>

          {error && (
            <p className="text-center mb-3" style={{ color: '#d9534f' }}>
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#0a5c91' }}>
                Email
              </label>
              <input
                type="email"
                className="form-control rounded-pill shadow-sm"
                style={{
                  padding: '12px 16px',
                  borderColor: '#d0e7f3',
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ color: '#0a5c91' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control rounded-pill shadow-sm"
                style={{
                  padding: '12px 16px',
                  borderColor: '#d0e7f3',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100 rounded-pill shadow-sm"
              style={{
                backgroundColor: '#00a9b7',
                padding: '10px 16px',
                fontWeight: '500',
                fontSize: '1rem',
              }}
            >
              Log In
            </button>
          </form>

          <p className="text-center mt-4" style={{ color: '#0a5c91' }}>
            Don’t have an account?{' '}
            <a
              href="/auth/registration"
              style={{
                color: '#003d73',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Register
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}
