import { CreatedDishDto } from 'modules/dish';

export function getDishesProperties(dishes: CreatedDishDto[], prop: string) {
  const newProp: string[] = dishes
    .map(dish => dish[prop]).flat();

  return newProp;
}

export function getTotalWeight(dishes: CreatedDishDto[]) {
  const totalWeight = dishes.reduce((accumulator, currentValue) => (accumulator += currentValue.weight), 0);

  return totalWeight;
}
