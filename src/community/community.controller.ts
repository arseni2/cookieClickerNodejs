import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import {CommunityService} from './community.service';
import {CreateCommunityDto} from './dto/create-community.dto';
import {UpdateCommunityDto} from './dto/update-community.dto';
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {JoinCommunityDto} from "./dto/join-community.dto";
import {DeleteCommunityDto} from "./dto/delete-community.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('community')
@ApiTags("Сообщества")
export class CommunityController {
	constructor(private readonly communityService: CommunityService) {
	}

	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@Post('create')
	create(@UploadedFile() image: Express.Multer.File, @Body() createCommunityDto: CreateCommunityDto) {
		createCommunityDto.image = image
		return this.communityService.create(createCommunityDto);
	}

	@Post('join')
	join(@Body() joinCommunityDto: JoinCommunityDto) {
        return this.communityService.join(joinCommunityDto)
	}

	@Get()
	findAll() {
		return this.communityService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.communityService.findOne(+id);
	}

	@Patch('update/:id')
	update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
		return this.communityService.update(+id, updateCommunityDto);
	}

	@Delete('delete')
	remove(@Body() deleteCommunityDto: DeleteCommunityDto) {
		return this.communityService.remove(deleteCommunityDto);
	}
}
