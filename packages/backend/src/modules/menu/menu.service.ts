import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import {
  ArrayContains,
  ArrayOverlap,
  ILike,
  Not,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DishService } from 'modules/dish';
import {
  MenuEntity,
  CreatedMenuDto,
  UpdatedMenuDto,
  getDishesProperties,
  getTotalWeight,
} from '../menu';
import { OrderMenuService } from 'modules/order-menu';
import { OrderService } from 'modules/order';
import { UserService } from 'modules/user';
import { ERROR_CONSTANTS as ERROR } from '@constants';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
    @Inject(forwardRef(() => DishService))
    private dishService: DishService,
    @Inject(forwardRef(() => OrderMenuService))
    private orderMenuService: OrderMenuService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async getMenus(categories: string[] | string = [], sortBy?: string) {
    let menus;

    if(categories.length === 0) {
      menus = await this.menuRepository.find({
        order: {
          [sortBy || 'createdDate']: 'ASC',
        },
      });
    } else {
      menus = await this.menuRepository.find({
        where: {
          categories: ArrayOverlap([categories].flat()),
        },
        order: {
          [sortBy || 'createdDate']: 'ASC',
        },
      });
    }

    return menus;
  }

  async getMenuById(id: string) {
    const menu = await this.menuRepository.findOneBy({ id });

    if (!menu) {
      throw new NotFoundException();
    }

    return menu;
  }

  async getMenuNamesById(ids: string[]) {
    const menusNames = await Promise.all(ids.map(async(id) => {
      const menu = await this.menuRepository.findOne({
        where: {
          id,
        },
      });

      return menu.title;
    }));

    return menusNames;
  }

  async getRecommended(id: string) {
    const menu = await this.getMenuById(id);

    const { categories, ingredients } = menu;

    const recommended = await this.menuRepository.find({
      where: {
        id: Not(id),
        categories: ArrayOverlap(categories),
        ingredients: ArrayOverlap(ingredients),
      }
    });

    return recommended;
  }

  async getByQuery(query: string) {
    const normalizedQuery = query[0].toUpperCase() + query.slice(1);

    const menusByQuery = await this.menuRepository.find({
      where:
        [
          { title: ILike(`%${query}%`) },
          { description: ILike(`%${query}%`) },
          { ingredients: ArrayContains([normalizedQuery]) },
          { categories: ArrayContains([normalizedQuery]) },
        ],
    });
  
    const dishesByQuery = await this.dishService.getByQuery(query);
  
    const mappedMenus = menusByQuery.map(menu => {
      const { title, description, id } = menu;
      return { title, description, id, type: 'menus' };
    });
  
    return [...dishesByQuery, ...mappedMenus];
  }

  async addMenu(createdMenuDto: CreatedMenuDto, bufferImage: Buffer) {
    const { title, dishesId } = createdMenuDto;

    const menu = await this.menuRepository.findOneBy({ title });

    if (menu) {
      throw new BadRequestException(ERROR.MENU_EXISTS);
    }

    const createdMenu = new MenuEntity();

    Object.assign(createdMenu, createdMenuDto);

    const dishes = await Promise.all(
      dishesId.map(async (dishId) => (
        await this.dishService.getDish(dishId, 'id')
      )
    ));

    createdMenu.dishes = dishes;

    createdMenu.ingredients = dishes.map(dish => dish.title);
    createdMenu.categories = getDishesProperties(dishes, 'categories');
    createdMenu.allergens = getDishesProperties(dishes, 'allergens');

    createdMenu.weight = getTotalWeight(dishes);

    const base64Image = bufferImage.toString('base64');
    createdMenu.image = base64Image;

    await this.menuRepository.save(createdMenu);

    return createdMenu;
  }

  async updateMenu(
    id: string,
    updatedMenuDto: UpdatedMenuDto,
    bufferImage: Buffer,
  ) {
    const { allergensToAdd, ingredientsToAdd, userId } = updatedMenuDto;
    const menu = await this.getMenuById(id);

    Object.assign(menu, updatedMenuDto);

    if(bufferImage) {
      const base64Image = bufferImage.toString('base64');
      menu.image = base64Image;
    }

    if(allergensToAdd) {
      menu.allergens = Array.isArray(allergensToAdd)
        ? allergensToAdd
        : [allergensToAdd];
    }

    if(userId) {
      const user = await this.userService.getUser(userId, 'id');
      menu.editedBy = user;
    }

    if(typeof ingredientsToAdd === 'string') {
      menu.ingredients = [ingredientsToAdd];
      const dish = await this.dishService.getDish(ingredientsToAdd, 'title');
      menu.dishesId = [dish.id];
      menu.dishes = [dish];
      menu.categories = getDishesProperties([dish], 'categories');
    } else {
      menu.ingredients = ingredientsToAdd;
      const dishes = await this.dishService.getDishesByValue(ingredientsToAdd, 'title');
      menu.dishesId = dishes.map(dish => dish.id);
      menu.dishes = await this.dishService.getDishesByValue(menu.dishesId, 'id');
      menu.categories = getDishesProperties(dishes, 'categories');
    }

    await this.menuRepository.save(menu);

    return menu;
  }

  async removeMenu(id: string) {
    const menu = await this.menuRepository.findOne({
      where: {
        id,
      },
      relations: ['orderMenus'],
    });

    if(menu.orderMenus.length > 0) {
      await this.removeMenuOrder(menu);
    }

    await this.menuRepository.delete(id);

    return true;
  }

  async removeMenuOrder(menu: CreatedMenuDto) {
    const orderActual = await this.orderMenuService
      .getOrderDishesStatus(menu.orderMenus[0].menuId);

    if(orderActual.length > 0) {
      throw new BadRequestException(ERROR.MENU_IN_ORDER);
    }

    const orderDishIds = menu.orderMenus.map(orderMenu => orderMenu.id);

    for(const orderDishId of orderDishIds) {
      await this.orderMenuService.removeOrderDishes(orderDishId);
    }

    await this.orderService.removeOrderProduct(menu.id, 'menuId');
  }

  async removeDishFormMenu(dishId: string) {
    const menus = await this.menuRepository.find({
      where: {
        dishesId: ArrayContains([dishId]),
      },
      relations: ['dishes'],
    });

    if(!menus) {
      return;
    }

    const dish = await this.dishService.getDish(dishId, 'id');

    for(const menu of menus) {
      menu.dishesId = menu.dishesId.filter(idDish => idDish !== dishId);
      menu.dishes = menu.dishes.filter(dish => dish.id !== dishId);
      menu.ingredients = menu.ingredients.filter(ingredient => dish.title !== ingredient);
      await this.menuRepository.save(menu);
    }
  }
}
