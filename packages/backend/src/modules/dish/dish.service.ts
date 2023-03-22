import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ArrayContains, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DishEntity, CreatedDishDto, cutDescription } from '../dish';
import { SORT } from 'utils/types';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishEntity)
    private dishRepository: Repository<DishEntity>,
  ) {}

  async getDishes(categories: string[]) {
    let dishes;

    if(categories.length === 0) {
      dishes = await this.dishRepository.find();
    } else {
      dishes = await this.dishRepository
      .findBy({
        categories: ArrayContains(categories) });
    }

    const updatedDishes = dishes.map(dish => {
      const { description } = dish;

      dish.description = cutDescription(description);

      return dish;
    });

    return updatedDishes;
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

  async getCategories(sort: SORT) {
    const dishes = await this.dishRepository.findBy({ sort });

    const categories = dishes.map(dish => dish.categories).flat();

    const uniqueCategories = [...new Set(categories)];

    return uniqueCategories;
  }
}
