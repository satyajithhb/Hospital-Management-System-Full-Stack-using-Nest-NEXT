import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fuser')
export class Fuser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column()
  age: number;

  @Column()
  status: 'active' | 'inactive';
}