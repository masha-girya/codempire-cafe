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
import { IPassword } from 'utils/types';

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
      password
    );

    await this.usersRepository.save(createdUser);

    return createdUser;
  }

  async updateUser(
    id: string,
    createUserDto: CreateUserDto,
    bufferAvatar: Buffer,
    ) {
    const { email } = createUserDto;
    const userExists = await this.usersRepository.findOneBy({ email });

    if(userExists && userExists.id !== id) {
      throw new ConflictException('Email is already exists');
    }

    const user = await this.getUserById(id);

    Object.assign(user, createUserDto);

    if(bufferAvatar) {
      const base64Avatar = bufferAvatar.toString('base64');
      user.avatar = base64Avatar;
    }

    await this.usersRepository.save(user);

    const token = await this.authService.login(user);

    return { user, token };
  }

  async changePassword(id: string, passwords: IPassword) {
    const user = await this.usersRepository.findOneBy({ id });
    const { oldPass, newPass} = passwords;

    const isOldPassValid = await this.hashService.comparePassword(oldPass, user.password);

    if(!isOldPassValid) {
      throw new BadRequestException({
        message: 'You have entered a wrong password',
      });
    }

    user.password = await this.hashService.hashPassword(newPass);

    await this.usersRepository.save(user);

    const token = await this.authService.login(user);

    return { token };
  }

  async removeUser(id: string) {
    await this.usersRepository.delete(id);
  }
}
