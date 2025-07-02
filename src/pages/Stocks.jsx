import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // Burada userId'yi test için sabit veriyoruz; sonra JWT'den alacağız
  const userId = 1;

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/stocks');
        setStocks(res.data);
      } catch (err) {
        alert('Hisse listesi yüklenemedi');
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
    try {
      await axios.post('http://localhost:4000/api/user-stocks', {
        userId,
        stockIds: selected
      });
      alert('Takip listesi güncellendi!');
      navigate('/dashboard'); // sonraki ekran
    } catch (err) {
      alert('Kayıt başarısız!');
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
