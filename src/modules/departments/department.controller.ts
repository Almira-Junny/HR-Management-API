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
import { DepartmentService } from './department.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuardJwt } from '../auth/guard/auth-guard.jwt';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';

@ApiTags('department')
@UseGuards(AuthGuardJwt)
@ApiBearerAuth('token')
@Controller('/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  public async getAllDepartments() {
    return await this.departmentService.getAll();
  }

  @Get('/:id')
  public async getDepartment(@Param('id') id: number) {
    return await this.departmentService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @ApiBody({ type: CreateDepartmentDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async createDepartment(@Body() input: CreateDepartmentDto) {
    return await this.departmentService.createOne(input);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @ApiBody({ type: CreateDepartmentDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async updateDepartment(
    @Param('id') id: number,
    @Body() input: UpdateDepartmentDto,
  ) {
    return await this.departmentService.updateOne(id, input);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async deleteDepartment(@Param('id') id: number) {
    return await this.departmentService.deleteOne(id);
  }

  @Get('/:id/employees')
  public async getEmployeesByDepartment(@Param('id') id: number) {
    return await this.departmentService.getEmployeesByDepartment(id);
  }
}
