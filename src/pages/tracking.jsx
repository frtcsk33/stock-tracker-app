import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

function Tracking() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchTrackingStocks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Lütfen giriş yapın!');
          return;
        }

        const decoded = jwt_decode(token);
        const userId = decoded.id;  

        const res = await axios.get(`http://localhost:4000/api/user-stocks/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStocks(res.data);
      } catch (err) {
        toast.error('Takip edilen hisseler yüklenemedi');
      }
    };

    fetchTrackingStocks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Takip Edilen Hisseler</h2>
      {stocks.length === 0 && <p>Henüz takip ettiğiniz hisse yok.</p>}
      <ul className="list-group">
        {stocks.map(stock => (
          <li key={stock.id} className="list-group-item">
            {stock.code} - {stock.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracking;
