import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../services/authService';
import '../app.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      // Save user data + token
      localStorage.setItem(
        'user',
        JSON.stringify(data)
      );

      alert('Login successful');

      navigate('/dashboard');
    } catch (error) {
      console.log(error);

      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
          <p style={{ marginTop: '15px' }}>
      Don't have an account?{' '}
      <Link to="/register">
        Register
      </Link>
    </p>

    </div>
  );
}