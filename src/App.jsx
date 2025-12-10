// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import BookRoutes from './components/routes/BookRoutes'
import UserRoutes from './components/routes/UserRoutes'
import AuthRoutes from './components/routes/AuthRoutes'
import HomeRoutes from './components/routes/HomeRoutes'
import NotFound from './components/pages/NotFound/NotFound'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/search"></Route>
          <Route path="/users/**"></Route> */}
          <Route path="/books/*" element={<BookRoutes />}></Route>
          <Route path="/users/*" element={<UserRoutes />}></Route>
          <Route path="/auth/*" element={<AuthRoutes />}></Route>
          <Route path="/" element={<HomeRoutes />}></Route>

          <Route path="/not-found" element={<NotFound />} />

          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
