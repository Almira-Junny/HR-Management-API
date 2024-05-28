import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuardJwt } from '../auth/guard/auth-guard.jwt';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';

@ApiTags('Schedule')
@UseGuards(AuthGuardJwt)
@ApiBearerAuth('token')
@Controller('/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async getAllSchedule() {
    return await this.scheduleService.getAll();
  }

  @Get('/:id')
  public async getSchedule(@Param('id') id: number) {
    return await this.scheduleService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async createSchedule(
    @CurrentUser() user,
    @Body() input: CreateScheduleDto,
  ) {
    return await this.scheduleService.createOne(input, user.id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async updateSchedule(
    @Param('id') id: number,
    @Body() input: UpdateScheduleDto,
  ) {
    return await this.scheduleService.updateOne(input, id);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async deleteSchedule(@Param('id') id: number) {
    return await this.scheduleService.deleteOne(id);
  }
}
