import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

// We can add a type for the error string (optional but clearer)
const LoginPage: React.FC = () => {
  // useState<string>("") -> React state that holds a string
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // e: React.FormEvent is the type for form submit event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authApi.login({ email, password });
      // res.data has token and user (as we designed in backend)
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err: any) {
      // 'any' = fallback type when we’re not sure (similar to JS)
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            // e is a React.ChangeEvent<HTMLInputElement>
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="auth-switch-text">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
