import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobTitleService } from './job-title.service';
import { CreateJobTitleDto, UpdateJobTitleDto } from './dto/job-title.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums';
import { AuthGuardJwt } from '../auth/guard/auth-guard.jwt';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Employee } from 'src/entities/employee.entity';

@ApiTags('job-title')
@ApiBearerAuth('token')
@UseGuards(AuthGuardJwt)
@Controller('/jobTitle')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Get()
  public async getAll() {
    return await this.jobTitleService.getAll();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    return await this.jobTitleService.getOne(id);
  }

  @Post()
  @ApiBody({ type: CreateJobTitleDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Only for HR',
  })
  public async createOne(@Body() input: CreateJobTitleDto) {
    return await this.jobTitleService.createOne(input).catch((err) => {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Name is already taken');
      }
    });
  }

  @Patch('/:id')
  @ApiBody({ type: CreateJobTitleDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Only for HR',
  })
  public async updateOne(
    @Param('id') id: number,
    @Body() input: UpdateJobTitleDto,
  ) {
    return await this.jobTitleService.updateOne(id, input).catch((err) => {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Name is already taken');
      }
    });
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Only for HR',
  })
  public async deleteOne(@Param('id') id: number) {
    return await this.jobTitleService.deleteOne(id);
  }

  @Get('/:id/employees')
  public async getEmployeesByJobTitle(@Param('id') id: number) {
    return await this.jobTitleService.getEmployeesByJobTitle(id);
  }
}
