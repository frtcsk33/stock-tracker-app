import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Dashboard(){
     const [userStocks, setUserStocks] = useState([]);
        const userId = 1; // Giriş yapan kullanıcıdan alınmalı

         useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user-stocks/${userId}`);
        setUserStocks(res.data);
      } catch (err) {
        console.error(err);
        alert('Takip edilen hisseler getirilemedi.');
      }
    };
      fetchUserStocks();
  }, []);



return (
    <div className='container mt-5'>
        <h2>Takip Ettiğiniz Hisseler</h2>
        <ul className='list-group'>
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