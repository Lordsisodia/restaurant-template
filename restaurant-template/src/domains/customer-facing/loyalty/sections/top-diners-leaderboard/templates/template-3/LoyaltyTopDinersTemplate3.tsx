"use client";

import type { LoyaltyTopDinersContent } from '../../types/schema';
import LoyaltyTopDinersPrimary from '../primary/LoyaltyTopDinersPrimary';

export default function LoyaltyTopDinersTemplate3(props: LoyaltyTopDinersContent) {
  return <LoyaltyTopDinersPrimary {...props} />;
}
