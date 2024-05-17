import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { Employee } from 'src/entities/employee.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  public async getAll() {
    return await this.departmentRepository.find();
  }

  public async getOne(id: number) {
    return await this.departmentRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async createOne(input: CreateDepartmentDto) {
    return await this.departmentRepository.save(input);
  }

  public async updateOne(id: number, input: UpdateDepartmentDto) {
    return await this.departmentRepository.update(
      {
        id,
      },
      {
        ...input,
      },
    );
  }

  public async deleteOne(id: number) {
    return await this.departmentRepository.softDelete({
      id,
    });
  }

  public async getEmployeesByDepartment(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['employees'],
    });

    if (!department) {
      throw new BadRequestException('Department not found');
    }

    return department.employees;
  }
}
