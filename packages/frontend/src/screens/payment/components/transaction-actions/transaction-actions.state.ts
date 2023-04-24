import { useCallback, useEffect } from 'react';
import { useMeta, useOrdersRequest } from 'utils/hooks';
import { IOrder } from 'types';

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

  const handleLoadAddress = useCallback(async () => {
    await connectToAccount();
  }, []);

  const handlePay = useCallback(async () => {
    const recipe = await createTx(ethCost.toString(), addressFrom);

    if (recipe) {
      setMetaResponse(recipe);
    }

    if (typeof recipe === 'string') {
      updateOrder(number.toString(), { paymentHash: recipe });
    }
  }, [addressFrom]);

  useEffect(() => {
    checkMetaMaskConnection();
    getCurrency(totalPrice.toString());
  }, []);

  return {
    ethCost,
    isAddress,
    addressFrom,
    metaError,
    isLoading,
    isConnected,
    isPayDisabled,
    handlePay,
    handleLoadAddress,
  };
};
