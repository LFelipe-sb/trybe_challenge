import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  
  @Column()
  content: string;

  @Column()
  userId: string
  
  @ManyToOne(() => User)
  @JoinColumn({name: 'id'})
  user: User;
  
  @CreateDateColumn()
  published: Date

  @CreateDateColumn()
  updated: Date
}