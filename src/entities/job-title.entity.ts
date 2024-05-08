import { BeforeInsert, BeforeSoftRemove, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("job_titles")
export class JobTitle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false, unique: true})
    name: string;

    @Column({ name: 'responsibilities', nullable: false, type: 'text'})
    responsibilities: string;

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
}