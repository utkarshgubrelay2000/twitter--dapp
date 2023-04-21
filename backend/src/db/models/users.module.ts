import { DataTypes, Model} from "sequelize";

import sequelizeConnection from "../config";

export class user extends Model {
  public id!: number;
 public email!: string;
 public password!:string;
 public wallet_address!:string;
 public first_name!:string;
 public last_name!:string;

}

user.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },   
    first_name:{
      type: DataTypes.STRING,
    
    },
 
    last_name: {
      type: DataTypes.STRING,
   
    },
    wallet_address: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    password:{
      type:DataTypes.STRING
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);


export default user;
