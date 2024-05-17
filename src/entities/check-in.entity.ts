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

@Entity('check_ins')
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', nullable: false })
  employeeId: number;

  @Column({ name: 'time_in', nullable: false })
  timeIn: Date;

  @Column({ name: 'time_out', nullable: true })
  timeOut: Date;

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
    this.timeIn = new Date();
  }

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedAt = new Date();
  }

  @BeforeSoftRemove()
  public setDeleteDate(): void {
    this.deletedAt = new Date();
  }

  @ManyToOne(() => Employee, (employee) => employee.checkIns)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
