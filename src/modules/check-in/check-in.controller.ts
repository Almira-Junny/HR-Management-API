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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuardJwt } from '../auth/guard/auth-guard.jwt';
import { CheckInService } from './check-in.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateCheckInDto, UpdateCheckInDto } from './dto/check-in.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@ApiTags('Check-in')
@UseGuards(AuthGuardJwt)
@ApiBearerAuth('token')
@Controller('/check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Get()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async getAllCheckIn() {
    return await this.checkInService.getAll();
  }
  @Get('/employee')
  @ApiOperation({
    summary: 'Get check-in for employee',
  })
  public async getCheckInByEmployee(@CurrentUser() user) {
    return await this.checkInService.getAllByEmployeeId(user.id);
  }

  @Post('/employee')
  @ApiOperation({
    summary: 'Check in for employee',
  })
  public async checkIn(@CurrentUser() user) {
    return await this.checkInService.checkIn(user.id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async getCheckIn(@Param('id') id: number) {
    return await this.checkInService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @ApiBody({ type: CreateCheckInDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async createCheckIn(@Body() input: CreateCheckInDto) {
    return await this.checkInService.createOne(input);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @ApiBody({ type: UpdateCheckInDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async updateCheckIn(
    @Param('id') id: number,
    @Body() input: UpdateCheckInDto,
  ) {
    return await this.checkInService.updateOne(id, input);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @ApiBody({ type: UpdateCheckInDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async deleteCheckIn(@Param('id') id: number) {
    return await this.checkInService.deleteOne(id);
  }
}
