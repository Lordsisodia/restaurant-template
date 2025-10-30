"use client";

import Link from 'next/link';
import { Clock, MapPin, MessageCircle, Phone, Bike } from 'lucide-react';
import type { ReactNode } from 'react';
import type { EssentialsContent } from '../../types/schema';

export default function EssentialsPrimary({
  hours,
  address,
  whatsapp,
  phone,
  partners,
}: EssentialsContent) {
  const tel = normalizePhone(phone);
  const wa = normalizePhone(whatsapp);
  const mapHref = address ? `https://www.google.com/maps?q=${encodeURIComponent(address)}` : undefined;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-4">
      <div className="flex flex-wrap gap-2">
        {hours ? (
          <Chip icon={<Clock className="h-4 w-4" />} label={hours} />
        ) : null}
        {address && mapHref ? (
          <Chip asLink href={mapHref} icon={<MapPin className="h-4 w-4" />} label="Map" />
        ) : null}
        {wa ? (
          <Chip asLink href={`https://wa.me/${wa}`} icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" />
        ) : null}
        {tel && !wa ? (
          <Chip asLink href={`tel:${tel}`} icon={<Phone className="h-4 w-4" />} label="Call" />
        ) : null}
        {partners && partners.length > 0 ? (
          <Chip icon={<Bike className="h-4 w-4" />} label={partners.join(' • ')} />
        ) : null}
      </div>
    </section>
  );
}

function Chip({ asLink, href, icon, label }: { asLink?: boolean; href?: string; icon: ReactNode; label: string }) {
  const content = (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
      {icon}
      {label}
    </span>
  );

  if (asLink && href) {
    return (
      <Link href={href} target="_blank" className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

function normalizePhone(input?: string | null) {
  if (!input) return null;
  return input.replace(/[^+\d]/g, '');
}
