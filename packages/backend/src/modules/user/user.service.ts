import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, HashService, UserEntity } from '../user';
import { AuthService } from 'auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => HashService))
    private hashService: HashService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
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

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

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

  async updateUser(id: string, createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const userExists = await this.usersRepository.findOneBy({ email });

    if(userExists && userExists.email !== email ) {
      throw new ConflictException('Email is already exists');
    }

    const user = await this.getUserById(id);
    const token = await this.authService.login(user);

    Object.assign(user, createUserDto);

    await this.usersRepository.save(user);

    return { user, token };
  }

  async removeUser(id: string) {
    await this.usersRepository.delete(id);
  }
}
