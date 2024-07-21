import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req} from '@nestjs/common';
import {CommunityService} from './community.service';
import {CreateCommunityDto} from './dto/create-community.dto';
import {UpdateCommunityDto} from './dto/update-community.dto';
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {JoinCommunityDto} from "./dto/join-community.dto";
import {DeleteCommunityDto} from "./dto/delete-community.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {RequestWithUserTgId} from "../types";
import {UpdateLastVisitInterceptor} from "../user/interceptors/user-update-last-visit-interceptor/user-update-last-visit-interceptor.interceptor";

@Controller('community')
@ApiTags("Сообщества")
export class CommunityController {
	constructor(private readonly communityService: CommunityService) {
	}

	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'), UpdateLastVisitInterceptor)
	@Post('create')
	create(@UploadedFile() image: Express.Multer.File, @Body() createCommunityDto: CreateCommunityDto, @Req() req: RequestWithUserTgId) {
		createCommunityDto.image = image
		return this.communityService.create(createCommunityDto, req.userTgId);
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Post('join')
	join(@Body() joinCommunityDto: JoinCommunityDto, @Req() req: RequestWithUserTgId) {
        return this.communityService.join(joinCommunityDto, req.userTgId)
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Get()
	findAll() {
		return this.communityService.findAll();
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.communityService.findOne(+id);
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Patch('update/:id')
	update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto, @Req() req: RequestWithUserTgId) {
		return this.communityService.update(+id, updateCommunityDto, req.userTgId);
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Delete('delete')
	remove(@Body() deleteCommunityDto: DeleteCommunityDto, @Req() req: RequestWithUserTgId) {
		return this.communityService.remove(deleteCommunityDto, req.userTgId);
	}
}
