import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty({nullable: true})
    refId?: number;
}
