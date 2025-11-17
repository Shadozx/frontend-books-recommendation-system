import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Паролі не співпадають!");
      return;
    }
    console.log("Registration data:", { name, email, password });
    // TODO: додати запит до API
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "16px" }}>
        <h3 className="text-center mb-3">Реєстрація</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Ім’я користувача</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ваше ім’я"
            />
          </div>
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
          <div className="mb-3">
            <label className="form-label">Підтвердження пароля</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Повторіть пароль"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Зареєструватися
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Уже є акаунт?{" "}
          <Link to="/auth/login" className="text-decoration-none">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}
