import React from "react";
import { Link } from "react-router-dom";
import { Button,Container, Spinner} from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const PaymentPage = ()=>{
    return(
    <>
        <Helmet>
            <title>Оплата</title>
        </Helmet>
        <Container className="my-10 d-flex flex-column justify-content-center align-items-center"       style={{ minHeight: "100vh" }} >
            <h1 className="mb-5">Оплата</h1>
            <div className="my-4">
            <Spinner animation="grow" variant="secondary"></Spinner>
            </div>
            <Button variant="primary" size="lg" href='/home' className="mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16"
                style={{ 
                    marginRight: '10px',
                    verticalAlign: 'middle' 
                  }}
              >
                <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"/>
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>  Вернуться
            </Button>
        </Container>
    </>

    );
};
export default PaymentPage;