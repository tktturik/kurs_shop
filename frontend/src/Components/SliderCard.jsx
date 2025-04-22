import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

const SliderCards = () => {
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
      id: 5,
      name: 'Умные часы Apple Watch Series 9',
      price: '39 990 ₽',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ2W3_VW_34FR+watch-case-45-aluminum-starlight-nc-9s_VW_34FR_WF_CO_GEO_RU?wid=940&hei=1112&fmt=png-alpha&.v=1693595873113',
      description: '45мм, GPS, алюминий, светло-золотой'
    },
  ];

  const addToCart = (id) => {
    console.log(`Товар с ID ${id} добавлен в корзину`);
  };

  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const productChunks = chunkArray(products, 3);

  return (
    <div className="p-4">
      <Carousel indicators={false} interval={5000} variant="dark">
        {productChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="g-4">
              {chunk.map((product) => (
                <Col key={product.id} md={4}>
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
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SliderCards;
