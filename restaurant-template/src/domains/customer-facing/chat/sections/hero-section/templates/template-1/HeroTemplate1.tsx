"use client";

import type { HeroContent } from '../../types/schema';
import HeroPrimary from '../primary/HeroPrimary';

export default function HeroTemplate1(props: HeroContent) {
  return <HeroPrimary {...props} />;
}
