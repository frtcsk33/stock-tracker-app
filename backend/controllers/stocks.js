import express from 'express';
import { Stock } from '../models/stock.js';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (err) {
    console.error('Hisse listesi alınırken hata:', err);
    res.status(500).json({ error: 'Hisse listesi alınamadı' });
  }
});


export default router;
