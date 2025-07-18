import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.includes('@')) return alert('Geçerli bir e-posta adresi girin!');

    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', form);
      // console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      toast.success('Başarıyla giriş yaptınız.');
      
      navigate('/stocks'); 
    } catch (err) {
      toast.error(err.response?.data?.error || 'Giriş başarısız.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>E-posta</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          > </input>
        </div>
        <div className="mb-3">
          <label>Şifre</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
           > </input>
        </div>
        <button type="submit" className="btn btn-primary">Giriş Yap</button>
        <p className="mt-3">
          Hesabınız yok mu? <Link to="/">Kayıt olun</Link>
        </p>
      </form>
    </div>
  );
}

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
    const token = res.data.token;
    console.log(token);
    localStorage.setItem('token', token);
    navigate('/stocks'); 
  } catch (err) {
    toast.error('Giriş başarısız');
  }
};
export default Login;
