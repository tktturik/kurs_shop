import React, {useState,useEffect}from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { API_BASE_URL } from '../config';
import VerticalCard from './VerticalCard';


const SliderCards = () => {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
  const fetchData = async () => {  
        const token = localStorage.getItem('token'); 
        try {
          const productsRes = await fetch(`${API_BASE_URL}/products/show_pagging?skip=3&limit=6`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!productsRes.ok) {
            throw new Error('Failed to fetch products');
          }
  
          const data = await productsRes.json();
          setProducts(data);
        } catch (error) {
          console.error('Ошибка загрузки товаров:', error);
        }
      };
      fetchData();
    },[]
    );
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
                 <VerticalCard product={product}></VerticalCard>
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
