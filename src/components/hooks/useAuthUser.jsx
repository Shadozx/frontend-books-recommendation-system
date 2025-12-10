import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function useAuthUser() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('book-recommendation-token')
      if (!token) {
        navigate('/auth/login')
        return
      }

      console.log('Token:', token)

      const res = await fetch('http://localhost:8000/users/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method:'GET'
      })

      const data = await res.json()
      console.log('auth user: ', data)
      data.token = token

      setUser(data)
    }

    fetchMe()
  }, [navigate])

  return user
}
