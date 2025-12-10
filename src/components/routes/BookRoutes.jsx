import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useParams,
  Navigate
} from 'react-router-dom'
import BookSearch from '../pages/books/BookSearch/BookSearch'
import BookCardList from '../pages/books/BookCardsList/BookCardsList'
import BookInfo from '../pages/books/BookInfo/BookInfo'

export default function BookRoutes() {
  console.log('bookroutes')

  return (
    <Routes>
      <Route path="/search" element={<BookSearch />}></Route>
      <Route path="/catalog" element={<BookCardList />}></Route>
      <Route path="/:id" element={<BookInfo />}></Route>
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}
