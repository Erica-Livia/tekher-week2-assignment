import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import User from './user';

@Table({
  tableName: 'posts',
  timestamps: true,
  modelName: 'Post'
})
export class Post extends Model<Post> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare body: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare authorId: number;

  @BelongsTo(() => User)
  declare author: User;
}

export default Post;