import React from 'react';
import { FormGroup } from '@mui/material';
import { MainButton } from 'components/button';
import {
  OrderAddress,
  OrderDate,
  OrderComment,
} from './components';
import { useOrderModal } from './order-modal.state';
import './order-modal.scss';

export const OrderModal = () => {
  const {
    formik,
    deliveryDate,
    deliveryTime,
    handleSkip,
    handleDeliveryDateChange,
    handleDeliveryTimeChange,
  } = useOrderModal();

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <div className="order">
      <FormGroup>
        <OrderAddress
          setFieldValue={setFieldValue}
          currentAddress={values.currentAddress}
          handleChange={handleChange}
        />

        <OrderDate
          date={values.date}
          handleChange={handleChange}
          deliveryDate={deliveryDate}
          deliveryTime={deliveryTime}
          handleDeliveryDateChange={handleDeliveryDateChange}
          handleDeliveryTimeChange={handleDeliveryTimeChange}
        />

        <OrderComment
          comment={values.comment}
          handleChange={handleChange}
        />

        <div className="order__actions">
          <MainButton
            type="reset"
            text="Skip"
            isSecondary={true}
            onHandleClick={handleSkip}
          />

          <MainButton
            type="submit"
            text="Create"
            onHandleClick={handleSubmit}
          />
        </div>
      </FormGroup>
    </div>
  );
};
