"use client";

import type { LoyaltyMembershipShowcaseContent } from '../../types/schema';
import LoyaltyMembershipShowcasePrimary from '../primary/LoyaltyMembershipShowcasePrimary';

export default function LoyaltyMembershipShowcaseTemplate2(props: LoyaltyMembershipShowcaseContent) {
  return <LoyaltyMembershipShowcasePrimary {...props} />;
}
