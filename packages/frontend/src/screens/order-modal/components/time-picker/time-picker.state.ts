import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo } from 'react';

interface IProps {
  deliveryTime: Dayjs,
  setDeliveryTime: (value: React.SetStateAction<Dayjs>) => void,
  error: string | null,
}

export const useTimePicker = (props: IProps) => {
  const { deliveryTime, setDeliveryTime, error }= props;

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'minTime': {
        return 'Select future time';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  const handleDeliveryTimeChange = useCallback((newTime: Dayjs | null) => {
    if(newTime) {
      setDeliveryTime(newTime);
    } else {
      setDeliveryTime(dayjs());
    }
  }, [deliveryTime]);

  const handleIncrease = () => {
    const minutes = deliveryTime.minute();
    let changedTime;

    if(minutes > 30) {
      changedTime = deliveryTime.add(60 - minutes, 'minute');
    } else if(minutes < 30) {
      changedTime = deliveryTime.add(30 - minutes, 'minute');
    } else {
      changedTime = deliveryTime.add(30, 'minute');
    }

    handleDeliveryTimeChange(changedTime);
  };

  const handleDecrease = () => {
    const minutes = deliveryTime.minute();
    let changedTime;

    if(minutes > 30) {
      changedTime = deliveryTime.add(30 - minutes, 'minute');
    } else if(minutes < 30 && minutes > 0) {
      changedTime = deliveryTime.subtract(minutes, 'minute');
    } else {
      changedTime = deliveryTime.subtract(30, 'minute');
    }

    handleDeliveryTimeChange(changedTime);
  };

  return {
    errorMessage,
    handleIncrease,
    handleDecrease,
    handleDeliveryTimeChange,
  };
};
