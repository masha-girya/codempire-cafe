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
import { ReactComponent as SelectIcon } from 'assets/icons/select-icon.svg';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { ReactComponent as Back } from 'assets/icons/back.svg';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Minus } from 'assets/icons/minus.svg';
import { ReactComponent as DatePicker } from 'assets/icons/date-picker.svg';
import { ReactComponent as CheckMark } from 'assets/icons/check-mark.svg';

export const ICONS = {
  eye: Eye,
  logo: Logo,
  cart: Cart,
  home: Home,
  back: Back,
  plus: Plus,
  minus: Minus,
  close: Close,
  search: Search,
  filter: Filter,
  orders: Orders,
  profile: Profile,
  eyeCross: EyeCross,
  logoWhite: LogoWhite,
  checkMark: CheckMark,
  datePicker: DatePicker,
  rightArrow: RightArrow,
  selectIcon: SelectIcon,
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
