"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/domains/shared/components';
import { Clock, Flame, Leaf, Wheat } from 'lucide-react';
import { getMenuItemImage } from '@/domains/customer-facing/menu/shared/utils/menu-images';
import type { MenuItem } from '@/domains/customer-facing/menu/shared/types';
import type { MenuItemDetailContent } from '../../types';

interface Props extends MenuItemDetailContent {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function MenuItemDetailPrimary({
  isOpen = false,
  onClose,
  heroImageUrl,
  gallery,
  id,
  name,
  description,
  price,
  currency,
  category,
  imageUrl,
  isVegetarian,
  isVegan,
  isGlutenFree,
  isSpicy,
  calories,
  protein,
  carbs,
  sugar,
  fat,
  prepTimeMin,
  spiceLevel,
  allergens,
  pairings,
  chefTip,
  origin,
  availability,
  winePairing,
  preparationNotes,
  isHalal,
  isKosher,
  servingSizeGrams,
}: Props) {
  const fallbackItem: MenuItem = {
    id,
    name,
    description: description ?? null,
    price,
    category: category ?? '',
    image_url: imageUrl ?? null,
    is_vegetarian: isVegetarian ?? false,
    is_vegan: isVegan ?? false,
    is_gluten_free: isGlutenFree ?? false,
    is_spicy: isSpicy ?? false,
    ingredients: null,
    calories: calories ?? null,
    protein_g: protein ?? null,
    carbs_g: carbs ?? null,
    sugar_g: sugar ?? null,
    fat_g: fat ?? null,
    prep_time_min: prepTimeMin ?? null,
    allergens: allergens ?? null,
    is_halal: isHalal ?? null,
    is_kosher: isKosher ?? null,
    spice_level: spiceLevel ?? null,
    serving_size_g: servingSizeGrams ?? null,
    is_seasonal: null,
    is_new: null,
    created_at: null,
    pairings: pairings ?? null,
    chef_tip: chefTip ?? null,
    popular_score: 0,
  };

  const heroImage = heroImageUrl ?? getMenuItemImage(fallbackItem, 'hero');

  const priceLabel = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency ?? 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Dialog open={isOpen} onOpenChange={(value) => (value ? undefined : onClose?.())}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden border-white/20 bg-black p-0 text-white">
        <DialogHeader className="sr-only">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description ?? 'Menu item detail'}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="relative h-[52vh] w-full overflow-hidden md:h-[60vh]">
            <img src={heroImage} alt={name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {category ? (
                <Badge className="bg-white/10 backdrop-blur-xl border-white/30 text-white text-sm px-4 py-2 shadow-2xl">
                  {category}
                </Badge>
              ) : null}
              {isSpicy ? (
                <Badge className="bg-red-500/20 text-red-200 border-red-500/40">Spicy</Badge>
              ) : null}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h1 className="mb-4 text-4xl font-bold drop-shadow-2xl md:text-5xl">{name}</h1>
              <div className="text-5xl font-bold text-transparent drop-shadow-2xl bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text md:text-6xl">
                {priceLabel}
              </div>
            </div>
          </div>

          <div className="space-y-10 p-8 md:p-12">
            {description ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-xl">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
                  About this dish
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed">{description}</p>
              </div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <QuickFactCard
                  icon={<Clock className="h-6 w-6 text-orange-400" />}
                  label="Preparation time"
                  value={prepTimeMin != null ? `${prepTimeMin} minutes` : 'Made to order'}
                />
                <QuickFactCard icon={<span className="text-2xl">⚖️</span>} label="Serving size" value={servingSizeGrams != null ? `${servingSizeGrams} g` : 'Single serving'} />
                <DietaryBadges
                  isVegetarian={isVegetarian}
                  isVegan={isVegan}
                  isGlutenFree={isGlutenFree}
                  isSpicy={isSpicy}
                  isHalal={isHalal}
                  isKosher={isKosher}
                  spiceLevel={spiceLevel}
                />
              </div>

              <div className="space-y-6">
                {origin ? (
                  <InfoBlock title="Origin" body={origin} />
                ) : null}
                {availability ? (
                  <InfoBlock title="Availability" body={availability} />
                ) : null}
                {winePairing ? (
                  <InfoBlock title="Pairing suggestion" body={winePairing} />
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <InfoBlock
                title="Nutrition per serving"
                body={
                  <ul className="grid grid-cols-2 gap-3 text-sm text-gray-200">
                    <li>Calories: {calories ?? '—'} kcal</li>
                    <li>Protein: {protein ?? '—'} g</li>
                    <li>Carbs: {carbs ?? '—'} g</li>
                    <li>Fat: {fat ?? '—'} g</li>
                    {sugar != null ? <li>Sugars: {sugar} g</li> : null}
                  </ul>
                }
              />
              {preparationNotes ? <InfoBlock title="Preparation notes" body={preparationNotes} /> : null}
            </div>

            {(allergens && allergens.length > 0) || (pairings && pairings.length > 0) ? (
              <div className="grid gap-6 md:grid-cols-2">
                {allergens && allergens.length > 0 ? (
                  <InfoBlock
                    title="Allergens"
                    body={
                      <div className="flex flex-wrap gap-2 text-sm text-red-300">
                        {allergens.map((allergen) => (
                          <span key={allergen} className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-1">
                            {allergen}
                          </span>
                        ))}
                      </div>
                    }
                  />
                ) : null}
                {pairings && pairings.length > 0 ? (
                  <InfoBlock title="Pairs well with" body={pairings.join(', ')} />
                ) : null}
              </div>
            ) : null}

            {chefTip ? <InfoBlock title="Chef tip" body={chefTip} /> : null}

            {gallery && gallery.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">Gallery</h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {gallery.map((src) => (
                    <img key={src} src={src} alt={`${name} gallery`} className="h-40 w-full rounded-xl object-cover" />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface QuickFactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function QuickFactCard({ icon, label, value }: QuickFactCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-300">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

interface DietaryBadgesProps {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  isHalal?: boolean | null;
  isKosher?: boolean | null;
  spiceLevel?: number | null;
}

function DietaryBadges({ isVegetarian, isVegan, isGlutenFree, isSpicy, isHalal, isKosher, spiceLevel }: DietaryBadgesProps) {
  if (!isVegetarian && !isVegan && !isGlutenFree && !isSpicy && !isHalal && !isKosher && !spiceLevel) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {isVegetarian ? (
        <Badge className="border-green-500/40 bg-green-500/10 text-green-300">Vegetarian</Badge>
      ) : null}
      {isVegan ? (
        <Badge className="border-green-600/40 bg-green-600/10 text-green-200">Vegan</Badge>
      ) : null}
      {isGlutenFree ? (
        <Badge className="border-blue-500/40 bg-blue-500/10 text-blue-200">Gluten Free</Badge>
      ) : null}
      {isSpicy ? (
        <Badge className="border-red-500/40 bg-red-500/10 text-red-200">Spicy</Badge>
      ) : null}
      {isHalal ? (
        <Badge className="border-emerald-500/40 bg-emerald-500/10 text-emerald-200">Halal</Badge>
      ) : null}
      {isKosher ? (
        <Badge className="border-amber-500/40 bg-amber-500/10 text-amber-200">Kosher</Badge>
      ) : null}
      {spiceLevel ? (
        <Badge className="border-red-500/40 bg-red-500/10 text-red-200">
          {Array.from({ length: spiceLevel }).map((_, index) => (
            <span key={index}>🌶</span>
          ))}
        </Badge>
      ) : null}
    </div>
  );
}

interface InfoBlockProps {
  title: string;
  body: React.ReactNode;
}

function InfoBlock({ title, body }: InfoBlockProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{title}</h3>
      <div className="text-sm text-gray-200 leading-relaxed">{body}</div>
    </div>
  );
}
