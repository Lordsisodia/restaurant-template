import type { SpecialsTemplateProps, SpecialsVariant } from './types';
import Template1 from './template-1';
import Template2 from './template-2';
import Template3 from './template-3';

const VARIANTS: Record<SpecialsVariant, (props: SpecialsTemplateProps) => JSX.Element> = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
};

export function SpecialsHost({
  variant = 'template-1',
  ...props
}: SpecialsTemplateProps & { variant?: SpecialsVariant }) {
  const Component = VARIANTS[variant] ?? Template1;
  return <Component {...props} />;
}

export const specialsVariants = Object.keys(VARIANTS) as SpecialsVariant[];
