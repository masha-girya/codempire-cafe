import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  ArrayContains,
  ArrayOverlap,
  ILike,
  Not,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DishEntity,
  CreatedDishDto,
  cutDescription,
} from '../dish';
import { SORT } from 'types';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishEntity)
    private dishRepository: Repository<DishEntity>,
  ) {}

  async getDishes(categories: string[] | string = [], sortBy: string) {
    let dishes;

    if(categories.length === 0) {
      dishes = await this.dishRepository.find({
        order: {
          [sortBy || 'createdDate']: 'ASC',
        },
      });
    } else {
      dishes = await this.dishRepository.find({
        where: {
          categories: ArrayOverlap([categories].flat()),
        },
        order: {
          [sortBy || 'createdDate']: 'ASC',
        },
      });
    }

    const updatedDishes: CreatedDishDto[] = dishes.map(dish => {
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

  async getRecommended(id: string) {
    const dish = await this.getDishById(id);

    const { categories, ingredients } = dish;

    const recommended = await this.dishRepository.find({
      where: {
        id: Not(id),
        categories: ArrayOverlap(categories),
        ingredients: ArrayOverlap(ingredients),
      }
    });

    const updatedDishes: CreatedDishDto[] = recommended.map(dish => {
      const { description } = dish;
      dish.description = cutDescription(description);

      return dish;
    });

    return updatedDishes;
  }

  async getByQuery(query: string) {
    const normalizedQuery = query[0].toUpperCase() + query.slice(1);

    const productsByQuery = await this.dishRepository.find({
      where:
        [
          { title: ILike(`%${query}%`) },
          { description: ILike(`%${query}%`) },
          { ingredients: ArrayContains([normalizedQuery]) },
          { categories: ArrayContains([normalizedQuery]) },
        ],
    });
  
    const mappedProducts = productsByQuery.map(dish => {
      const { title, description, id } = dish;
      return { title, description, id, type: 'dishes' };
    });
  
    return mappedProducts;
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

  async getCategories() {
    const [ food, drink ] = await Promise.all([
      await this.dishRepository.findBy({ sort: SORT.food }),
      await this.dishRepository.findBy({ sort: SORT.drink }),
    ]);

    const foodCategories = food.map(dish => dish.categories).flat();
    const drinkCategories = drink.map(dish => dish.categories).flat();

    const uniqueCategories = {
      food: [...new Set(foodCategories)],
      drinks: [...new Set(drinkCategories)],
    };

    return uniqueCategories;
  }
}
