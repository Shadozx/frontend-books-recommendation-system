import React, { useState } from 'react'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'

export default function Registration() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  document.title = "Registration"


  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const res = await fetch('http://localhost:8000/auth/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    if (!res.ok) {
      setError('User already exists or invalid data')
      return
    }

    setSuccess('Registration successful! Redirecting...')
    setTimeout(() => (window.location.href = '/auth/login'), 1200)
  }

  return (
    <>
      <Navbar />

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          backgroundColor: '#f6fbfc',
          paddingTop: '40px'
        }}
      >
        <div
          className="bg-white shadow-sm rounded-4 p-5"
          style={{
            width: '100%',
            maxWidth: '500px',
            border: '1px solid #d0e7f3'
          }}
        >
          <h2
            className="fw-bold mb-4 text-center"
            style={{ color: '#003d73', fontSize: '2rem' }}
          >
            Create Account
          </h2>

          {error && (
            <p className="text-center mb-3" style={{ color: '#d9534f' }}>
              {error}
            </p>
          )}
          {success && (
            <p className="text-center mb-3" style={{ color: '#28a745' }}>
              {success}
            </p>
          )}

          <form onSubmit={handleRegister}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label" style={{ color: '#0a5c91' }}>
                Username
              </label>
              <input
                type="text"
                className="form-control rounded-pill shadow-sm"
                style={{ padding: '12px 16px', borderColor: '#d0e7f3' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label" style={{ color: '#0a5c91' }}>
                Email
              </label>
              <input
                type="email"
                className="form-control rounded-pill shadow-sm"
                style={{ padding: '12px 16px', borderColor: '#d0e7f3' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label" style={{ color: '#0a5c91' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control rounded-pill shadow-sm"
                style={{ padding: '12px 16px', borderColor: '#d0e7f3' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm password */}
            <div className="mb-4">
              <label className="form-label" style={{ color: '#0a5c91' }}>
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control rounded-pill shadow-sm"
                style={{ padding: '12px 16px', borderColor: '#d0e7f3' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn text-white w-100 rounded-pill shadow-sm"
              style={{
                backgroundColor: '#00a9b7',
                padding: '10px 16px',
                fontWeight: '500',
                fontSize: '1rem'
              }}
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4" style={{ color: '#0a5c91' }}>
            Already have an account?{' '}
            <a
              href="/auth/login"
              style={{ color: '#003d73', fontWeight: '600', textDecoration: 'none' }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}
