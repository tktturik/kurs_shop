import '../styles/Footer.css';
import '../styles/fonts.css';
import { YoutubeOutlined, InstagramOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const AppFooter = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories/`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Ошибка загрузки категорий:', err));
  }, []);

  return (
    <div className="footer">
      <div className="footer-container">
        <div className='blocks'>
          <h1>К&Е Электроника</h1>
          <p>Ваш надежный магазин электроники с 2010 года</p>
          <div className='Icons-container'>
            <div className='icon'>
              <WhatsAppOutlined />
            </div>
            <div className='icon'>
              <InstagramOutlined />
            </div>
            <div className='icon'>
              <YoutubeOutlined />
            </div>
          </div>
        </div>

        <div className='blocks'>
          <h1>Информация</h1>
          <a href="">О компании</a>
          <a href="">Доставка</a>
          <a href="">Оплата</a>
          <a href="">Гарантия</a>
        </div>

        <div className='blocks'>
          <h1>Категории</h1>
          {categories.map(cat => (
            <Link to={`/category/${cat.categoryname}`} key={cat.id}>
              {cat.categoryname}
            </Link>
          ))}
        </div>

        <div className='blocks'>
          <h1>Контакты</h1>
          <div className='contact-item'>
            <div className='icon'>
              <PhoneOutlined />
            </div>
            <p>+7 (999) 123 45 67</p>
          </div>
          <div className='contact-item'>
            <div className='icon'>
              <MailOutlined />
            </div>
            <p>info@keelectronics.ru</p>
          </div>
          <div className='contact-item'>
            <div className='icon'>
              <EnvironmentOutlined />
            </div>
            <p>г. Москва</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
