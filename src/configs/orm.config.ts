import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CheckIn } from 'src/entities/check-in.entity';
import { Department } from 'src/entities/department.entity';
import { Employee } from 'src/entities/employee.entity';
import { JobTitle } from 'src/entities/job-title.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Employee, JobTitle, Department, CheckIn],
    charset: 'utf8mb4',
    synchronize: true, //Auto update schema when change entity
  }),
);
