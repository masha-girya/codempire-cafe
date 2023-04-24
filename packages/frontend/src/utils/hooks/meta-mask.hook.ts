import { useCallback, useState } from 'react';
import Web3 from 'web3';
import fx from 'money';
import { META_CONSTANTS as META } from 'constants-app';
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
    setMetaError('Please, download MetaMask extension');
  }, []);

  const connectToAccount = useCallback(async() => {
    await sendUniqueRequest(async() => {
      const account = await sendUniqueRequest(web3.eth.requestAccounts);

      if(account[0].length > 0) {
        setAddressFrom(account[0]);
        return;
      }

      setMetaError('You have to choose MetaMask account');
    });

    return;
  }, []);

  const getCurrency = useCallback(async(priceUAH: string) => {
    const rates = await sendUniqueRequest(getCurrencyRate);
    fx.base = 'UAH';
    fx.rates = { 'ETH': rates.ETH };

    const priceETH = fx(priceUAH).from('UAH').to('ETH');

    if(priceETH) {
      setEthCost(priceETH);
    }
  }, []);

  const getTxRecipe = useCallback(async(hash: string) => {
    setIsLoading(true);

    const checkRecipeLoop: any = sendUniqueRequest(() => (
      web3.eth.getTransactionReceipt(hash, (err, res) => {

        if(res) {
          return res.transactionHash;
        }

        return checkRecipeLoop();
      })
    ));

    setIsLoading(false);

    return checkRecipeLoop();
  }, []);

  const createTx = useCallback(async(priceETH: string, addressFrom: string) => {
    const value = web3.utils.toWei(priceETH.toString());

    const txObject = {
      to: META.ADDRESS_TO,
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

    const recipe = await getTxRecipe(response.transactionHash);

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
