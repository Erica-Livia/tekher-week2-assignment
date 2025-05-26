import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import Post from './post';

@Table({
  tableName: 'users',
  timestamps: true,
  modelName: 'User'
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string;

  @HasMany(() => Post)
  declare posts: Post[];
  
}


export default User;