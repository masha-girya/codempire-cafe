import React from 'react';
import { Input } from 'components/input';
import { MainButton } from 'components/button';
import { useAuthAddInfo } from '../../../screens/auth';
import './auth-add-info.scss';

export const AuthAddInfo = () => {
  const { formik } = useAuthAddInfo();

  const {
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <div className="auth-add-info">
      <div className="auth-add-info__title-block">
        <h1 className="auth-add-info__title">Welcome!</h1>
        <h3 className="auth-add-info__title--secondary">
          Just one little step left
        </h3>
      </div>

      <form
        className="auth-add-info__input-block"
        onSubmit={handleSubmit}
      >
        <h3 className="auth-add-info__subtitle">
          Enter your name:
        </h3>

        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Name Surname"
          isPass={false}
          value={values.name}
          onChange={handleChange}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />

        <h3 className="auth-add-info__subtitle">
          Enter your phone number:
        </h3>

        <Input
          id="phone"
          name="phone"
          type="phone"
          placeholder="Format +380 99 999 99 99"
          isPass={false}
          value={values.phone}
          onChange={handleChange}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />

        <div className="auth-add-info__button">
          <MainButton
            text="Next"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};
