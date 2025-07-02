import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './user.js';
import { Stock } from './stock.js';

export const UserStock = sequelize.define('UserStock', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  stockId: { type: DataTypes.INTEGER, allowNull: false }
});

// İlişkiyi ekle
UserStock.belongsTo(User, { foreignKey: 'userId' });
UserStock.belongsTo(Stock, { foreignKey: 'stockId' , as:'stock'});

// İstersen User ve Stock tarafında da ilişki kurabilirsin
User.hasMany(UserStock, { foreignKey: 'userId' });
Stock.hasMany(UserStock, { foreignKey: 'stockId' });
