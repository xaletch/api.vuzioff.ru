import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
import { IUser } from './types';

class User extends Model<IUser> {};

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  access: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, 
{
  sequelize,
  tableName: 'users',
  modelName: 'User', 
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ["updatedAt"] }
  } 
});

export default User;