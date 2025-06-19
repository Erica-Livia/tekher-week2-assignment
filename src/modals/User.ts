import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Post } from './Post';
import { Like } from './Like';
import { Comment } from './Comment';

export type UserRole = 'user' | 'admin';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, nullable: true, unique: true })
  email!: string;

  @Column({ type: 'enum', enum: ['user', 'admin', 'superAdmin'], default: 'user' })
  role!: UserRole;

  @Column({ length: 255 })
  password!: string;

  @Column({ default: false })    
  isVerified!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Post, (post) => post.userId)
  posts!: Post[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[] | undefined;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Post[];

}