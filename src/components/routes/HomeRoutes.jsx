import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useParams,
} from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'

export default function HomeRoutes() {
  console.log('home')

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  )
}
