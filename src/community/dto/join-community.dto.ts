import {ApiProperty} from "@nestjs/swagger";

export class JoinCommunityDto {
    @ApiProperty()
    communityId: number
}
