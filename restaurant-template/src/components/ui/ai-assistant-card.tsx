'use client';

import { useMemo, useRef, useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import {
  ArrowUp,
  CalendarClock,
  ChartNetworkIcon,
  ImageIcon,
  MapIcon,
  MessageCircle,
  Mic,
  Paperclip,
  PenToolIcon,
  ScanTextIcon,
  SparklesIcon,
  UtensilsCrossed,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const iconLibrary = {
  sparkles: SparklesIcon,
  image: ImageIcon,
  chart: ChartNetworkIcon,
  map: MapIcon,
  pen: PenToolIcon,
  scan: ScanTextIcon,
  calendarClock: CalendarClock,
  messageCircle: MessageCircle,
  utensilsCrossed: UtensilsCrossed,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof iconLibrary;

export type Suggestion = {
  label: string;
  iconKey?: IconKey;
  colorClass?: string;
};

type ModelOption = {
  value: string;
  label: string;
};

export type AiAssistantCardProps = {
  userName?: string;
  headline?: string;
  description?: string;
  suggestions?: Suggestion[];
  modelOptions?: ModelOption[];
  defaultModel?: string;
  /**
   * Optional className overrides applied to the root Card.
   */
  className?: string;
  /**
   * Optional className overrides applied to the CardContent.
   */
  contentClassName?: string;
  /**
   * Controls whether the toolbar buttons render.
   */
  showToolbar?: boolean;
  /**
   * When false, hides the uppercase user name pill in the header.
   */
  showUserName?: boolean;
  /**
   * When true, removes the default minimum height constraint so the card can shrink.
   */
  disableMinHeight?: boolean;
  /**
   * Enables a tighter layout for scenarios where vertical space is limited.
   */
  compact?: boolean;
  /**
   * Optional className overrides applied to the description text.
   */
  descriptionClassName?: string;
};

const defaultSuggestions: Suggestion[] = [
  { label: 'Create image', iconKey: 'image', colorClass: 'text-blue-500' },
  { label: 'Analyze data', iconKey: 'chart', colorClass: 'text-orange-500' },
  { label: 'Make a plan', iconKey: 'map', colorClass: 'text-green-500' },
  { label: 'Summarize text', iconKey: 'scan', colorClass: 'text-pink-500' },
  { label: 'Help me write', iconKey: 'pen', colorClass: 'text-yellow-500' },
  { label: 'More', iconKey: 'sparkles', colorClass: 'text-purple-500' },
];

const defaultModelOptions: ModelOption[] = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5', label: 'GPT-3.5' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gpt-3.5-turbo-16k', label: 'GPT-3.5 Turbo 16k' },
  { value: 'gpt-4-32k', label: 'GPT-4 32k' },
];

export const Component = ({
  userName = 'there',
  headline = 'Welcome back! How can I help?',
  description = "I'm here to help you tackle your tasks. Choose from the prompts below or just tell me what you need!",
  suggestions = defaultSuggestions,
  modelOptions = defaultModelOptions,
  defaultModel = 'gpt-4',
  className,
  contentClassName,
  showToolbar = true,
  showUserName = true,
  disableMinHeight = false,
  compact = false,
  descriptionClassName,
}: AiAssistantCardProps) => {
  const [draft, setDraft] = useState('');

  const resolvedSuggestions = suggestions.map(({ iconKey, colorClass, label }) => {
    const Icon = iconKey ? iconLibrary[iconKey] ?? SparklesIcon : SparklesIcon;
    return { label, Icon, colorClass };
  });

  const canSend = draft.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    setDraft('');
  };

  const headerPadding = compact ? 'px-5 pt-5 pb-4' : 'px-8 pt-8 pb-5';
  const bodyPadding = compact ? 'px-5 pb-5' : 'px-8 pb-8';
  const messagePadding = compact ? 'px-4 py-4' : 'px-6 py-6';

  return (
    <Card
      className={cn(
        'flex h-full min-h-0 w-full max-w-[480px] flex-col gap-6 p-4 shadow-none',
        compact && 'gap-4',
        disableMinHeight ? null : 'min-h-[800px]',
        className,
      )}
    >
      {showToolbar ? (
        <div className="flex flex-row items-center justify-end p-0">
          <Button variant="ghost" size="icon" className="size-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="size-4 text-muted-foreground"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 19a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
              />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="size-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 text-muted-foreground"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </Button>
        </div>
      ) : null}
      <CardContent className={cn('flex h-full min-h-0 flex-col p-0', contentClassName)}>
        <div className={cn('flex h-full min-h-0 flex-col', compact ? 'gap-4' : 'gap-6')}>
          <div className={cn('flex flex-col', headerPadding)}>
            <div className="mb-4 flex justify-center">
              <svg
                fill="none"
                height="48"
                viewBox="0 0 48 48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <filter
                  id="a"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="54"
                  width="48"
                  x="0"
                  y="-3"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="-3" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend in2="shape" mode="normal" result="effect1_innerShadow_3051_46851" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
                  <feBlend in2="effect1_innerShadow_3051_46851" mode="normal" result="effect2_innerShadow_3051_46851" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feMorphology in="SourceAlpha" operator="erode" radius="1" result="effect3_innerShadow_3051_46851" />
                  <feOffset />
                  <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.24 0" />
                  <feBlend in2="effect2_innerShadow_3051_46851" mode="normal" result="effect3_innerShadow_3051_46851" />
                </filter>
                <filter
                  id="b"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="42"
                  width="42"
                  x="3"
                  y="5.25"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feMorphology in="SourceAlpha" operator="erode" radius="1.5" result="effect1_dropShadow_3051_46851" />
                  <feOffset dy="2.25" />
                  <feGaussianBlur stdDeviation="2.25" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_3051_46851" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_3051_46851" mode="normal" result="shape" />
                </filter>
                <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="24" x2="26" y1="0.000001" y2="48">
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="24" x2="24" y1="6" y2="42">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="e" gradientUnits="userSpaceOnUse" x1="24" x2="24" y1="0" y2="48">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <clipPath id="f">
                  <rect height="48" rx="12" width="48" />
                </clipPath>
                <g filter="url(#a)">
                  <g clipPath="url(#f)">
                    <rect fill="#0A0D12" height="48" rx="12" width="48" />
                    <path d="m0 0h48v48h-48z" fill="url(#c)" />
                    <g filter="url(#b)">
                      <path
                        clipRule="evenodd"
                        d="m6 24c11.4411 0 18-6.5589 18-18 0 11.4411 6.5589 18 18 18-11.4411 0-18 6.5589-18 18 0-11.4411-6.5589-18-18-18z"
                        fill="url(#d)"
                        fillRule="evenodd"
                      />
                    </g>
                  </g>
                  <rect height="46" rx="11" stroke="url(#e)" strokeWidth="2" width="46" x="1" y="1" />
                </g>
              </svg>
            </div>
            <div className="flex flex-col space-y-2 text-left">
              {showUserName && userName ? (
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                  {userName}
                </span>
              ) : null}
              <h3 className={cn('text-xl font-semibold tracking-tight text-foreground', compact && 'text-lg')}>
                {headline}
              </h3>
            </div>
            <p
              className={cn(
                'text-sm text-muted-foreground',
                compact && 'text-xs leading-snug',
                descriptionClassName,
              )}
            >
              {description}
            </p>
            {resolvedSuggestions.length > 0 ? (
              <div className={cn('mt-3 flex flex-wrap items-center gap-2', compact && 'gap-1.5 text-xs')}>
                {resolvedSuggestions.map(({ label, Icon, colorClass }, index) => (
                  <Badge
                    key={`${label}-${index}`}
                    variant="secondary"
                    className="h-7 min-w-7 cursor-pointer gap-1.5 rounded-md text-xs [&_svg]:-ms-px [&_svg]:size-3.5 [&_svg]:shrink-0"
                  >
                    <Icon aria-hidden="true" className={colorClass ?? 'text-muted-foreground'} />
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>

          <div className={cn('flex flex-1 min-h-0 flex-col', bodyPadding)}>
            <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-inner backdrop-blur-sm">
              <div className={cn('flex-1 overflow-y-auto', messagePadding)}>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <div className="flex justify-start">
                    <div className="max-w-xs rounded-2xl bg-muted/40 px-3 py-2">
                      We&apos;ll surface your conversation history here once the assistant is wired up.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs rounded-2xl bg-primary px-3 py-2 text-primary-foreground">
                      Ask anything about reservations, catering, or specials to get started.
                    </div>
                  </div>
                </div>
              </div>
              <PromptComposer
                value={draft}
                onChange={setDraft}
                onSubmit={handleSend}
                canSend={canSend}
                modelOptions={modelOptions}
                defaultModel={defaultModel}
                compact={compact}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type PromptComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  canSend: boolean;
  modelOptions: ModelOption[];
  defaultModel: string;
  compact?: boolean;
};

const PromptComposer = ({ value, onChange, onSubmit, canSend, modelOptions, defaultModel, compact }: PromptComposerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const placeholder = useMemo(() => 'Ask me anything…', []);

  const handleSubmit = () => {
    if (!canSend) return;
    onSubmit();
  };

  return (
    <div className={cn('rounded-3xl border border-white/10 bg-[#1F2023] p-3 shadow-[0_10px_26px_rgba(0,0,0,0.32)]', compact && 'rounded-2xl p-2.5')}>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
        placeholder={placeholder}
        className={cn(
          'min-h-[72px] w-full resize-none border-none bg-transparent px-0 text-sm leading-relaxed text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0',
          compact && 'min-h-[60px] text-sm'
        )}
      />

      <div className="mt-2.5 flex flex-col gap-2.5">
        <div className="flex items-center justify-end gap-1.5">
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white/70 hover:text-white">
              <Mic className="size-3.5" />
              <span className="sr-only">Record a voice note</span>
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className={cn(
                'h-8 w-8 rounded-full transition',
                canSend ? 'bg-white text-[#1F2023] hover:bg-white/80' : 'bg-white/10 text-white/40'
              )}
              disabled={!canSend}
            >
              <ArrowUp className="size-3.5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-2.5">
          <Select defaultValue={defaultModel}>
            <SelectTrigger className="h-8 w-[135px] rounded-full border-white/15 bg-[#111217] text-xs text-white/80">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map(({ value: optionValue, label }) => (
                <SelectItem key={optionValue} className="text-xs" value={optionValue}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="ghost"
            className="h-8 gap-1.5 rounded-full px-3 text-xs text-white/70 transition hover:text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="size-3" />
            Attach
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(event) => {
              if (event.target) {
                event.target.value = '';
              }
            }}
          />
          <Button type="button" variant="ghost" className="h-8 gap-1.5 rounded-full px-3 text-xs text-white/70 transition hover:text-white">
            <SparklesIcon className="size-3" />
            Shortcuts
          </Button>
        </div>
      </div>
    </div>
  );
};
