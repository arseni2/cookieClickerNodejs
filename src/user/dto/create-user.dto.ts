import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    tgId: string;

    @ApiProperty()
    username: string;

    @ApiProperty({nullable: true})
    refId?: number;
}
