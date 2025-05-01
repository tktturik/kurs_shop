import React, { useState, useEffect } from "react";
import { LockOutlined, UserOutlined ,MailOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { Alert } from "antd";
import { useNavigate } from 'react-router-dom'; 
import { API_BASE_URL } from '../config';

const App = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [firstname, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setLoginForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); 

  const navigate = useNavigate(); 
  

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          navigate('/home'); 
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const onCreateNewUser = async ()=>{
    const formData = {firstname,email,password};
    try{
        const response = await fetch(`${API_BASE_URL}/users/registration`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      
        });
        const data = await response.json();
        if (response.ok){
            localStorage.setItem('token',data.access_token);
            localStorage.setItem('user',JSON.stringify(data.user));
            navigate('/home');
        }
        
        console.log("Response from server:", data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
  };
  
  const onLogin = async ()=>{
      const formData = {email,password};
      try{
        const response = await fetch(`${API_BASE_URL}/users/login`,{
          method: "POST",
          headers: {
            "Content-type":"application/json"
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok){
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/home");
        }else{
            if (response.status === 401){
                setAlertMessage({ type: 'error', message: 'Неверный пароль!' });

            }else if(response.status === 404){
                setAlertMessage({ type: 'error', message: 'Неверная почта!' });
            }
        }
      }catch(error){
        console.log("error",error)
      }
  };

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'   }}>
        {alertMessage && (
  <Alert
    message={alertMessage.message}
    type={alertMessage.type}
    showIcon
    style={{ marginBottom: 24 }}
    closable
    onClose={() => setAlertMessage(null)}
  />
)}
    
        {isLoginForm ? (
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
          onFinish={onLogin}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш email!',
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Введите корректный email',
            }, 
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш пароль!',
            }
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Item>
  
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Войти
          </Button>
          или<Button type="link" onClick={()=>setLoginForm(false)}>Зарегистрироваться!</Button>
        </Form.Item>
      </Form>
      ):(
      <Form
        name="register"
        style={{
          maxWidth: 360,
        }}
        onFinish={onCreateNewUser}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш email!',
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Введите корректный email',
            }, 
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваше Имя!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Имя" value={firstname} onChange={(e)=>setName(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш пароль!',
            },
            {
              min: 8,
              message: 'Пароль должен быть с 8 символами',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Item>
       
       
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Создать аккаунт
          </Button>
          или<Button type="link" onClick={()=>setLoginForm(true)} >Войти!</Button>
        </Form.Item>
      </Form>)}
      </div>
  );
};


export default App;
