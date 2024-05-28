import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';
import { CronJob } from 'cron';
import { Message } from 'src/entities/message.entity';

@Injectable()
export class ScheduleService implements OnModuleInit {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,

    private readonly schedulerRegistry: SchedulerRegistry,

    private readonly dataSource: DataSource,
  ) {}

  public async getAll() {
    return await this.scheduleRepository.find({
      relations: ['sender', 'receiver'],
    });
  }

  public async getOne(id: number) {
    return await this.scheduleRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver'],
    });
  }

  public async createOne(input: CreateScheduleDto, userId: number) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const schedule = await manager.getRepository(Schedule).save({
        senderId: userId,
        receiverId: input.receiverId,
        title: input.title,
        content: input.content,
        sendDate: new Date(input.sendDate),
      });

      const job = new CronJob(new Date(input.sendDate), async () => {
        await this.dataSource.manager.getRepository(Message).save({
          scheduleId: schedule.id,
        });
      });

      this.schedulerRegistry.addCronJob(`${schedule.id}`, job);

      job.start();

      return {
        message: 'Ok',
      };
    });
  }

  public async updateOne(input: UpdateScheduleDto, id: number) {
    return await this.scheduleRepository.update(id, {
      ...input,
    });
  }

  public async deleteOne(id: number) {
    this.schedulerRegistry.deleteCronJob(`${id}`);
    await this.scheduleRepository.softDelete(id);
  }

  private async restartSavedCronTasks() {
    const schedules = await this.scheduleRepository.find({
      where: {
        sendDate: MoreThan(new Date()),
      },
    });

    return await Promise.all(
      schedules.map((schedule) => {
        return this.createOne(
          {
            receiverId: schedule.receiverId,
            title: schedule.title,
            content: schedule.content,
            sendDate: schedule.sendDate.toISOString(),
          },
          schedule.senderId,
        );
      }),
    );
  }

  async onModuleInit() {
    await this.restartSavedCronTasks();
  }
}
