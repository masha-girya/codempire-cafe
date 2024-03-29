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
    error,
    setError,
    addressError,
    isLoading,
    deliveryDate,
    deliveryTime,
    isButtonDisabled,
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
              addressError={addressError}
            />

            <OrderDate
              date={values.date}
              handleChange={handleChange}
              deliveryDate={deliveryDate}
              deliveryTime={deliveryTime}
              setDeliveryDate={setDeliveryDate}
              setDeliveryTime={setDeliveryTime}
              error={error}
              setError={setError}
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
          text={isOrderOnConfirm ? 'Pay' : 'Create'}
          onHandleClick={isOrderOnConfirm ? handleSubmit : handleConfirmOrder}
          isDisabled={isButtonDisabled}
        />
      </div>
    </FormGroup>
  );
};
