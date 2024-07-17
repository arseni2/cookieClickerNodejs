import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileEntity} from "./file.entity";

@Module({
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
  imports: [TypeOrmModule.forFeature([FileEntity])]
})
export class FileModule {}
