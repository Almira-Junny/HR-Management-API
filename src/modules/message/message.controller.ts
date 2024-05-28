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
import { MessageService } from './message.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuardJwt } from '../auth/guard/auth-guard.jwt';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateMessageDto, UpdateMessageDto } from './dto/message.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@ApiTags('Message')
@UseGuards(AuthGuardJwt)
@ApiBearerAuth('token')
@Controller('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async getAllMessage() {
    return await this.messageService.getAll();
  }

  @Get('/myMessage')
  public async getMessageByReceiverId(@CurrentUser() user) {
    return await this.messageService.getAllByReceiverId(user.id);
  }

  @Get('/mySentMessage')
  public async getMessageBySenderId(@CurrentUser() user) {
    return await this.messageService.getAllBySenderId(user.id);
  }

  @Get('/:id')
  public async getMessage(@Param('id') id: number) {
    return await this.messageService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async createMessage(@Body() input: CreateMessageDto) {
    return await this.messageService.createOne(input);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async updateMessage(
    @Param('id') id: number,
    @Body() input: UpdateMessageDto,
  ) {
    return await this.messageService.updateOne(id, input);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Only for HR',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  public async deleteMessage(@Param('id') id: number) {
    return await this.messageService.deleteOne(id);
  }
}
