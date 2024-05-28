import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { Schedule } from 'src/entities/schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), NestScheduleModule.forRoot()],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
