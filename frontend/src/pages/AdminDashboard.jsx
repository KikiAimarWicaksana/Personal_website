import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('portfolio');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [portForm, setPortForm] = useState({ category: 'website', icon: '🌐', color: '#ff6b9d, #c44569', title: '', desc: '', tech: '', xp: 100, demo: '#', code: '#' });
  const [portImage, setPortImage] = useState(null);

  const [actForm, setActForm] = useState({ year: '2024', icon: '🏆', title: '', desc: '', xp: 100, badge: '' });
  const [actImage, setActImage] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = tab === 'portfolio' ? '/api/portfolio' : '/api/activities';
      const res = await fetch(`${API_URL}${endpoint}`);
      const data = await res.json();
      setItems(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await fetch(`${API_URL}/api/${tab}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(portForm).forEach(key => formData.append(key, portForm[key]));
      if (portImage) formData.append('image', portImage);

      await fetch(`${API_URL}/api/portfolio`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      setPortForm({ category: 'website', icon: '🌐', color: '#ff6b9d, #c44569', title: '', desc: '', tech: '', xp: 100, demo: '#', code: '#' });
      setPortImage(null);
      // Reset file input by unmounting or clearing its value if controlled (using key is a hack but simpler here: not used. we just set state to null)
      document.getElementById('portFile').value = "";
      fetchData();
    } catch (err) {
      alert('Error adding portfolio');
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(actForm).forEach(key => formData.append(key, actForm[key]));
      if (actImage) formData.append('image', actImage);

      await fetch(`${API_URL}/api/activities`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      setActForm({ year: '2024', icon: '🏆', title: '', desc: '', xp: 100, badge: '' });
      setActImage(null);
      document.getElementById('actFile').value = "";
      fetchData();
    } catch (err) {
      alert('Error adding activity');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (loading && !items.length) return <p style={{ color: 'white', padding: '5rem', textAlign: 'center' }}>Loading...</p>;

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-pixel)', color: 'var(--primary)' }}>ADMIN DASHBOARD</h1>
          <button className="pixel-btn-sm" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }} onClick={logout}>LOGOUT</button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button className={`pixel-btn ${tab === 'portfolio' ? 'active' : ''}`} onClick={() => setTab('portfolio')}>PORTFOLIO</button>
          <button className={`pixel-btn ${tab === 'activities' ? 'active' : ''}`} onClick={() => setTab('activities')}>ACTIVITIES</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Data List */}
          <div className="pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-pixel)', color: 'var(--text)', marginBottom: '1.5rem', fontSize: '1rem' }}>EXISTING DATA</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div key={item.id} className="pixel-border-sm" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-pixel)', fontSize: '.7rem', color: 'var(--accent)' }}>{item.title}</strong>
                    <p style={{ fontFamily: 'var(--font-vt)', fontSize: '1.2rem', color: 'var(--text-dim)', margin: '0' }}>{tab === 'portfolio' ? item.category : item.year} | {item.xp} XP</p>
                  </div>
                  <button className="pixel-btn-sm" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }} onClick={() => handleDelete(item.id)}>DEL</button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Form */}
          <div className="pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-pixel)', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1rem' }}>ADD NEW {tab.toUpperCase()}</h3>

            {tab === 'portfolio' ? (
              <form onSubmit={handleAddPortfolio} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input className="pixel-input" placeholder="Title" required value={portForm.title} onChange={e => setPortForm({ ...portForm, title: e.target.value })} />
                <select className="pixel-input" required value={portForm.category} onChange={e => setPortForm({ ...portForm, category: e.target.value })}>
                  <option value="website">Website</option>
                  <option value="data">Data</option>
                  <option value="cloud">Cloud</option>
                </select>
                <textarea className="pixel-input" placeholder="Description" required value={portForm.desc} onChange={e => setPortForm({ ...portForm, desc: e.target.value })} />
                <input className="pixel-input" placeholder="Technologies (comma separated)" required value={portForm.tech} onChange={e => setPortForm({ ...portForm, tech: e.target.value })} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input className="pixel-input" type="number" placeholder="XP" required value={portForm.xp} onChange={e => setPortForm({ ...portForm, xp: e.target.value })} />
                  <input className="pixel-input" placeholder="Icon (emoji)" required value={portForm.icon} onChange={e => setPortForm({ ...portForm, icon: e.target.value })} />
                </div>
                <div style={{ background: 'var(--bg2)', padding: '1rem' }} className="pixel-border-sm">
                  <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '.6rem', color: 'var(--primary)', display: 'block', marginBottom: '.5rem' }}>UPLOAD IMAGE (OPTIONAL)</label>
                  <input id="portFile" type="file" accept="image/*" onChange={e => setPortImage(e.target.files[0])} style={{ color: 'white', fontFamily: 'var(--font-vt)', fontSize: '1rem' }} />
                </div>
                <button type="submit" className="pixel-btn">ADD PORTFOLIO</button>
              </form>
            ) : (
              <form onSubmit={handleAddActivity} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input className="pixel-input" placeholder="Title" required value={actForm.title} onChange={e => setActForm({ ...actForm, title: e.target.value })} />
                <input className="pixel-input" placeholder="Year" required value={actForm.year} onChange={e => setActForm({ ...actForm, year: e.target.value })} />
                <textarea className="pixel-input" placeholder="Description" required value={actForm.desc} onChange={e => setActForm({ ...actForm, desc: e.target.value })} />
                <input className="pixel-input" placeholder="Badge Name" required value={actForm.badge} onChange={e => setActForm({ ...actForm, badge: e.target.value })} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input className="pixel-input" type="number" placeholder="XP" required value={actForm.xp} onChange={e => setActForm({ ...actForm, xp: e.target.value })} />
                  <input className="pixel-input" placeholder="Icon (emoji)" required value={actForm.icon} onChange={e => setActForm({ ...actForm, icon: e.target.value })} />
                </div>
                <div style={{ background: 'var(--bg2)', padding: '1rem' }} className="pixel-border-sm">
                  <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '.6rem', color: 'var(--primary)', display: 'block', marginBottom: '.5rem' }}>UPLOAD IMAGE (OPTIONAL)</label>
                  <input id="actFile" type="file" accept="image/*" onChange={e => setActImage(e.target.files[0])} style={{ color: 'white', fontFamily: 'var(--font-vt)', fontSize: '1rem' }} />
                </div>
                <button type="submit" className="pixel-btn">ADD ACTIVITY</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
