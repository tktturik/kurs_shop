import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const GridCards = () => {
  const products = [
    {
      id: 1,
      name: 'Смартфон Samsung Galaxy S23',
      price: '79 990 ₽',
      image: 'https://img.mvideo.ru/Big/30067205bb2.jpg',
      description: '8/256GB, Phantom Black'
    },
    {
      id: 2,
      name: 'Ноутбук ASUS VivoBook 15',
      price: '54 990 ₽',
      image: 'https://c.dns-shop.ru/thumb/st1/fit/0/0/6b4f390b0bae81f1ec344c46c59b8285/c3052996295c0bfb94ee7901fbd5ff8c7094b72be3717c45e5ed6548c5c53d72.jpg.webp',
      description: '15.6", Core i5, 8GB, 512GB SSD'
    },
    {
      id: 3,
      name: 'Телевизор LG OLED C2',
      price: '129 990 ₽',
      image: 'https://www.lg.com/ru/images/televisions/md07548713/gallery/large01.jpg',
      description: '55", 4K UHD, Smart TV'
    },
    {
      id: 4,
      name: 'Наушники Sony WH-1000XM4',
      price: '24 990 ₽',
      image: 'https://www.sony.ru/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=165&bgcolor=FFFFFF&bgc=FFFFFF',
      description: 'Беспроводные, с шумоподавлением'
    },
    {
        id: 4,
        name: 'Наушники Sony WH-1000XM4',
        price: '24 990 ₽',
        image: 'https://www.sony.ru/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=165&bgcolor=FFFFFF&bgc=FFFFFF',
        description: 'Беспроводные, с шумоподавлением'
      },
  ];

  const addToCart = (productId) => {
    console.log(`Товар ${productId} добавлен в корзину`);
  };

  return (
    <Container className="my-5">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card style={{ height: '100%' }}>
              <Card.Img 
                variant="top" 
                src={product.image} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted">
                  {product.description}
                </Card.Text>
                <div className="mt-auto">
                  <Card.Text className="fw-bold fs-4 text-primary">
                    {product.price}
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => addToCart(product.id)}
                    className="w-100"
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridCards;