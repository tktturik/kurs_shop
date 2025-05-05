import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import HorizontalCard from '../Components/HorizontalCard';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Helmet } from 'react-helmet-async';

const ShopcartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };


  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart'); 
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Helmet>
        <title>Корзина</title>
      </Helmet>
      <Header />
      <Container className="my-5">
        <h2 className="mb-4">Корзина</h2>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="danger" onClick={clearCart}>Удалить все</Button>
        </div>

        {cartItems.map(product => (
          <Row className="mb-3 align-items-center" key={product.id}>
            <Col md={9}>
              <HorizontalCard product={product} />
            </Col>
            <Col md={3} className="d-flex flex-column align-items-end">
              <div className="d-flex align-items-center mb-2">
                <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(product.id, -1)}>-</Button>
                <Form.Control 
                  value={product.quantity} 
                  readOnly 
                  className="mx-2 text-center" 
                  style={{ width: '50px' }} 
                />
                <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(product.id, 1)}>+</Button>
              </div>
              <div className="fw-bold mb-2">
                Итого: {(product.price * product.quantity).toFixed(2)} ₽
              </div>
              <Button variant="outline-danger" size="sm" onClick={() => removeItem(product.id)}>Удалить</Button>
            </Col>
          </Row>
        ))}

        <div className="d-flex justify-content-end mt-4">
          <h4>Общая сумма: {totalPrice.toFixed(2)} ₽</h4>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="success" size="lg" href='/payment' onClick={()=>clearCart()}>Перейти к оплате</Button>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ShopcartPage;
