import * as React from "react"
import { cn } from "@radchenkobohdan/utils";
import { badgeVariants } from './badgeVariants';
import { BadgeProps } from './Badge.types';

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export default Badge
