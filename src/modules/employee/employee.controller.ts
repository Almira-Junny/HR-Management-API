import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthGuardJwt } from '../auth/guard/auth-guard.jwt';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Employee } from 'src/entities/employee.entity';

@ApiTags('employee')
@ApiBearerAuth('token')
@UseGuards(AuthGuardJwt)
@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async getAllEmployees() {
    return await this.employeeService.getAll();
  }

  @Get('/profile')
  public async getMyProfile(@CurrentUser() employee: Employee) {
    return await this.employeeService.getMyProfile(employee);
  }

  @Get('/:id')
  @ApiBearerAuth('token')
  public async getEmployee(@Param('id') id: number) {
    return await this.employeeService.findOne(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @ApiBody({ type: CreateEmployeeDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async updateEmployee(
    @Param('id') id: number,
    @Body() input: UpdateEmployeeDto,
  ) {
    return await this.employeeService.updateOne(id, input);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async deleteEmployee(@Param('id') id: number) {
    return await this.employeeService.deleteOne(id);
  }
}
