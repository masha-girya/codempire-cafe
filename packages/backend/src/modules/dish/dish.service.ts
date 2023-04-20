import {
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import {
  ArrayContains,
  ArrayOverlap,
  ILike,
  In,
  Not,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DishEntity,
  CreatedDishDto,
  UpdatedDishDto,
  cutDescription,
} from '../dish';
import { OrderDishService } from 'modules/order-dish';
import { OrderService } from 'modules/order';
import { MenuService } from 'modules/menu';
import { UserService } from 'modules/user';
import { SORT } from 'types';
import { ERROR_CONSTANTS as ERROR } from '@constants';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishEntity)
    private dishRepository: Repository<DishEntity>,
    @Inject(forwardRef(() => OrderDishService))
    private orderDishService: OrderDishService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    @Inject(forwardRef(() => MenuService))
    private menuService: MenuService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
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

  async getDishesNames() {
    const dishesNames = await this.dishRepository.find({
      select: {
        title: true,
      }
    });

    return dishesNames;
  }

  async getDish(value: string, valueName: string) {
    const dish = await this.dishRepository.findOne({ 
      where: {
        [valueName]: value,
      }
     });

    if (!dish) {
      throw new NotFoundException();
    }

    return dish;
  }

  async getDishesByValue(values: string[], valueName: string) {
    const dishes = await this.dishRepository.find({
      where: {
        [valueName]: In(values),
      }
    });

    return dishes;
  }

  async getRecommended(id: string) {
    const dish = await this.getDish(id, 'id');

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
      throw new BadRequestException(ERROR.DISH_EXISTS);
    }

    const createdDish = new DishEntity();
    const base64Image = bufferImage.toString('base64');

    Object.assign(createdDish, createdDishDto);

    createdDish.image = base64Image;

    await this.dishRepository.save(createdDish);

    return createdDish;
  }

  async updateDish(
    id: string,
    updatedDishDto: UpdatedDishDto,
    bufferImage: Buffer,
  ) {
    const { allergensToAdd, ingredientsToAdd, userId } = updatedDishDto;
    const dish = await this.getDish(id, 'id');

    Object.assign(dish, updatedDishDto);

    if(userId) {
      const user = await this.userService.getUser(userId, 'id');
      dish.editedBy = user;
    }

    if(allergensToAdd) {
      dish.allergens = Array.isArray(allergensToAdd)
        ? allergensToAdd
        : [allergensToAdd];
    }

    if(allergensToAdd) {
      dish.ingredients = Array.isArray(ingredientsToAdd)
        ? ingredientsToAdd
        : [ingredientsToAdd];
    }

    if(bufferImage) {
      const base64Image = bufferImage.toString('base64');
      dish.image = base64Image;
    }

    await this.dishRepository.save(dish);

    return dish;
  }

  async removeDish(id: string) {
    const dish = await this.dishRepository.findOne({
      where: {
        id,
      },
      relations: ['orderDishes'],
    });

    if(dish.orderDishes.length > 0) {
      await this.removeDishOrder(dish);
    }

    await this.menuService.removeDishFormMenu(id);
    await this.dishRepository.delete(id);

    return true;
  }

  async removeDishOrder(dish: CreatedDishDto) {
    const orderActual = await this.orderDishService
      .getOrderDishesStatus(dish.orderDishes[0].dishId);

    if(orderActual.length > 0) {
      throw new BadRequestException(ERROR.DISH_IN_ORDER);
    }

    const orderDishIds = dish.orderDishes.map(orderDish => orderDish.id);

    for(const orderDishId of orderDishIds) {
      await this.orderDishService.removeOrderDishes(orderDishId);
    }

    await this.orderService.removeOrderProduct(dish.id, 'dishId');
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
