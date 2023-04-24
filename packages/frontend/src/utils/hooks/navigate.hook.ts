import { useLocation } from 'react-router-dom';

export const useNavigateBack = () => {
  const { pathname } = useLocation();
  
  const index = pathname.lastIndexOf('/');
  const link = pathname.slice(0, index);

  return { link };
};
