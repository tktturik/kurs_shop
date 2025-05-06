import { SearchOutlined, UserOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons';
import { href, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dropdown, Space } from 'antd';
import exit from '../../public/exit.svg';
import '../styles/Header.css';
import '../styles/fonts.css';
import { API_BASE_URL } from '../config';

const AppHeader = () => {
  const [cartItems, setCartItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    const quantityShopCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(quantityShopCart.length);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories/`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Ошибка загрузки категорий:', err));
  }, []);

  const loadSubcategories = async (parentId) => {
    if (subcategories[parentId]) return;

    try {
      const res = await fetch(`${API_BASE_URL}/categories/?parent_id=${parentId}`);
      const data = await res.json();
      setSubcategories(prev => ({ ...prev, [parentId]: data }));
    } catch (error) {
      console.error(`Ошибка загрузки подкатегорий для id=${parentId}`, error);
    }
  };
  const exitFunc = async()=>{
    localStorage.removeItem('token');
  };

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
          <h2 className='phone-text'>+7 (999) 123 45 67</h2>
          <Link className="action-button cart-button" to='/shopcart' style={{ textDecoration: 'none' }}>
            <ShoppingCartOutlined />
            {cartItems > 0 && (
              <span className="cart-badge">{cartItems}</span>
            )}
          </Link>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <img src={exit} onClick={()=>exitFunc()} className='exit-icon'></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
