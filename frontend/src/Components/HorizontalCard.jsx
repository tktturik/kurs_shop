import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HorizontalCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card className="mb-3" key={product.id}>
        <Row className="g-0 d-flex align-items-stretch">
          <Col md={3} className="d-flex">
            <Card.Img 
              src={product.image} 
              className="w-100" 
              style={{ 
                width: '150px',          
                height: '150px',         
                objectFit: 'cover',      
                borderRadius: '8px'      
              }}  
            />
          </Col>
          <Col md={9}>
            <Card.Body className="h-100 d-flex flex-column justify-content-between">
              <div>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted">{product.description}</Card.Text>
              </div>
              <Card.Text className="fw-bold text-primary">Цена: {product.price} ₽</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default HorizontalCard;
