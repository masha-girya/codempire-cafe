import { useCallback, useState } from 'react';
import { Unit } from 'web3-utils';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import fx from 'money';
import { ETHER } from 'types';
import { ERROR_CONSTANTS as ERROR } from 'constants-app';
import { useRequest } from 'utils/hooks';
import { getCurrencyRate } from 'utils/api';

export const useMeta = () => {
  let web3: Web3;

  if (window.ethereum && window.ethereum.isMetaMask) {
    web3 = new Web3(window.ethereum);
  }

  const { sendUniqueRequest, isLoading, setIsLoading } = useRequest();
  const [ ethCost, setEthCost ] = useState(0);
  const [ addressFrom, setAddressFrom ] = useState('');
  const [ metaError, setMetaError ] = useState('');
  const [ isConnected, setIsConnected ] = useState(true);

  const checkMetaMaskConnection = useCallback(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setIsConnected(true);
      return;
    }

    setIsConnected(false);
    setMetaError(ERROR.META_NOT_AVAILABLE);
  }, []);

  const connectToAccount = useCallback(async() => {
    await sendUniqueRequest(async() => {
      const account = await sendUniqueRequest(web3.eth.requestAccounts);

      if(account[0].length > 0) {
        setAddressFrom(account[0]);
        return;
      }

      setMetaError(ERROR.META_NO_ACCOUNT);
    });

    return;
  }, []);

  const getCurrency = useCallback(async(priceUAH: string, currency = ETHER.ether) => {
    const rates = await sendUniqueRequest(() => getCurrencyRate(currency));

    fx.base = 'UAH';
    fx.rates = { [currency]: rates[currency] };

    const priceETH = fx(priceUAH).from('UAH').to(currency);

    if(priceETH) {
      setEthCost(priceETH);
    }
  }, []);

  const getTxRecipe = useCallback(async(hash: string) => {
    setIsLoading(true);

    const checkRecipeLoop: () => Promise<TransactionReceipt> = async() => (
      await web3.eth.getTransactionReceipt(hash, (err, res) => {
        if(res) {
          return res;
        }

        return checkRecipeLoop();
      })
    );

    setIsLoading(false);

    return checkRecipeLoop();
  }, []);

  const createTx = useCallback(async(
    priceETH: string,
    addressFrom: string,
    currency?: Partial<Unit>,
  ) => {
    const value = web3.utils.toWei(priceETH.toString(), currency);

    const txObject = {
      to: process.env.REACT_APP_ADDRESS_TO,
      from: addressFrom,
      value,
    };

    const response = await sendUniqueRequest(() => (
      web3.eth.sendTransaction(txObject, (err, res) => {
        if(res) {
          return res;
        }
        return err;
      })
    ));

    const recipe = await sendUniqueRequest(() => (
      getTxRecipe(response.transactionHash)
    ));

    return recipe.transactionHash;
  }, []);
  
  return {
    getCurrency,
    connectToAccount,
    createTx,
    getTxRecipe,
    checkMetaMaskConnection,
    ethCost,
    addressFrom,
    metaError,
    isLoading,
    isConnected,
  };
};
