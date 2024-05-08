import { JobTitle } from 'src/entities/job-title.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateJobTitleDto, UpdateJobTitleDto } from './dto/job-title.dto';

@Injectable()
export class JobTitleService {
  constructor(
    @InjectRepository(JobTitle)
    private readonly jobTitleRepository: Repository<JobTitle>,
  ) {}

  public async getAll(): Promise<JobTitle[]> {
    return await this.jobTitleRepository.find();
  }

  public async getOne(id: number): Promise<JobTitle | undefined> {
    const JobTitle = await this.jobTitleRepository.findOne({
      where: { id },
    });

    if (!JobTitle) {
      throw new Error('Job title not found');
    }

    return JobTitle;
  }

  public async createOne(
    input: CreateJobTitleDto,
  ): Promise<JobTitle | undefined> {
    const jobTitle = new JobTitle();
    jobTitle.name = input.name;
    jobTitle.responsibilities = input.responsibilities;
    return await this.jobTitleRepository.save(jobTitle);
  }

  public async updateOne(
    id: number,
    input: UpdateJobTitleDto,
  ): Promise<JobTitle | undefined> {
    const jobTitle = await this.jobTitleRepository.findOne({
      where: { id },
    });
    if (!jobTitle) {
      throw new Error('Job title not found');
    }

    return await this.jobTitleRepository.save({
      ...jobTitle,
      ...input,
    });
  }

  public async deleteOne(id: number): Promise<JobTitle | undefined> {
    const jobTitle = await this.jobTitleRepository.findOne({
      where: { id },
    });
    if (!jobTitle) {
      throw new Error('Job title not found');
    }

    return await this.jobTitleRepository.softRemove(jobTitle);
  }
}
