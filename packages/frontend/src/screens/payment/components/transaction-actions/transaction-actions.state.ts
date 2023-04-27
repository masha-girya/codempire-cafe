import { useCallback, useEffect, useState } from 'react';
import { Unit } from 'web3-utils';
import { SelectChangeEvent } from '@mui/material';
import { useMeta, useOrdersRequest } from 'utils/hooks';
import { IOrder, ETHER } from 'types';

interface IProps {
  order: IOrder;
  setMetaResponse: React.Dispatch<React.SetStateAction<Error | string | null>>;
}

export const useTransactionActions = (props: IProps) => {
  const { order, setMetaResponse } = props;
  const {
    getCurrency,
    connectToAccount,
    checkMetaMaskConnection,
    createTx,
    ethCost,
    addressFrom,
    metaError,
    isLoading,
    isConnected,
  } = useMeta();

  const { updateOrder } = useOrdersRequest({});
  const { totalPrice, number } = order;

  const isAddress = addressFrom.length > 0;
  const isPayDisabled = !isAddress || metaError.length > 0 || isLoading;
  const etherValues: Partial<Unit>[] = Object.keys(ETHER) as Partial<Unit>[];

  const [ currency, setCurrency ] = useState(etherValues[0]);

  const handleSelectEther = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as keyof typeof ETHER;
    setCurrency(value);
  };

  const handleLoadAddress = useCallback(async () => {
    await connectToAccount();
  }, []);

  const handlePay = useCallback(async () => {
    const recipe = await createTx(ethCost.toString(), addressFrom, currency);

    if (recipe) {
      setMetaResponse(recipe);
    }

    if (typeof recipe === 'string') {
      updateOrder(number.toString(), { paymentHash: recipe });
    }
  }, [addressFrom, currency]);

  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  useEffect(() => {
    getCurrency(totalPrice.toString(), ETHER[currency as keyof typeof ETHER]);
  }, [currency]);

  return {
    ethCost,
    currency,
    isAddress,
    addressFrom,
    etherValues,
    metaError,
    isLoading,
    isConnected,
    isPayDisabled,
    handlePay,
    handleLoadAddress,
    handleSelectEther,
  };
};
