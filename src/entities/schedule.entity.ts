import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sender_id' })
  senderId: number;

  @Column({ name: 'receiver_id' })
  receiverId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'send_date' })
  sendDate: Date;

  @CreateDateColumn({
    name: 'created_at',
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @BeforeInsert()
  public setCreateDate(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedAt = new Date();
  }

  @BeforeSoftRemove()
  public setDeleteDate(): void {
    this.deletedAt = new Date();
  }

  @ManyToOne(() => Employee, (employee) => employee.sendSchedules)
  @JoinColumn({ name: 'sender_id' })
  sender: Employee;

  @ManyToOne(() => Employee, (employee) => employee.receiveSchedules)
  @JoinColumn({ name: 'receiver_id' })
  receiver: Employee;
}
