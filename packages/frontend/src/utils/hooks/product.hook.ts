import {
  addDish,
  addMenu,
  getDish,
  getMenu,
  updateDish,
  updateMenu,
} from 'utils/api';
import { IFormikProduct } from 'types';
import { useRequest } from './api.hook';

export const useProduct = () => {
  const { sendUniqueRequest } = useRequest();

  const getProduct = async(id: string, isMenu: boolean) => {
    const product = await sendUniqueRequest(() => {
      if(isMenu) {
        return getMenu(id);
      }
      return getDish(id);
    });

    return product;
  };

  const createFormData = (
    values: IFormikProduct,
    newImage: File | null,
    userId: string,
  ) => {
    const {
      description,
      ingredients,
      categories,
      allergens,
      weight,
      price,
      title,
      sort,
    } = values;

    const formData = new FormData();

    if (newImage) {
      formData.append(
        'image',
        new Blob([newImage], { type: 'image/jpeg' }),
        newImage.name
      );
    }

    formData.append('description', description.trim());
    formData.append('title', title.trim());
    formData.append('weight', weight.toString());
    formData.append('price', price.toString());
    formData.append('userId', userId);
    formData.append('sort', sort);
    ingredients.forEach(ingredient => formData.append('ingredientsToAdd', ingredient));
    allergens.forEach(allergen => formData.append('allergensToAdd', allergen));
    categories.forEach(category => formData.append('categoriesToAdd', category));
    if(allergens.length === 0) {
      formData.append('allergensToAdd', JSON.stringify([]));
    }

    return formData;
  };

  const editProduct = async(
    formData: FormData,
    isMenu: boolean,
    id: string,
  ) => {
    let response = null;

    if (isMenu) {
      response = await sendUniqueRequest(() => updateMenu(id, formData));
    } else {
      response = await sendUniqueRequest(() => updateDish(id, formData));
    }

    return response;
  };

  const addProduct = async(
    formData: FormData,
    isMenu: boolean,
  ) => {
    let response = null;

    if (isMenu) {
      response = await sendUniqueRequest(() => addMenu(formData));
    } else {
      response = await sendUniqueRequest(() => addDish(formData));
    }

    return response;
  };

  return { editProduct, addProduct, createFormData, getProduct };
};
