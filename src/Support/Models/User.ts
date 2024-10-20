import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/database';

interface UserAttributes {
    id: number;
    github_id: string;
    name: string;
    is_active: boolean;
    github_access_token: string;
}

class User extends Model<UserAttributes, Omit<UserAttributes, 'id'>> implements UserAttributes {
    public id!: number;
    public github_id!: string;
    public name!: string;
    public is_active!: boolean;
    public github_access_token!: string;
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      github_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      github_access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
  
  export default User;