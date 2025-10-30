"use client";

import type { LoyaltyMembershipShowcaseContent } from '../../types/schema';
import LoyaltyMembershipShowcasePrimary from '../primary/LoyaltyMembershipShowcasePrimary';

export default function LoyaltyMembershipShowcaseTemplate3(props: LoyaltyMembershipShowcaseContent) {
  return <LoyaltyMembershipShowcasePrimary {...props} />;
}
