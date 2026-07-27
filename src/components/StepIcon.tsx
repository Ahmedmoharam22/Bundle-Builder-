import React from "react";
import {
  Camera,
  ShieldCheck,
  Radio,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Camera,
  ShieldCheck,
  Radio,
  ShieldAlert,
};

interface StepIconProps {
  name: string;
  className?: string;
}

export const StepIcon: React.FC<StepIconProps> = ({
  name,
  className = "w-5 h-5 text-indigo-600",
}) => {
  const IconComponent = iconMap[name] || Camera;

  return <IconComponent className={className} />;
};