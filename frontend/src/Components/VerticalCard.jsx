import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VerticalCard = ({product}) => {

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingItemIndex = storedCart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      storedCart[existingItemIndex].quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(storedCart));
  };

  return (
    <Card style={{ height: '100%' }}>
    <Link to={`/product/${product.id}`}>
        <Card.Img 
        variant="top" 
        src={product.image} 
        style={{ height: '200px', objectFit: 'cover' }} 
        />
    </Link>
    <Card.Body className="d-flex flex-column">
      <Card.Title>{product.name}</Card.Title>
      <Card.Text className="text-muted">
        {product.description}
      </Card.Text>
      <div className="mt-auto">
        <Card.Text className="fw-bold fs-4 text-primary">
          {product.price} ₽
        </Card.Text>
        <Button 
          variant="primary" 
          onClick={() => addToCart(product)}
          className="w-100"
        >
          Добавить в корзину
        </Button>
      </div>
    </Card.Body>
  </Card>
  );
};

export default VerticalCard;