import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", { email, password });
    // TODO: додати запит до API
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "380px", borderRadius: "16px" }}>
        <h3 className="text-center mb-3">Вхід</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Електронна пошта</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введіть пароль"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Увійти
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Немає акаунта?{" "}
          <Link to="/auth/registration" className="text-decoration-none">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}
