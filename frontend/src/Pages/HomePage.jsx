import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import GridCards from '../Components/GridCards';
import SliderCards from '../Components/SliderCard';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Form, Dropdown, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      <Header></Header>
        <main>
          
          <h2 style={{marginLeft: "120px", marginTop: "50px"}}>В тренде</h2>
          <SliderCards></SliderCards>
          <h2 style={{marginLeft: "120px"}}>Все товары</h2>
          <div className="my-4 p-3 px-5 bg-light rounded shadow-sm">
            <Row className="align-items-center g-3">
              <Col md={4}>
                <Form.Select aria-label="Выбор категории">
                  <option>Все категории</option>
                  <option value="smartphones">Смартфоны</option>
                  <option value="laptops">Ноутбуки</option>
                  <option value="tv">Телевизоры</option>
                  <option value="audio">Аудио</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-sort">
                    Сортировка
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>По популярности</Dropdown.Item>
                    <Dropdown.Item>По цене: сначала дешёвые</Dropdown.Item>
                    <Dropdown.Item>По цене: сначала дорогие</Dropdown.Item>
                    <Dropdown.Item>По новизне</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={4} className="text-end">
                <Button variant="outline-primary" className="me-2">Сбросить</Button>
                <Button variant="primary">Показать</Button>
              </Col>
            </Row>
          </div>

          <GridCards></GridCards>
        </main>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;