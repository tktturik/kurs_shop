import React from 'react';
import {Row, Col, Container } from 'react-bootstrap';
import VerticalCard from './VerticalCard';

const GridCards = ({products}) => {
  
  const addToCart = (productId) => {
    console.log(`Товар ${productId} добавлен в корзину`);
  };

  return (
    <Container className="my-5">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <VerticalCard product={product}></VerticalCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridCards;