import express from 'express';
import { UserStock } from '../models/userStock.js';
import { Stock } from '../models/stock.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const  userId = req.user.id;
    const  {stockIds } = req.body;

  if (!Array.isArray(stockIds)) {
    return res.status(400).json({ error: 'Eksik veya hatalı parametreler' });
  }

  try {
    await UserStock.destroy({ where: { userId } }); 
    const bulk = stockIds.map(stockId => ({ userId, stockId }));
    await UserStock.bulkCreate(bulk);

    res.json({ message: 'Takip listesi güncellendi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;  

  try {
    const stocks = await UserStock.findAll({ where: { userId } });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});


router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { stockIds } = req.body;

  try {
    await UserStock.destroy({ where: { userId } });
    const bulk = stockIds.map(stockId => ({ userId, stockId }));
    await UserStock.bulkCreate(bulk);

    res.json({ message: 'Takip listesi güncellendi' });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});


router.get('/:userId', async(req,res) => {
  const {userId} = req.params;


  try {
    const stocks = await UserStock.findAll({
      where: {userId},
      include: [{ model: Stock, as: 'stock' }]

    });

    const formatted = stocks.map(s=> ({

      id: s.stock.id,
      code: s.stock.code,
      name: s.stock.name

    }));

    res.json(formatted);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Sunucu hatası'});
  }


});

export default router;

