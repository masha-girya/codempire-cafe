import React, { memo } from 'react';

import eye from 'assets/icons/eye.svg';
import eyeCross from 'assets/icons/eye-cross.svg';
import logo from 'assets/icons/cafe-logo.svg';

export const ICONS = {
  eye,
  eyeCross,
  logo,
} as const;

export type TIcon = keyof typeof ICONS;

export const Icon = memo(({ type }: { type: TIcon }) => {
  return (
    <img alt={type} src={ICONS[type]} />
  );
});

Icon.displayName = 'Icon';
