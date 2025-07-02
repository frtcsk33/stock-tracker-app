import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tracking() {
  const [stocks, setStocks] = useState([]);
  
  // Test için userId sabit, sen token veya context ile alabilirsin
  const userId = 1;

  useEffect(() => {
    const fetchTrackingStocks = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user-stocks/${userId}`);
        setStocks(res.data);
      } catch (err) {
        alert('Takip edilen hisseler yüklenemedi');
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
