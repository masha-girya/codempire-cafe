import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DishEntity, CreatedDishDto, cutDescription } from '../dish';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishEntity)
    private dishRepository: Repository<DishEntity>,
  ) {}

  async getAllDishes() {
    const dishes = await this.dishRepository.find();
    const upDishes = dishes.map(dish => {
      const { description } = dish;

      dish.description = cutDescription(description);

      return dish;
    });

    return upDishes;
  }

  async getDishById(id: string) {
    const dish = await this.dishRepository.findOneBy({ id });

    if (!dish) {
      throw new NotFoundException();
    }

    return dish;
  }

  async addDish(createdDishDto: CreatedDishDto, bufferImage: Buffer) {
    const { title } = createdDishDto;
    const dish = await this.dishRepository.findOneBy({ title });

    if (dish) {
      throw new BadRequestException({
        message: 'Dish is already exists',
      });
    }

    const createdDish = new DishEntity();
    const base64Image = bufferImage.toString('base64');

    Object.assign(createdDish, createdDishDto);

    createdDish.image = base64Image;

    await this.dishRepository.save(createdDish);

    return createdDish;
  }

  async updateDish(id: string, updatedDishDto: CreatedDishDto, bufferImage: Buffer) {
    const dish = await this.getDishById(id);

    Object.assign(dish, updatedDishDto);

    if(bufferImage) {
      const base64Image = bufferImage.toString('base64');
      dish.image = base64Image;
    }

    await this.dishRepository.save(dish);

    return dish;
  }

  async removeDish(id: string) {
    await this.dishRepository.delete(id);
  }
}
