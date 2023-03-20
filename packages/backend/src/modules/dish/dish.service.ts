import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DishEntity, CreatedDishDto } from '../dish';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishEntity)
    private dishRepository: Repository<DishEntity>,
  ) {}

  async getAllDishes() {
    const dishes = await this.dishRepository.find();
    return dishes;
  }

  async getDishById(id: string) {
    const dish = await this.dishRepository.findOneBy({ id });

    if (!dish) {
      throw new NotFoundException();
    }

    return dish;
  }

  async addDish(createdDishDto: CreatedDishDto) {
    const { title } = createdDishDto;
    const dish = await this.dishRepository.findOneBy({ title });

    if (dish) {
      throw new BadRequestException({
        message: 'Dish is already exists',
      });
    }

    const createdDish = new DishEntity();

    Object.assign(createdDish, createdDishDto);

    await this.dishRepository.save(createdDish);

    return createdDish;
  }

  async updateDish(id: string, updatedDishDto: CreatedDishDto) {
    const dish = await this.getDishById(id);
    Object.assign(dish, updatedDishDto);

    await this.dishRepository.save(dish);

    return dish;
  }

  async removeDish(id: string) {
    await this.dishRepository.delete(id);
  }
}
