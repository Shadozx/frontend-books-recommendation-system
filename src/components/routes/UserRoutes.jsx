import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useParams,
  Navigate
} from 'react-router-dom'
import UserInfo from '../pages/users/UserInfo/UserInfo'
import UserProfile from '../pages/users/UserProfile/UserProfile'

export default function UserRoutes() {
  console.log('userroutes')

  return (
    <Routes>
      <Route path="/:id" element={<UserInfo />}></Route>
      <Route path='/profile' element={<UserProfile/>}></Route>
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}
