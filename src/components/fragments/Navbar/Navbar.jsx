// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function Navbar() {
//   return (
//     <nav className="navbar navbar-expand navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           BookSense
//         </Link>
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/books/catalog">
//                 Catalog
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/books/search">
//                 Search Books
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/users">
//                 Users
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const nameItem = 'book-recommendation-token'
  const navigate = useNavigate()
  const token = localStorage.getItem(nameItem)
  const isLoggedIn = !!token

  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Сторінки, які не потребують авторизації
    const publicPaths = ['/auth/login', '/auth/registration', '/not-found']

    // Якщо користувач не авторизований і не на публічній сторінці
    if (!isLoggedIn && !publicPaths.includes(location.pathname)) {
      navigate('/auth/login', { replace: true })
    }
  }, [isLoggedIn, location.pathname, navigate])

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem(nameItem)
      navigate('/', { replace: true })
    } else {
      navigate('/auth/login', { replace: true })
    }
  }

  return (
    <nav
      className="shadow-sm py-3"
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #d0e7f3',
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Логотип */}
        <Link
          to="/"
          className="fw-bold text-decoration-none"
          style={{ color: '#003d73', fontSize: '1.6rem' }}
        >
          BookSense
        </Link>

        {/* Меню */}
        <ul
          className="d-flex list-unstyled m-0 gap-4 align-items-center"
          style={{ fontWeight: '500', fontSize: '1rem' }}
        >
          <li>
            <Link
              to="/books/catalog"
              className="text-decoration-none"
              style={{ color: '#0a5c91', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.target.style.color = '#00a9b7')}
              onMouseLeave={(e) => (e.target.style.color = '#0a5c91')}
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/books/search"
              className="text-decoration-none"
              style={{ color: '#0a5c91', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.target.style.color = '#00a9b7')}
              onMouseLeave={(e) => (e.target.style.color = '#0a5c91')}
            >
              Search
            </Link>
          </li>
        </ul>

        {/* Кнопки авторизації */}
        <div className="d-flex gap-2">
          {isLoggedIn && (
            <Link
              to="/users/profile"
              className="btn text-white fw-semibold"
              style={{
                backgroundColor: '#003d73',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.95rem',
                boxShadow: '0 4px 8px rgba(0,100,255,0.15)',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#0073b1')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#003d73')
              }
            >
              Profile
            </Link>
          )}

          <button
            onClick={handleAuthClick}
            className="border-0 text-white fw-semibold"
            style={{
              backgroundColor: isLoggedIn ? '#00a9b7' : '#0a5c91',
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '0.95rem',
              boxShadow: '0 4px 8px rgba(0,100,255,0.15)',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = isLoggedIn
                ? '#008c9a'
                : '#0073b1')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = isLoggedIn
                ? '#00a9b7'
                : '#0a5c91')
            }
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  )
}
