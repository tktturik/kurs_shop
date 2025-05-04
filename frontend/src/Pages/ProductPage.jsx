import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { Container, Image, Row, Col, Badge, Form, Button} from 'react-bootstrap';
import { checkAuth } from '../utils/authCheck';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SliderCards from '../Components/SliderCard';
import { Helmet } from 'react-helmet-async';


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      await checkAuth(navigate); 
        
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Ошибка загрузки продукта:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Загрузка...</div>;

  const addToCart = (product, quantity) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingItemIndex = storedCart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      storedCart[existingItemIndex].quantity += quantity;
    } else {
      storedCart.push({...product, quantity: quantity });
    }
  
    localStorage.setItem('cart', JSON.stringify(storedCart));
  };

  return (
    
<>
    <Helmet>
      <title>{product.name}</title>
    </Helmet>
      <Header />
      <Container className="my-5">
        <Row className="g-4">
          <Col md={6}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="rounded shadow-sm w-100 align-self-stretch"
              style={{
                objectFit: 'contain', // или 'cover' в зависимости от предпочтений
                maxHeight: '70vh'
                }}
            />
          </Col>

          <Col md={6}>
            <h2 className="fw-bold">{product.name}</h2>
            <div className="d-flex gap-3 my-3">
              <Badge bg="secondary">{product.category || 'Category'}</Badge>
              <Badge bg="success">В наличии</Badge>
            </div>

            <h3 className="text-primary my-3">{product.price} ₽</h3>

            <h5 className="my-3">Описание</h5>
            <p>{product.description}</p>

            <hr />

            <div className="d-flex align-items-center">
              <span className="me-3 my-3">Количество:</span>
              <div className="d-flex align-items-center border rounded px-2 py-1 my-3">
                <Button
                  variant="secondary"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  –
                </Button>
                <Form.Control
                  type="number"
                  value={quantity}
                  readOnly
                  className="text-center border-0"
                  style={{ width: '100%' }}
                />
                <Button
                  variant="secondary"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <Button variant="primary" className="w-100 my-3" onClick={()=>addToCart(product,quantity)}>
              Добавить в корзину
            </Button>
          </Col>
        </Row>

        <h2 className="mt-5">В тренде</h2>
        <SliderCards />
      </Container>
      <Footer />
    </>
  );
};

export default ProductPage;

