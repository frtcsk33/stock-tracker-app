import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Stock = sequelize.define('Stock', {
  id: { type: DataTypes.INTEGER,  autoIncrement: true, primaryKey: true},
  code: { type: DataTypes.STRING, allowNull: false , unique: true}, 
  name: { type: DataTypes.STRING, allowNull: false }  
});

