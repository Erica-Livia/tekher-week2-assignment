import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn  } from 'typeorm';
import { User } from './User';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    title!: string;

    @Column({ length: 200 })
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => User, (user: { posts: any; }) => user.posts)
    @JoinColumn({name: 'userId'})
    user: User | undefined;
}