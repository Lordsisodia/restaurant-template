"use client";

import type { HeroContent } from '../../types/schema';
import HeroPrimary from '../primary/HeroPrimary';

export default function HeroTemplate3(props: HeroContent) {
  return <HeroPrimary {...props} />;
}
