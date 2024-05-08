import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobTitle } from "src/entities/job-title.entity";
import { JobTitleController } from "./job-title.controller";
import { JobTitleService } from "./job-title.service";

@Module({
    imports: [TypeOrmModule.forFeature([JobTitle])],
    controllers: [JobTitleController],
    providers: [JobTitleService]
})

export class JobTitleModule {}