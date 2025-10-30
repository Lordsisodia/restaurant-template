import * as React from 'react';

import { Button, type ButtonProps } from './primitives/buttons/shadcn-ui-button';

const SolidButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', ...props }, ref) => <Button ref={ref} variant={variant} {...props} />,
);

SolidButton.displayName = 'SolidButton';

export { SolidButton };

export type { ButtonProps as SolidButtonProps } from './primitives/buttons/shadcn-ui-button';
