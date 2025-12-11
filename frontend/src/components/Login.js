import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/students');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Particles.js background */}
      <Particles
        options={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800
              }
            },
            shape: {
              type: 'circle',
            },
            color: {
              value: '#ffffff',
            },
            size: {
              value: 5,
              random: true,
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'bounce',
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
            },
          },
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      {/* Login Form */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate('/register')}
          style={{
            marginTop: '15px',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Go to Register
        </button>
      </div>
    </div>
  );
};

export default Login;
