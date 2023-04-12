import { useMemo } from 'react';

interface IProps {
  error: string | null;
}

export const useDate = ({ error }: IProps) => {
  const errorTimeMessage = useMemo(() => {
    switch (error) {
      case 'minTime': {
        return 'Select future time';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  return { errorTimeMessage };
};
