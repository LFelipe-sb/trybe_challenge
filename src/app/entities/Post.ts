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
  user: string
  
  @ManyToOne(() => User)
  @JoinColumn({name: 'id'})
  userId: User;
  
  @CreateDateColumn()
  published: Date

  @CreateDateColumn()
  uptaded: Date
}