import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '3rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ fontFamily: 'var(--font-pixel)', color: 'var(--primary)', textAlign: 'center', marginBottom: '2rem' }}>
          ADMIN LOGIN
        </h2>
        {error && <p style={{ color: 'var(--secondary)', fontFamily: 'var(--font-vt)', fontSize: '1.2rem', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '.7rem', color: 'var(--text)', marginBottom: '.5rem', display: 'block' }}>USERNAME</label>
            <input 
              type="text" 
              className="pixel-input" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '.7rem', color: 'var(--text)', marginBottom: '.5rem', display: 'block' }}>PASSWORD</label>
            <input 
              type="password" 
              className="pixel-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="pixel-btn" style={{ width: '100%', marginTop: '1rem' }}>LOGIN</button>
        </form>
      </div>
    </section>
  );
}
