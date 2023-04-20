import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { IDish, IMenu } from 'types';
import { validationProduct, validationMenu } from 'utils/helpers';
import { useAppSelector } from 'store';
import { useProduct } from 'utils/hooks/product.hook';

interface IProps {
  product: IDish | IMenu,
}

export const useProductEdit = ({ product }: IProps) => {
  const { pathname } = useLocation();
  const { editProduct, addProduct, createFormData } = useProduct();
  const { id: userId } = useAppSelector(state => state.user);

  const { id, image } = product;
  const [ newImage, setNewImage ] = useState<File | null>(null);
  const [ isSuccess, setIsSuccess ] = useState(false);

  const isOnAdd = pathname.includes('home/add');
  const isMenu = pathname.includes('menu');

  const formik = useFormik({
    initialValues: {
      ...product,
      categoryOnAdd: '',
      ingredientOnAdd: '',
      allergenOnAdd: '',
      image: `data:image/png;base64,${image}`,
    },
    validationSchema: isMenu ? validationMenu : validationProduct,
    onSubmit: async (values) => {
      if(values.image.length === 0) {
        return;
      }

      const formData = createFormData(values, newImage, userId);

      let response;

      if(isOnAdd) {
        response = await addProduct(formData, isMenu);
      } else {
        response = await editProduct(formData, isMenu, id);
      }

      if(response) {
        setIsSuccess(true);
        window.scrollTo({ top: document.body.scrollHeight });
      }

      if(isOnAdd && response) {
        formik.resetForm();
      }
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      formik.setFieldValue('image', URL.createObjectURL(files[0]));
      setNewImage(files[0]);
    }
  };

  const handleSuccessClose = useCallback(() => {
    setIsSuccess(false);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    setIsSuccess(false);
  }, [formik.values]);

  return {
    formik,
    isSuccess,
    handleKeyDown,
    handleImageUpload,
    handleSuccessClose,
  };
};
