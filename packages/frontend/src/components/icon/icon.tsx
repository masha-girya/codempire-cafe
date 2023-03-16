import React, { memo } from 'react';

import eye from 'assets/icons/eye.svg';
import eyeCross from 'assets/icons/eye-cross.svg';
import logo from 'assets/icons/cafe-logo.svg';
import logoWhite from 'assets/icons/cafe-logo-white.svg';
import cart from 'assets/icons/cart.svg';
import cartHover from 'assets/icons/cart-hover.svg';
import notifications from 'assets/icons/notifications.svg';
import notificationsHover from 'assets/icons/notifications-hover.svg';
import search from 'assets/icons/search.svg';

export const ICONS = {
  eye,
  logo,
  cart,
  search,
  eyeCross,
  logoWhite,
  cartHover,
  notifications,
  notificationsHover,
} as const;

export type TIcon = keyof typeof ICONS;

export const Icon = memo(({ type }: { type: TIcon }) => {
  return (
    <img alt={type} src={ICONS[type]} />
  );
});

Icon.displayName = 'Icon';
