import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 300 })
    content!: string;

    @ManyToOne(() => Post, (post) => post.comments)
    post!: Post;

    @ManyToOne(() => User)
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;
}
