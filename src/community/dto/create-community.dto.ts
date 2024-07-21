import {ApiProperty} from "@nestjs/swagger";

export class CreateCommunityDto {
    @ApiProperty()
    title: string

    @ApiProperty({nullable: true})
    image?: Express.Multer.File
}
