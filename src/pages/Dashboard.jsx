import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

function Dashboard() {
  const [userStocks, setUserStocks] = useState([]);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Kullanıcı girişi bulunamadı!');
          return;
        }

        const decoded = jwt_decode(token);
        const userId = decoded.id || decoded.userId;

        const res = await axios.get(`http://localhost:4000/api/user-stocks/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserStocks(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Takip edilen hisseler getirilemedi.');
      }
    };

    fetchUserStocks();
  }, []);

  return (
    <div className='container mt-5'>
      <h2>Takip Ettiğiniz Hisseler</h2>
      <ul className='list-group'>
        {userStocks.length === 0 && <li className='list-group-item'>Henüz takip ettiğiniz hisse yok.</li>}
        {userStocks.map((stock) => (
          <li key={stock.id} className='list-group-item'>
            {stock.code} - {stock.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
