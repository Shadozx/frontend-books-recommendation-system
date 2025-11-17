import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useParams,
} from 'react-router-dom'
import BookSearch from '../pages/books/BookSearch/BookSearch'
import BookCardList from '../pages/books/BookCardsList/BookCardsList'
import BookInfo from '../pages/books/BookInfo/BookInfo'
import Login from '../pages/auth/Login/Login'
import Registration from '../pages/auth/Registration/Registration'

export default function AuthRoutes() {
  console.log('authroutes')

  return (
    <Routes>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  )
}
