import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import { CreateCommunityDto } from './create-community.dto';

export class UpdateCommunityDto extends OmitType(CreateCommunityDto, ["authorId"]) {
	@ApiProperty()
	userTgId: string
}
