import { SearchOutlined, UserOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import './Header.css'; 

const AppHeader = () => {
  return (
    <div className="header">
    <div className="header-container">
      <div className="logo">
        <h1>К&Е Электроника</h1>
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
        <button className="action-button cart-button">
          <ShoppingCartOutlined />
          <span className="cart-badge">5</span>
        </button>
      </div>
    </div>
  </div>
  );
};

export default AppHeader;