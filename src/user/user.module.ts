import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';
import {CardModule} from "../card/card.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity]), CardModule],
  exports: [UserService]
})
export class UserModule {}
