import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('portfolio');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [portForm, setPortForm] = useState({ category: 'website', icon: '🌐', color: '#ff6b9d, #c44569', title: '', desc: '', tech: '', xp: 100, demo: '', code: '', year: new Date().getFullYear() });
  const [portImage, setPortImage] = useState(null);

  const [actForm, setActForm] = useState({ year: '2024', icon: '🏆', title: '', desc: '', xp: 100, badge: '' });
  const [actImage, setActImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    setEditId(null);
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
    if (!window.confirm('Are you sure you want to delete this quest?')) return;
    try {
      const res = await fetch(`${API_URL}/api/${tab}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete');
      }
      fetchData();
    } catch (err) {
      alert(`Error deleting item: ${err.message}`);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    if (tab === 'portfolio') {
      setPortForm({
        category: item.category,
        icon: item.icon,
        color: item.color,
        title: item.title,
        desc: item.desc,
        tech: Array.isArray(item.tech) ? item.tech.join(', ') : item.tech,
        xp: item.xp,
        demo: item.demo || '',
        code: item.code || '',
        year: item.year || '',
        existingImage: item.image
      });
    } else {
      setActForm({
        year: item.year,
        icon: item.icon,
        title: item.title,
        desc: item.desc,
        xp: item.xp,
        badge: item.badge,
        existingImage: item.image
      });
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setPortForm({ category: 'website', icon: '🌐', color: '#ff6b9d, #c44569', title: '', desc: '', tech: '', xp: 100, demo: '', code: '', year: new Date().getFullYear() });
    setActForm({ year: '2024', icon: '🏆', title: '', desc: '', xp: 100, badge: '' });
    setPortImage(null);
    setActImage(null);
    if (document.getElementById('portFile')) document.getElementById('portFile').value = "";
    if (document.getElementById('actFile')) document.getElementById('actFile').value = "";
  };

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const sanitizedForm = {
        ...portForm,
        demo: portForm.demo.startsWith('#') ? portForm.demo.substring(1) : portForm.demo,
        code: portForm.code.startsWith('#') ? portForm.code.substring(1) : portForm.code
      };
      Object.keys(sanitizedForm).forEach(key => formData.append(key, sanitizedForm[key]));
      if (portImage) formData.append('image', portImage);

      const method = editId ? 'PUT' : 'POST';
      const endpoint = editId ? `/api/portfolio/${editId}` : '/api/portfolio';

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      handleCancel();
      fetchData();
      alert(editId ? 'Quest updated!' : 'Quest added!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(actForm).forEach(key => formData.append(key, actForm[key]));
      if (actImage) formData.append('image', actImage);

      const method = editId ? 'PUT' : 'POST';
      const endpoint = editId ? `/api/activities/${editId}` : '/api/activities';

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      handleCancel();
      fetchData();
      alert(editId ? 'Activity updated!' : 'Activity added!');
    } catch (err) {
      alert('Error: ' + err.message);
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

        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Data List */}
          <div className="pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-pixel)', color: 'var(--text)', marginBottom: '1.5rem', fontSize: '1rem' }}>EXISTING DATA</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div key={item.id} className="pixel-border-sm" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-pixel)', fontSize: '.7rem', color: 'var(--accent)' }}>{item.title}</strong>
                    <p style={{ fontFamily: 'var(--font-vt)', fontSize: '1.2rem', color: 'var(--text-dim)', margin: '0' }}>{item.category} {item.year ? `(${item.year})` : ''} | {item.xp} XP</p>
                  </div>
                  <div style={{ display: 'flex', gap: '.5rem' }}>
                    <button className="pixel-btn-sm" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={() => handleEdit(item)}>EDIT</button>
                    <button className="pixel-btn-sm" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }} onClick={() => handleDelete(item.id)}>DEL</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Form */}
          <div className="pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-pixel)', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1rem' }}>{editId ? 'EDIT' : 'ADD NEW'} {tab.toUpperCase()}</h3>

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
                  <input className="pixel-input" type="number" placeholder="Year" required value={portForm.year} onChange={e => setPortForm({ ...portForm, year: e.target.value })} />
                  <input className="pixel-input" type="number" placeholder="XP" required value={portForm.xp} onChange={e => setPortForm({ ...portForm, xp: e.target.value })} />
                </div>
                <select className="pixel-input" required value={portForm.icon} onChange={e => setPortForm({ ...portForm, icon: e.target.value })}>
                  <option value="">-- Select Icon --</option>
                  <option value="📊">📊 Data</option>
                  <option value="☁️">☁️ Cloud</option>
                  <option value="🌐">🌐 Website</option>
                  <option value="📱">📱 Mobile</option>
                  <option value="🎮">🎮 Game</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '.5rem', color: 'var(--accent)', display: 'block', marginBottom: '.3rem' }}>DEMO LINK</label>
                    <input className="pixel-input" placeholder="https://..." value={portForm.demo} onChange={e => setPortForm({ ...portForm, demo: e.target.value })} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '.5rem', color: 'var(--purple)', display: 'block', marginBottom: '.3rem' }}>SOURCE LINK</label>
                    <input className="pixel-input" placeholder="https://github.com/..." value={portForm.code} onChange={e => setPortForm({ ...portForm, code: e.target.value })} />
                  </div>
                </div>
                <div style={{ background: 'var(--bg2)', padding: '1rem' }} className="pixel-border-sm">
                  <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '.6rem', color: 'var(--primary)', display: 'block', marginBottom: '.5rem' }}>UPLOAD IMAGE (OPTIONAL)</label>
                  <input id="portFile" type="file" accept="image/*" onChange={e => setPortImage(e.target.files[0])} style={{ color: 'white', fontFamily: 'var(--font-vt)', fontSize: '1rem' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="pixel-btn" style={{ flex: 1 }}>{editId ? 'UPDATE' : 'ADD'} PORTFOLIO</button>
                  {editId && <button type="button" className="pixel-btn" style={{ flex: 1, borderColor: 'var(--text-dim)', color: 'var(--text-dim)' }} onClick={handleCancel}>CANCEL</button>}
                </div>
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
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="pixel-btn" style={{ flex: 1 }}>{editId ? 'UPDATE' : 'ADD'} ACTIVITY</button>
                  {editId && <button type="button" className="pixel-btn" style={{ flex: 1, borderColor: 'var(--text-dim)', color: 'var(--text-dim)' }} onClick={handleCancel}>CANCEL</button>}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
