import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
import { IOrders } from './types';
import User from '../user/user-model';

class Orders extends Model<IOrders> {};

Orders.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telegram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roblox_username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  sequelize,
  tableName: 'orders',
  modelName: 'Orders',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ["updatedAt", "userId"] }
  }
});

Orders.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Orders, { foreignKey: 'userId' });

export default Orders;