import React from 'react';
import { FormGroup } from '@mui/material';
import { MainButton } from 'components/button';
import {
  OrderAddress,
  OrderDate,
  OrderComment,
  OrderInfo,
} from '../../components';
import { useOrderCreation } from './order-creation.state';
import './order-creation.scss';

interface IProps {
  setIsOrderOnSuccess: (value: React.SetStateAction<boolean>) => void,
}

export const OrderCreation = ({ setIsOrderOnSuccess }: IProps) => {
  const {
    formik,
    isError,
    isLoading,
    deliveryDate,
    deliveryTime,
    isOrderOnConfirm,
    handleSkip,
    setDeliveryDate,
    setDeliveryTime,
    handleConfirmOrder,
  } = useOrderCreation({ setIsOrderOnSuccess });

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik;

  return (
    <FormGroup>
      {isOrderOnConfirm
        ? (
          <OrderInfo
            currentAddress={values.currentAddress}
            date={deliveryDate}
            time={deliveryTime}
            comment={values.comment}
            isLoading={isLoading}
            isError={isError}
          />)
        : (
          <>
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
              setDeliveryDate={setDeliveryDate}
              setDeliveryTime={setDeliveryTime}
            />

            <OrderComment
              comment={values.comment}
              handleChange={handleChange}
            />
          </>)
      }

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
          onHandleClick={isOrderOnConfirm ? handleSubmit : handleConfirmOrder}
          isDisabled={isSubmitting}
        />
      </div>
    </FormGroup>
  );
};
