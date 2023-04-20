import React from 'react';
import { EditSelectMultiple, EditSingleValue } from '../../components';
import { useEditCategories } from './edit-categories.state';
import { IChangeProductFunctions } from 'types';
import './edit-categories.scss';

interface IProps {
  categoriesCurrent: string[],
  categoryOnAdd: string,
  errorsCategories: string | string[] | undefined,
  errorsCategoryOnAdd: string | undefined,
  changeFunctions: IChangeProductFunctions,
}

export const EditCategories = (props: IProps) => {
  const {
    changeFunctions,
    categoriesCurrent,
    categoryOnAdd,
    errorsCategories,
    errorsCategoryOnAdd,
  } = props;
  const {
    handleChange,
    handleChipAdd,
    setFieldValue,
    handleChipRemove,
  } = changeFunctions;
  const { categories, handleSelectChange } = useEditCategories({
    setFieldValue,
  });

  const handleCategoryAdd = () => handleChipAdd(
    categoryOnAdd,
    categoriesCurrent,
    'categories',
    'categoryOnAdd',
  );

  return (
    <div className="edit-categories">
      <div className="edit-categories__box">
        <EditSelectMultiple
          name="categories"
          loadedData={categories}
          values={categoriesCurrent}
          errorsValues={errorsCategories}
          handleChipRemove={handleChipRemove}
          handleSelectChange={handleSelectChange}
        />
      </div>

      <div className="edit-categories__box">
        <EditSingleValue
          title="Add new category"
          name="categoryOnAdd"
          value={categoryOnAdd}
          handleChange={handleChange}
          isMultiple={true}
          handleMultiple={handleCategoryAdd}
          errorsValue={errorsCategoryOnAdd}
        />
      </div>
    </div>
  );
};
