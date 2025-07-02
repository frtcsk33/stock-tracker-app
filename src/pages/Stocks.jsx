import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStocks = async () => {
      const token = localStorage.getItem('token');
      try {
      const res = await axios.get('http://localhost:4000/api/stocks', {
        headers: { Authorization: `Bearer ${token}` }
      });
        setStocks(res.data);
      } catch (err) {
        toast.error('Hisse listesi yüklenemedi');
      }
    };

    fetchStocks();
  }, []);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = async () => {
  const token = localStorage.getItem('token');
  try {
    await axios.post('http://localhost:4000/api/user-stocks', 
      { stockIds: selected },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success('Takip listesi güncellendi!');
    navigate('/dashboard'); 
  } catch (err) {
    toast.error('Kayıt başarısız!');
  }
};


  return (
    <div className="container mt-5">
      <h2>Hisse Seçimi</h2>
      <ul className="list-group">
        {stocks.map((stock) => (
          <li key={stock.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{stock.code} - {stock.name}</span>
            <input
              type="checkbox"
              checked={selected.includes(stock.id)}
              onChange={() => toggleSelect(stock.id)}
            />
          </li>
        ))}
      </ul>

      <button className="btn btn-success mt-4" onClick={handleSubmit}>
        Kaydet ve Devam Et
      </button>
    </div>
  );
}

export default Stocks;
