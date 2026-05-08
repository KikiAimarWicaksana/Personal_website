import { useEffect } from 'react';
import './Shop.css';

const products = [
  { id: 1, name: 'Data Pipeline Blueprint', price: '$29', desc: 'Complete architecture for modern data stacks.', icon: '⚡' },
  { id: 2, name: 'GCP Automation Scripts', price: '$49', desc: 'Terraform & Python scripts for cloud infra.', icon: '☁️' },
  { id: 3, name: 'Pixel Portfolio Template', price: '$19', desc: 'This exact pixel-art theme for your site.', icon: '🎮' },
];

export default function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop-page">
      <div className="section-container">
        <div className="section-header" style={{ paddingTop: '8rem' }}>
          <h2 className="section-title pixel-title">🛒 MY PRODUCTS</h2>
          <div className="title-underline" />
          <p className="shop-intro">Premium digital assets for Data Engineers and Developers.</p>
        </div>

        <div className="products-grid">
          {products.map(p => (
            <div className="product-card pixel-border" key={p.id}>
              <div className="product-icon">{p.icon}</div>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-desc">{p.desc}</p>
              <div className="product-footer">
                <span className="product-price">{p.price}</span>
                <button className="pixel-btn-sm">BUY NOW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
