import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto, UpdateMessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  public async getAll() {
    return await this.messageRepository.find({
      relations: ['schedule'],
    });
  }

  public async getOne(id: number) {
    return await this.messageRepository.findOne({
      relations: ['schedule'],
      where: {
        id,
      },
    });
  }

  public async getAllByReceiverId(receiverId: number) {
    return await this.messageRepository.find({
      relations: ['schedule'],
      where: {
        schedule: {
          receiverId,
        },
      },
    });
  }

  public async getAllBySenderId(senderId: number) {
    return await this.messageRepository.find({
      relations: ['schedule'],
      where: {
        schedule: {
          senderId,
        },
      },
    });
  }

  public async createOne(input: CreateMessageDto) {
    return await this.messageRepository.save({
      ...input,
    });
  }

  public async updateOne(id: number, input: UpdateMessageDto) {
    return await this.messageRepository.update(id, {
      ...input,
    });
  }

  public async deleteOne(id: number) {
    return await this.messageRepository.softDelete(id);
  }
}
