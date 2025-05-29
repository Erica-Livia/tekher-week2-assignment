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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date | undefined;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User | undefined;
}