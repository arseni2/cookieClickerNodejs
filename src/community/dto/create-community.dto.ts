import {ApiProperty} from "@nestjs/swagger";

export class CreateCommunityDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    authorId: number

    @ApiProperty({nullable: true})
    image?: Express.Multer.File
}
