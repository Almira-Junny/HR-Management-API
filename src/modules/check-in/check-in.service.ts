import { CheckIn } from 'src/entities/check-in.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { CreateCheckInDto, UpdateCheckInDto } from './dto/check-in.dto';

@Injectable()
export class CheckInService {
  constructor(
    @InjectRepository(CheckIn)
    private readonly checkInRepository: Repository<CheckIn>,
  ) {}

  public async getAll() {
    return await this.checkInRepository.find();
  }

  public async getAllByEmployeeId(employeeId: number) {
    return await this.checkInRepository.find({ where: { employeeId } });
  }

  public async getOne(id: number) {
    return await this.checkInRepository.findOne({
      where: { id },
    });
  }

  public async createOne(input: CreateCheckInDto) {
    return await this.checkInRepository.save({
      ...input,
      timeIn: new Date(input.timeIn),
      timeOut: input.timeOut ? new Date(input.timeOut) : null,
    });
  }

  public async checkIn(employeeId: number) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const checkExist = await this.checkInRepository.findOne({
      where: {
        employeeId,
        createdAt: Between(startDate, endDate),
      },
    });

    if (checkExist) {
      return await this.checkInRepository.update(
        {
          id: checkExist.id,
        },
        {
          timeOut: new Date(),
        },
      );
    } else {
      const checkIn = new CheckIn();
      checkIn.employeeId = employeeId;
      return await this.checkInRepository.save(checkIn);
    }
  }

  public async updateOne(id: number, input: UpdateCheckInDto) {
    return await this.checkInRepository.update(
      {
        id,
      },
      {
        ...input,
        ...(input.timeIn ? { timeIn: new Date(input.timeIn) } : {}),
        ...(input.timeOut ? { timeOut: new Date(input.timeOut) } : {}),
      },
    );
  }

  public async deleteOne(id: number) {
    return await this.checkInRepository.softDelete({
      id,
    });
  }
}
