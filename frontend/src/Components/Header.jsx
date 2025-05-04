import { SearchOutlined, UserOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dropdown, Space } from 'antd';
import logo from '../../public/logo.svg';
import '../styles/Header.css';
import '../styles/fonts.css';

const AppHeader = () => {
  const [cartItems, setCartItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    const quantityShopCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(quantityShopCart.length);
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/categories/')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Ошибка загрузки категорий:', err));
  }, []);

  const loadSubcategories = async (parentId) => {
    if (subcategories[parentId]) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/categories/?parent_id=${parentId}`);
      const data = await res.json();
      setSubcategories(prev => ({ ...prev, [parentId]: data }));
    } catch (error) {
      console.error(`Ошибка загрузки подкатегорий для id=${parentId}`, error);
    }
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>К&Е Электроника</h1>
          </Link>
        </div>

        <div className="menu-wrapper">
          <nav className="desktop-menu">
            {categories.map(category => {
              const items = (subcategories[category.id] || []).map(sub => ({
                key: sub.id,
                label: <Link to={`/category/${sub.categoryname}`} style={{ textDecoration: 'none' }}>{sub.categoryname} </Link>,
              }));

              return (
                <Dropdown
                  key={category.id}
                  menu={{ items }}
                  trigger={['hover']}
                  onOpenChange={(open) => open && loadSubcategories(category.id)}
                >
                  <Link
                    to={`/category/${category.categoryname}`}
                    className="menu-item"
                    style={{ textDecoration: 'none' }}
                  >
                    <Space>
                      {category.categoryname}
                    </Space>
                  </Link>
                </Dropdown>
              );
            })}
          </nav>
        </div>

        <div className="actions">
          <div className="search-input">
            <input type="text" placeholder="Поиск товаров" />
            <button className="search-button">
              <SearchOutlined />
            </button>
          </div>
          <Link className="action-button cart-button" to='/shopcart' style={{ textDecoration: 'none' }}>
            <ShoppingCartOutlined />
            {cartItems > 0 && (
              <span className="cart-badge">{cartItems}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
