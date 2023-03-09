import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'modules/user/create-user.dto';
import { HashService } from 'modules/user/hash.service';
import { UserEntity } from 'modules/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private hashService: HashService
  ) {}

  async getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({
      email,
    });
  }

  async registerUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const createdUser = new UserEntity();

    createdUser.email = email;
    createdUser.password = password;

    const user = await this.getUserByEmail(email);

    if (user) {
      throw new BadRequestException();
    }

    createdUser.password = await this.hashService.hashPassword(
      createdUser.password
    );

    await this.usersRepository.save(createdUser);

    return createdUser;
  }
}
