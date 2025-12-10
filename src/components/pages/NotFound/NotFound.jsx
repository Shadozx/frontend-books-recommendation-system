import React, { useEffect } from "react"
import Navbar from "../../fragments/Navbar/Navbar"
import Footer from "../../fragments/Footer/Footer"

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found — BookSense"
  }, [])

  return (
    <>
      <Navbar />

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f6fbfc",
          paddingTop: "40px",
        }}
      >
        <div
          className="bg-white shadow-sm rounded-4 p-5 text-center"
          style={{
            width: "100%",
            maxWidth: "550px",
            border: "1px solid #d0e7f3",
          }}
        >
          <h1
            className="fw-bold mb-3"
            style={{ color: "#003d73", fontSize: "2.4rem" }}
          >
            404
          </h1>

          <h3
            className="fw-semibold mb-3"
            style={{ color: "#0a5c91", fontSize: "1.4rem" }}
          >
            Page Not Found
          </h3>

          <p
            className="mb-4"
            style={{
              color: "#0a5c91",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            The page you are looking for doesn't exist or was moved.
          </p>

          <a
            href="/"
            className="btn text-white rounded-pill shadow-sm"
            style={{
              backgroundColor: "#00a9b7",
              padding: "10px 24px",
              fontWeight: "500",
              fontSize: "1rem",
            }}
          >
            Back to Home
          </a>
        </div>
      </div>

      <Footer />
    </>
  )
}
