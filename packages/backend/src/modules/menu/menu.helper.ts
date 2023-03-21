import { CreatedDishDto } from 'modules/dish';

export function getDishesProperties(dishes: CreatedDishDto[], prop: string) {
  const newProp = dishes
    .map(dish => dish[prop])
    .reduce((accumulator, currentValue) => (
      accumulator.concat(currentValue)
      ), []);

  return newProp;
}

export function getTotalWeight(dishes: CreatedDishDto[]) {
  const totalWeight = dishes.reduce((accumulator, currentValue) => (accumulator += currentValue.weight), 0);

  return totalWeight;
}
