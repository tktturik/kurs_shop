import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export const checkAuth = async (navigate) => {
  const token = localStorage.getItem('token');

  if (!token) {
    localStorage.removeItem('token');
    navigate('/login');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Unauthorized');
    }

    return true;

  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('token');
    navigate('/login');
  }
};
