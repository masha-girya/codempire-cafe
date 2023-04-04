import React, { memo } from 'react';
import { useAppSelector } from 'store';
import './address-list.scss';

export const AddressList = memo(() => {
  const { address: addresses } = useAppSelector(state => state.user);

  return (
    <div className="address-list">
      {addresses.map(address => (
          <li
            key={address}
            className="address-list__field"
          >
            <p>{address}</p>
          </li>)
      )}
    </div>
  );
});

AddressList.displayName = 'AddressList';
