import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { GenderEnum } from 'src/enums';
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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobTitle } from './job-title.entity';
import { Department } from './department.entity';
import { CheckIn } from './check-in.entity';

@Entity('employees')
export class Employee {
  constructor(partial: Partial<Employee>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'phone_number', nullable: false, unique: true })
  phoneNumber: string;

  @Column({
    name: 'gender',
    nullable: false,
    type: 'enum',
    enum: GenderEnum,
  })
  gender: string;

  @Column({ name: 'address', nullable: false })
  address: string;

  @Column({ name: 'birthday', nullable: false })
  birthday: Date;

  @Column({
    name: 'avatar_url',
    nullable: false,
    default:
      'https://res.cloudinary.com/dofchqr3c/image/upload/v1714639440/default_fzc2yd.webp',
  })
  avatarUrl: string;

  @Column({ name: 'on_job_date', nullable: false })
  onJobDate: Date;

  @Column({ name: 'job_title_id', nullable: true })
  jobTitleId: number;

  @Column({ name: 'department_id', nullable: true })
  departmentId: number;

  // @Exclude({ toPlainOnly: true })
  // @Column({ name: 'qr', nullable: true })
  // qr?: string;

  // @Exclude({ toPlainOnly: true })
  // @Column({ name: 'qr_expire', nullable: true })
  // qrExpire?: Date;

  @Column({ name: 'password_reset_token', nullable: true })
  passwordResetToken: string;

  @Column({ name: 'password_reset_token_expire', nullable: true })
  passwordResetTokenExpire: Date;

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

  @ManyToOne(() => JobTitle, (jobTitle) => jobTitle.employees)
  @JoinColumn({ name: 'job_title_id' })
  jobTitle: JobTitle;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => CheckIn, (checkIn) => checkIn.employee)
  checkIns: CheckIn[];
}
