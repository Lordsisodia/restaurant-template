"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/domains/shared/components";
import { Button } from "@/domains/shared/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/domains/shared/components";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ChevronRight,
  CreditCard,
  Gift,
  History,
  Settings,
  Shield,
  Star,
  Zap,
} from "lucide-react";

type TierKey = "bronze" | "silver" | "gold" | "diamond";

interface MembershipTierDetail {
  points: number;
  nextTier?: TierKey | null;
  nextTierLabel?: string;
  pointsToNextTier?: number;
  benefits: string[];
  cardBackground?: string;
}

interface MembershipCardProps {
  name?: string;
  email?: string;
  avatar?: string;
  memberSince?: string;
  tier?: TierKey;
  points?: number;
  nextTier?: string;
  pointsToNextTier?: number;
  benefits?: string[];
  cardNumber?: string;
  expiryDate?: string;
  tierDetails?: Record<TierKey, MembershipTierDetail>;
}


export const Component = ({
  name = "Berat Berkay",
  email = "bbg@catui.com",
  avatar = "/images/tenants/draco/brand/logo/draco-logo.svg",
  memberSince = "March 2021",
  tier = "gold",
  points = 4250,
  nextTier = "diamond",
  pointsToNextTier = 750,
  benefits = [
    "Cold brew flight after visit five",
    "Chef pairing dinner invites",
    "Priority latte art sessions",
    "Birthday dessert for two",
  ],
  cardNumber = "•••• •••• •••• 5678",
  expiryDate = "09/25",
  tierDetails,
}: MembershipCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tierState, setTierState] = useState<MembershipCardProps["tier"]>(tier);
  const [hasInteracted, setHasInteracted] = useState(false);

  const getTierStyle = (tier: MembershipCardProps["tier"]) => {
    switch (tier) {
      case "bronze":
        return {
          color: "text-amber-700",
          bg: "bg-amber-100",
          border: "border-amber-200",
          gradient: "from-amber-500/40 via-amber-400/20 to-amber-200/10",
          cardBackground: "bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-600/20",
        };
      case "silver":
        return {
          color: "text-slate-500",
          bg: "bg-slate-100",
          border: "border-slate-200",
          gradient: "from-slate-400/40 via-slate-300/20 to-slate-200/10",
          cardBackground: "bg-gradient-to-br from-slate-900/30 via-slate-700/20 to-slate-500/20",
        };
      case "gold":
        return {
          color: "text-amber-500",
          bg: "bg-amber-50",
          border: "border-amber-100",
          gradient: "from-amber-400/40 via-amber-300/20 to-amber-200/10",
          cardBackground: "bg-gradient-to-br from-yellow-900/25 via-amber-700/20 to-yellow-500/20",
        };
      case "diamond":
        return {
          color: "text-sky-500",
          bg: "bg-sky-50",
          border: "border-sky-100",
          gradient: "from-sky-500/40 via-sky-400/20 to-sky-200/10",
          cardBackground: "bg-gradient-to-br from-sky-900/30 via-sky-700/20 to-emerald-500/20",
        };
      default:
        return {
          color: "text-amber-500",
          bg: "bg-amber-50",
          border: "border-amber-100",
          gradient: "from-amber-500/40 via-amber-300/20 to-amber-200/10",
          cardBackground: "bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-600/20",
        };
    }
  };
  const tierKeys: TierKey[] = ["bronze", "silver", "gold", "diamond"];

  const tierStyle = getTierStyle(tierState);
  const configuredTier = hasInteracted && tierDetails ? tierDetails[tierState as TierKey] : undefined;

  const displayPoints = configuredTier?.points ?? points ?? 0;
  const displayBenefits = configuredTier?.benefits ?? benefits;

  const configuredNextTierKey = configuredTier?.nextTier ?? null;
  const configuredNextTierLabel = configuredTier?.nextTierLabel;
  const configuredPointsToNextTier = configuredTier?.pointsToNextTier ?? 0;

  const displayNextTierLabel =
    configuredTier
      ? configuredNextTierLabel ??
        (configuredNextTierKey ? configuredNextTierKey.charAt(0).toUpperCase() + configuredNextTierKey.slice(1) : undefined)
      : nextTier;

  const displayPointsToNextTier = configuredTier
    ? configuredNextTierKey
      ? configuredPointsToNextTier
      : 0
    : pointsToNextTier ?? 0;

  const progressToNextTier = displayPointsToNextTier <= 0
    ? 100
    : Math.min((displayPoints / (displayPoints + displayPointsToNextTier)) * 100, 100);

  const cardBackgroundClass = configuredTier?.cardBackground ?? tierStyle.cardBackground;
  const nextTierMessage =
    displayNextTierLabel && displayPointsToNextTier > 0
      ? `${displayPointsToNextTier.toLocaleString()} points to ${displayNextTierLabel}`
      : "Max tier unlocked";

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tier selector as colored dots */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        {tierKeys.map((t) => {
          const selected = t === tierState;
          const style = getTierStyle(t);

          return (
            <button
              key={t}
              onClick={() => {
                setTierState(t);
                setHasInteracted(true);
              }}
              className={`w-6 h-6 rounded-full cursor-pointer border-2 transition-all duration-300
                ${style.bg} ${style.border}
                ${selected ? "ring-2 ring-offset-2 ring-primary" : "hover:scale-110"}
              `}
              title={t}
            />
          );
        })}
      </div>

      <Card
        className="w-full max-w-md overflow-hidden border-white/15 bg-card/70 shadow-md backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`h-3 w-full bg-gradient-to-r ${tierStyle.gradient}`} />

        <CardHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border">
                <AvatarImage src={avatar || "/images/tenants/draco/brand/logo/draco-logo.svg"} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                {email ? <p className="text-sm text-muted-foreground">{email}</p> : null}
                {memberSince ? (
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Member since {memberSince}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <Badge
              className={`uppercase px-3 py-1 ${tierStyle.color} ${tierStyle.bg} ${tierStyle.border} border`}
            >
              {tierState}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Star className={`h-5 w-5 ${tierStyle.color}`} />
                <span className="font-medium">
                  {displayPoints.toLocaleString()} Points
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {nextTierMessage}
              </span>
            </div>

            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${tierStyle.color.replace("text", "bg")}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressToNextTier}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <motion.div
            className={`relative h-48 rounded-xl overflow-hidden ${tierStyle.border} border-2 p-5 flex flex-col justify-between ${cardBackgroundClass ?? ""}`}
            style={{
              background: `linear-gradient(135deg, var(--background), transparent)`,
            }}
            animate={{
              rotateY: isHovered ? [0, 5, 0] : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(255,255,255,0.8),_rgba(255,255,255,0)_70%)]" />
            </div>

            <div className="flex justify-between items-start relative z-10">
              <div className="uppercase text-sm font-semibold">
                Membership Card
              </div>
              <Shield className={`h-5 w-5 ${tierStyle.color}`} />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="font-mono">{cardNumber}</span>
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">
                    MEMBER NAME
                  </div>
                  <div className="font-medium">{name}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">EXPIRES</div>
                  <div className="font-medium">{expiryDate}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Gift className={`h-5 w-5 ${tierStyle.color}`} />
              <h4 className="font-medium">Membership Benefits</h4>
            </div>

            <ul className="space-y-2">
              {displayBenefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Zap className={`h-4 w-4 ${tierStyle.color}`} />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="p-4 flex justify-between">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <History className="h-3.5 w-3.5" />
            Transaction History
          </Button>
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <Settings className="h-3.5 w-3.5" />
            Manage Membership
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
