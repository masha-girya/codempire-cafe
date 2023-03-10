import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, HashService, UserEntity } from '../user';
import {  } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private hashService: HashService,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;
    const createdUser = new UserEntity();

    createdUser.email = email;
    createdUser.password = password;
    createdUser.role = role;

    const user = await this.getUserByEmail(email);

    if (user) {
      throw new BadRequestException({
        message: 'User have already been registered',
      });
    }

    createdUser.password = await this.hashService.hashPassword(
      createdUser.password
    );

    await this.usersRepository.save(createdUser);

    return createdUser;
  }
}
