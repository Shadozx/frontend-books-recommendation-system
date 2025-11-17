import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useParams,
} from 'react-router-dom'
import UserInfo from '../pages/users/UserInfo/UserInfo'

export default function UserRoutes() {
  console.log('userroutes')

  return (
    <Routes>
      <Route path="/:id" element={<UserInfo />}></Route>
    </Routes>
  )
}
