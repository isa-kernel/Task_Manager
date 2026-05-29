import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../App.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      console.log(data);

      alert('Registration successful');
    } catch (error) {
      console.log(error);

      alert('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />

        <br />
        <br />

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
          Register
        </button>
      </form>

    <p style={{ marginTop: '15px' }}>
      Already have an account?{' '}
      <Link to="/">
        Login
      </Link>
    </p>

    </div>
  );
}