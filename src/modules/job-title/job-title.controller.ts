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
@Controller('/jobTitle')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Get()
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('token')
  public async getAll() {
    return await this.jobTitleService.getAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('token')
  public async getOne(@Param('id') id: number) {
    return await this.jobTitleService.getOne(id);
  }

  @Post()
  @ApiBody({ type: CreateJobTitleDto })
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('token')
  @ApiOperation({
    summary: 'Create a new job title - only for HR',
  })
  public async createOne(
    @Body() input: CreateJobTitleDto,
    @CurrentUser() employee: Employee,
  ) {
    if (employee.jobTitleId !== Role.ADMIN) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }
    return await this.jobTitleService.createOne(input).catch((err) => {
        if (err.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Name is already taken');
        }
      });;
  }

  @Patch('/:id')
  @ApiBody({ type: CreateJobTitleDto })
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('token')
  @ApiOperation({
    summary: 'Update a job title - only for HR',
  })
  public async updateOne(
    @Param('id') id: number,
    @Body() input: UpdateJobTitleDto,
    @CurrentUser() employee: Employee,
  ) {
    if (employee.jobTitleId !== Role.ADMIN) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }
    return await this.jobTitleService.updateOne(id, input).catch((err) => {
        if (err.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Name is already taken');
        }
      });;
  }

  @Delete('/:id')
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('token')
  @ApiOperation({
    summary: 'Delete a job title - only for HR',
  })
  public async deleteOne(
    @Param('id') id: number,
    @CurrentUser() employee: Employee,
  ) {
    if (employee.jobTitleId !== Role.ADMIN) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }
    return await this.jobTitleService.deleteOne(id);
  }
}
