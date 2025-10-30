import type { Meta, StoryObj } from '@storybook/react';
import { HeroRenderer } from '..';
import { heroMocks } from '../data/mock';

const meta: Meta<typeof HeroRenderer> = {
  title: 'Domains/Landing / HeroSection',
  component: HeroRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof HeroRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: heroMocks['primary'],
  },
};

export const ClassicCenter: Story = {
  args: {
    variant: 'classic-center',
    content: heroMocks['classic-center'],
  },
};

export const GradientWords: Story = {
  args: {
    variant: 'gradient-words',
    content: heroMocks['gradient-words'],
  },
};

export const LogoCenter: Story = {
  args: {
    variant: 'logo-center',
    content: heroMocks['logo-center'],
  },
};

export const MinimalCenter: Story = {
  args: {
    variant: 'minimal-center',
    content: heroMocks['minimal-center'],
  },
};

export const SplitLeft: Story = {
  args: {
    variant: 'split-left',
    content: heroMocks['split-left'],
  },
};

export const VideoOverlay: Story = {
  args: {
    variant: 'video-overlay',
    content: heroMocks['video-overlay'],
  },
};

export const AnimatedText: Story = {
  args: {
    variant: 'animated-text',
    content: heroMocks['animated-text'],
  },
};

export const Typewriter: Story = {
  args: {
    variant: 'typewriter',
    content: heroMocks['typewriter'],
  },
};

export const BlurFade: Story = {
  args: {
    variant: 'blur-fade',
    content: heroMocks['blur-fade'],
  },
};

export const FlipWords: Story = {
  args: {
    variant: 'flip-words',
    content: heroMocks['flip-words'],
  },
};

export const TypingAnimation: Story = {
  args: {
    variant: 'typing-animation',
    content: heroMocks['typing-animation'],
  },
};

export const MagicReveal: Story = {
  args: {
    variant: 'magic-reveal',
    content: heroMocks['magic-reveal'],
  },
};

export const RevealText: Story = {
  args: {
    variant: 'reveal-text',
    content: heroMocks['reveal-text'],
  },
};

export const SamsungEffect: Story = {
  args: {
    variant: 'samsung-effect',
    content: heroMocks['samsung-effect'],
  },
};
