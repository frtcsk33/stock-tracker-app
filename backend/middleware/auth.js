import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
 
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token bulunamadı' });

  jwt.verify(token, process.env.JWT_SECRET || 'gizliKey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token geçersiz' });

    req.user = user; 
    next();
  });
};
