import {ApiProperty} from "@nestjs/swagger";

export class DeleteCommunityDto {
	@ApiProperty()
	communityId: number
}