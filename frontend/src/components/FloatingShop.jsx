import { Link } from 'react-router-dom';
import './FloatingShop.css';

export default function FloatingShop() {
  return (
    <Link to="/shop" className="floating-shop-container">
      <div className="floating-shop-bubble">
        <span className="shop-icon">🛒</span>
        <span className="shop-text">MY PRODUCT</span>
        <div className="bubble-reflection" />
      </div>
    </Link>
  );
}
