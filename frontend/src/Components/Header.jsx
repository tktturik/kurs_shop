import { SearchOutlined, UserOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import '../styles/Header.css';
import '../styles/fonts.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg'

const AppHeader = () => {

  const [cartItems, setCartItems] = useState(0);
  useEffect(()=>{
    const quantityShopCart = (JSON.parse(localStorage.getItem('cart')) || []);
    setCartItems(quantityShopCart.length);
  },[]);
  return (
    <div className="header">
    <div className="header-container">
    <div className="logo">
      <Link to="/home" style={{ textDecoration: 'none' }}>
      <h1>К&Е Электроника</h1>
      </Link>
      </div>
  
      <div className="menu-wrapper">
        <nav className="desktop-menu">
          <a href="/" className="menu-item">Главная</a>
          <a href="/catalog" className="menu-item">Каталог</a>
          <a href="/sales" className="menu-item">Акции</a>
          <a href="/about" className="menu-item">О нас</a>
          <a href="/contacts" className="menu-item">Контакты</a>
        </nav>
      </div>
  
      <div className="actions">
        <div className="search-input">
          <input type="text" placeholder="Поиск товаров" />
          <button className="search-button">
            <SearchOutlined />
          </button>
        </div>
        <button className="action-button">
          <UserOutlined />
        </button>
        <Link className="action-button cart-button" to='/shopcart' style={{ textDecoration: 'none'}}>
          <ShoppingCartOutlined />
          {cartItems> 0 && (
  <span className="cart-badge">{cartItems}</span>)} 
       </Link>
      </div>
    </div>
  </div>
  );
};

export default AppHeader;