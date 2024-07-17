import {Module} from '@nestjs/common';
import {CommunityService} from './community.service';
import {CommunityController} from './community.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommunityEntity} from "./entities/community.entity";
import {UserEntity} from "../user/entities/user.entity";
import {FileModule} from "../file/file.module";
import {MulterModule} from "@nestjs/platform-express";
import {fileStorage} from "../file/storage";

@Module({
	controllers: [CommunityController],
	providers: [CommunityService],
	imports: [
		TypeOrmModule.forFeature([CommunityEntity, UserEntity]),
		FileModule,
		MulterModule.register({
			dest: './upload',
			storage: fileStorage
		}),
	]
})
export class CommunityModule {
}
