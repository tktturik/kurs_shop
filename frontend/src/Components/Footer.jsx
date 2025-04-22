import './Footer.css';
import { YoutubeOutlined, InstagramOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, WhatsAppOutlined} from '@ant-design/icons';

const AppFooter = ()=> {
    return(
        <div className="footer">
            <div className="footer-container">
                <div className='blocks'>
                    <h1>К&Е Электроника</h1>
                    <p>Ваш надежный магазин электроники с 2010 года</p>
                    <div className='Icons-container'>
                        <div className='icon'>
                            <WhatsAppOutlined></WhatsAppOutlined>    
                        </div>
                        <div className='icon'>
                            <InstagramOutlined></InstagramOutlined>    
                        </div>
                        <div className='icon'>
                            <YoutubeOutlined></YoutubeOutlined>    
                        </div>
                        
                        
                    </div>
                </div>
                <div className='blocks'>
                    <h1>Информация</h1>
                    <a href='' >О компании</a>
                    <a>Доставка</a>
                    <a>Оплата</a>
                    <a>Гарантия</a>
                </div>
                <div className='blocks'>
                <h1>Категории</h1>
                    <a>Смартфоны</a>
                    <a>Ноутбуки</a>
                    <a>Аксессуары</a>
                    <a>Телевизоры</a>
                </div>
                <div className='blocks'>
                    <h1>Контакты</h1>
                    <div className='contact-item'>
                        <div className='icon'>
                            <PhoneOutlined></PhoneOutlined>
                        </div>
                        <p>+7 (999) 123 45 67</p>
                    </div>
                    <div className='contact-item'>
                        <div className='icon'>
                            <MailOutlined></MailOutlined>
                        </div>
                        <p>info@keelectronics.ru</p>
                    </div>
                    <div className='contact-item'>
                        <div className='icon'>
                            <EnvironmentOutlined></EnvironmentOutlined>
                        </div>
                        <p>г. Москва</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AppFooter;