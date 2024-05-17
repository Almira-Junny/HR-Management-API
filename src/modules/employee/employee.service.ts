import { AuthService } from './../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  public async getAll() {
    return await this.employeeRepository.find();
  }

  public async findOne(id: number) {
    return await this.employeeRepository.findOne({
      where: { id },
    });
  }

  public async updateOne(id: number, input: UpdateEmployeeDto) {
    return await this.employeeRepository.update(
      {
        id,
      },
      {
        ...input,
      },
    );
  }

  public async deleteOne(id: number) {
    return await this.employeeRepository.softDelete({
      id,
    });
  }

  public async getMyProfile(employee: Employee) {
    return await this.employeeRepository.findOne({
      where: {
        id: employee.id,
      },
    });
  }
}
