import {
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useRequest } from 'utils/hooks';
import { updateUser } from 'screens/auth';
import { useAppDispatch, useAppSelector } from 'store';
import { userActions } from 'store/features';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';

interface IProps {
  setSuccess: Dispatch<SetStateAction<boolean>>,
}

export const useEditAddress = (props: IProps) => {
  const { setSuccess } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sendUniqueRequest } = useRequest();

  const { id, email, address } = useAppSelector(state => state.user);

  const [ addressesOnAdd, setAddressesOnAdd ] = useState<string[]>([]);
  const [ checkedAddresses, setCheckedAddresses ] = useState(address);
  const [ error, setError ] = useState('');

  const totalAddresses = useMemo(() => {
    return [...address, ...addressesOnAdd];
  }, [address, addressesOnAdd]);

  const formik = useFormik({
    initialValues: {
      enteredAddress: '',
    },
    onSubmit: async(values, { resetForm }) => {
      const { enteredAddress } = values;

      if(totalAddresses.includes(enteredAddress)) {
        setError('This address is already on the list');
        return;
      }

      if(enteredAddress.trim().length === 0) {
        setError('Address can`t be empty');
        return;
      }

      setAddressesOnAdd(prev => [...prev, enteredAddress.trim()]);

      resetForm();
    },
  });

  const updateAddress = async(id: string, address: string[]) => {
    const data = {
      address,
      email,
    };

    const { user } = await sendUniqueRequest(async() => (
      await updateUser(id, data)
    ));

    dispatch(userActions.setAddress(user.address));

    return true;
  };

  const handleClose = () => {
    navigate(ROUTE.PROFILE);
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if(checkedAddresses.includes(value)) {
      setCheckedAddresses((prev: string[]) => prev.filter(state => state !== value));
      return;
    }

    setCheckedAddresses((prev: string[]) => [...prev, value]);
  };

  const handleSubmitAddress = async() => {
    const request = await updateAddress(id, [...checkedAddresses]);

    if(request) {
      setSuccess(true);
    }
  };

  useEffect(() => {
    setError('');
  }, [formik.values]);

  return {
    error,
    formik,
    totalAddresses,
    checkedAddresses,
    handleClose,
    handleCheckChange,
    handleSubmitAddress,
  };
};
