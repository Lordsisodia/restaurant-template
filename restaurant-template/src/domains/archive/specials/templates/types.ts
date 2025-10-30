export type SpecialsVariant = 'template-1' | 'template-2' | 'template-3';

export interface Special {
  id: string;
  title: string;
  description: string;
  type: 'percent' | 'fixed' | 'bogo';
  value: number;
  savings: string;
  startDate: string | null;
  endDate: string | null;
}

export interface SpecialsTemplateProps {
  specials: Special[];
  tenant: { displayName: string; slug: string };
}
