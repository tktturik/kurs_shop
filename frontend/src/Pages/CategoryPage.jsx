import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { Container, Image, Row, Col, Badge, Form, Button} from 'react-bootstrap';
import { checkAuth } from '../utils/authCheck';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SliderCards from '../Components/SliderCard';
import { Helmet } from 'react-helmet-async';


const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      await checkAuth(navigate); 
        
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/products/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка загрузки продукта:', error);
      }
    };

    fetchProduct();
  }, [category]);

  if (!products) return <div>Загрузка...</div>;

  const addToCart = (product, quantity) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingItemIndex = storedCart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      storedCart[existingItemIndex].quantity += 1;
    } else {
      storedCart.push({...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(storedCart));
  };

  return (
    
        <div>
            <Helmet>
                <title>{category}</title>
            </Helmet>
        <Header />
        <Container className="my-5">
        <h2 className="mb-4">{category}</h2>

        {products.map(product => (
            <Row className="mb-3 align-items-center" key={product.id}>
            <Col md={9}>
                <HorizontalCard product={product} />
            </Col>
            <Col md={3} className="d-flex flex-column align-items-end">
            <Button variant="primary" size="lg" active>
                     <i class="bi bi-bag-plus"></i>
                </Button>
            </Col>
            </Row>
        ))}

        
        </Container>
        <SliderCards></SliderCards>
        <Footer />
        </div>
  );
};

export default CategoryPage;

