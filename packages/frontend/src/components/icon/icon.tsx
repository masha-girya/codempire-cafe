import React, { memo } from 'react';
import { ReactComponent as Eye } from 'assets/icons/eye.svg';
import { ReactComponent as EyeCross } from 'assets/icons/eye-cross.svg';
import { ReactComponent as Logo } from 'assets/icons/cafe-logo.svg';
import { ReactComponent as LogoWhite } from 'assets/icons/cafe-logo-white.svg';
import { ReactComponent as Cart } from 'assets/icons/cart.svg';
import { ReactComponent as Notifications } from 'assets/icons/notifications.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Profile } from 'assets/icons/profile.svg';
import { ReactComponent as Orders } from 'assets/icons/orders.svg';

export const ICONS = {
  eye: Eye,
  logo: Logo,
  cart: Cart,
  home: Home,
  search: Search,
  orders: Orders,
  profile: Profile,
  eyeCross: EyeCross,
  logoWhite: LogoWhite,
  notifications: Notifications,
} as const;

export type TIcon = keyof typeof ICONS;

export const Icon = memo(({ type }: { type: TIcon}) => {
  const IconComponent = ICONS[type];

  return (
    <IconComponent />
  );
});

Icon.displayName = 'Icon';
