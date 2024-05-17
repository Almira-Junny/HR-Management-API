import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from 'src/entities/check-in.entity';
import { CheckInController } from './check-in.controller';
import { CheckInService } from './check-in.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn])],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export default class CheckInModule {}
