import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/user.entity';
import { UserController } from 'modules/user/user.controller';
import { UserService } from 'modules/user/user.service';
import { HashService } from 'modules/user/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, HashService],
  controllers: [UserController],
})
export class UserModule {}
