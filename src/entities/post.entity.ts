import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false })
  title: string;

  @Column({ type: 'text', unique: false, nullable: false })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
