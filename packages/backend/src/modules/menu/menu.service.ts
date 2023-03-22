import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ArrayContains, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DishService } from 'modules/dish';
import {
  MenuEntity,
  CreatedMenuDto,
  getDishesProperties,
  getTotalWeight,
} from '../menu';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
    private dishService: DishService,
  ) {}

  async getMenus(categories: string[]) {
    let menus;

    if(categories.length === 0) {
      menus = await this.menuRepository.find();
    } else {
      menus = await this.menuRepository
      .findBy({
        categories: ArrayContains(categories) });
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

  async addMenu(createdMenuDto: CreatedMenuDto, bufferImage: Buffer) {
    const { title, dishesId } = createdMenuDto;

    const menu = await this.menuRepository.findOneBy({ title });

    if (menu) {
      throw new BadRequestException({
        message: 'Menu is already exists',
      });
    }

    const createdMenu = new MenuEntity();

    Object.assign(createdMenu, createdMenuDto);

    const dishes = await Promise.all(
      dishesId.map(async (dishId) => (
        await this.dishService.getDishById(dishId)
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

  async updateMenu(id: string, updatedMenuDto: CreatedMenuDto, bufferImage: Buffer) {
    const menu = await this.getMenuById(id);

    Object.assign(menu, updatedMenuDto);

    if(bufferImage) {
      const base64Image = bufferImage.toString('base64');
      menu.image = base64Image;
    }

    await this.menuRepository.save(menu);

    return menu;
  }

  async removeMenu(id: string) {
    await this.menuRepository.delete(id);
  }
}
