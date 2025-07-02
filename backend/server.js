import jwt from 'jsonwebtoken'; 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import axios from 'axios';
import iconv from 'iconv-lite';
import { sequelize } from './config/db.js';
import { User } from './models/user.js';
import { Stock } from './models/stock.js';

import stocksRouter from './controllers/stocks.js';
import userStocksRouter from './controllers/userStocks.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/stocks', stocksRouter);
app.use('/api/user-stocks', userStocksRouter);

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'E-posta zaten kayıtlı' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.json({ message: 'Kayıt başarıyla tamamlandı' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Şifre yanlış.' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'gizliKey', {
      expiresIn: '1d',
    });

    res.json({ message: 'Giriş başarılı', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

const cleanString = (str) => {
  if (typeof str !== 'string') return '';  
  return str.replace(/[^\x20-\x7EğüşıöçĞÜŞİÖÇ ]/g, '');
};


const syncStocksFromApi = async () => {
  try {
    const response = await axios.get('https://bigpara.hurriyet.com.tr/api/v1/hisse/list', {
      responseType: 'arraybuffer',
    });

    const decoded = iconv.decode(response.data, 'utf-8');
    const json = JSON.parse(decoded);
    const apiStocks = json.data;

    if (!apiStocks || !Array.isArray(apiStocks)) {
      console.error('API veri formatı hatalı:', apiStocks);
      return;
    }

    let sayac = 0;

    for (const item of apiStocks) {
    const code = cleanString(item.kod?.trim() || '');
    const name = cleanString(item.ad?.trim() || '');
      console.log(typeof item.kod, item.kod);
      console.log(typeof item.ad, item.ad);

      if (!code || !name) {
        console.warn('Eksik veri atlandı:', item);
        continue;
      }

      try {
      await Stock.upsert({ code, name });
      sayac++;
    } catch (error) {
    console.log('Kayıt hatası:', error.message, { code, name });
    }
    }

    console.log(`Senkronizasyon tamamlandı. ${sayac} hisse başarıyla kaydedildi.`);
  } catch (err) {
    console.error('API’den hisse alınamadı:', err.message);
  }
};

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await sequelize.sync(); 
    await syncStocksFromApi();              

    app.listen(PORT, () => {
      console.log(`Backend ${PORT} portunda çalışıyor`);
    });
  } catch (err) {
    console.error('Veritabanı bağlantısı başarısız:', err);
  }
};

start();