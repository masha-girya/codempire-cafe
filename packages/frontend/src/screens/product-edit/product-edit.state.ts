import { useState } from 'react';
import { useFormik } from 'formik';
import { IDish, IFormikProduct, IMenu } from 'types';
import { validationProduct } from 'utils/helpers';
import { useRequest } from 'utils/hooks';
import { updateDish, updateMenu } from 'utils/api';
import { useAppSelector } from 'store';

interface IProps {
  product: IDish | IMenu,
}

export const useProductEdit = ({ product }: IProps) => {
  const { sendUniqueRequest } = useRequest();
  const { id: userId } = useAppSelector(state => state.user);
  const {
    id,
    description,
    ingredients,
    allergens,
    weight,
    price,
    image,
  } = product;
  const [ newImage, setNewImage ] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      description,
      ingredients,
      ingredientOnAdd: '',
      allergens,
      allergenOnAdd: '',
      weight,
      price,
      image: `data:image/png;base64,${image}`,
    },
    validationSchema: validationProduct,
    onSubmit: async (values) => {
      if(!values.ingredients.length) {
        return;
      }

      const success = await editProduct(values);

      if(success) {
        window.location.reload();
      }
    }
  });

  const editProduct = async(values: IFormikProduct) => {
    const {
      description,
      ingredients,
      allergens,
      weight,
      price,
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

    ingredients.forEach(ingredient => formData.append('ingredientsToAdd', ingredient));
    allergens.forEach(allergen => formData.append('allergensToAdd', allergen));
    formData.append('weight', weight.toString());
    formData.append('price', price.toString());
    formData.append('userId', userId);

    let response = null;
    
    if ('dishesId' in product) {
      response = await sendUniqueRequest(() => updateMenu(id, formData));
    } else {
      response = await sendUniqueRequest(() => updateDish(id, formData));

    }

    return response;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      formik.setFieldValue('image', URL.createObjectURL(files[0]));
      setNewImage(files[0]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return {
    formik,
    handleKeyDown,
    handleImageUpload,
  };
};
