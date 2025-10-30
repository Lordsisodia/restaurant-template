"use client";

import type { LoyaltyTopDinersContent } from '../../types/schema';
import LoyaltyTopDinersPrimary from '../primary/LoyaltyTopDinersPrimary';

export default function LoyaltyTopDinersTemplate2(props: LoyaltyTopDinersContent) {
  return <LoyaltyTopDinersPrimary {...props} />;
}
