import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, HashService, UserEntity } from '../user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => HashService))
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
    createdUser.role = role ? role : 'authorizedUser';

    const user = await this.usersRepository.findOneBy({ email });

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

  async updateUser(createUserDto: CreateUserDto) {
    const { email, name, surname, phone } = createUserDto;

    if(email.length === 0) {
      throw new NotFoundException();
    }

    const user = await this.getUserByEmail(email);

    user.name = name;
    user.surname = surname;
    user.phone = phone;

    await this.usersRepository.save(user);

    return user;
  }
}
