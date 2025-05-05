import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import GridCards from '../Components/GridCards';
import SliderCards from '../Components/SliderCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Dropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { checkAuth } from '../utils/authCheck';
import { Helmet } from 'react-helmet-async';
import { Pagination } from 'antd';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 15;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await checkAuth(navigate); 

      const token = localStorage.getItem('token'); 
      const skip = (currentPage - 1) * pageSize;

      try {
        const productsRes = await fetch(`${API_BASE_URL}/products/show_pagging?skip=${skip}&limit=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!productsRes.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await productsRes.json();
        setProducts(data.products);
        console.log(products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    };

    fetchData();
  }, [navigate,currentPage]);

  const getSortedProducts = () => {
    const sorted = [...products]; 
    switch (sortOption) {
      case 'priceLowToHigh':
        return sorted.sort((a, b) => a.price - b.price); 
      case 'priceHighToLow':
        return sorted.sort((a, b) => b.price - a.price); 
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name)); 
      default:
        return sorted;
      }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <Header />
      <main>
        <h2 className='my-4 p-3 px-5'>В тренде</h2>
        <SliderCards />
        <h2 className='my-4 p-3 px-5'>Все товары</h2>

        <div className="my-4 p-3 px-5 bg-light rounded shadow-sm">
          <div className="d-flex align-items-center gap-3">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-sort">
                  Сортировка
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() =>setSortOption("priceLowToHigh")}>По цене: сначала дешёвые</Dropdown.Item>
                  <Dropdown.Item onClick={() =>setSortOption("priceHighToLow")}>По цене: сначала дорогие</Dropdown.Item>
                  <Dropdown.Item onClick={() =>setSortOption("name")}>По названию</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-primary" className="gap-3" onClick={()=>setSortOption('')}>Сбросить</Button>
          </div>
        </div>

        <GridCards products={getSortedProducts()} />
        <div className="d-flex justify-content-center my-4">
          <Pagination
            current={currentPage}
            total={totalProducts}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
