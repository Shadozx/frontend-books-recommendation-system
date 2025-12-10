import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useParams,
  Navigate
} from 'react-router-dom'

import Login from '../pages/auth/Login/Login'
import Registration from '../pages/auth/Registration/Registration'

export default function AuthRoutes() {
  console.log('authroutes')

  return (
    <Routes>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}
