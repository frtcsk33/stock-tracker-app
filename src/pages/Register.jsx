import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';


function Register(){

    const [form, setForm] = useState({name:'', email:'', password:''});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!form.email.includes('@')) return alert('Geçerli bir eposta adresi giriniz!');
        if(form.password.length < 6 ) return alert('Şifre en az 6 karakterden oluşmalıdır!');

        try {
            const res  = await axios.post('http://localhost:4000/api/auth/register',form);
            alert('Tebrikler! başarıyla kaydoldunuz.');
            navigate('/login');
        } catch (err) {
            if(err.response?.data?.error){
                alert(err.response.data.error);
            }else{
                alert('bir hata oluştu!', err);
            }
        }

    };





    return(
        <div className='container mt-5'>
            <h2 className='mb-4'>Kayıt ol</h2>

            <form onSubmit={handleSubmit}>

                <div className='mb-3'>
                    <label>Ad</label>
                    <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required ></input>

                </div>
            
                <div className='mb-3'>
                    <label>E-posta</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        required
                    ></input>

                </div>

                <div className='mb-3'>
                    <label>Şifre</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={form.password}
                        onChange={handleChange}
                        required
                    ></input>

                </div>


            <div className='d-flex gap-3 mt-3'>

                <button type="submit" className='btn btn-primary'>Kayıt Ol</button>
                <Link to="/login" className="btn btn-secondary">
                Zaten Bir Hesabım Var
                </Link>
            </div>
            </form>




        </div>





    );

}

export default Register;