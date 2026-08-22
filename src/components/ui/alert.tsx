import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-1 border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:size-5",
  {
    variants: {
      variant: {
        default: "border-[#0084ff]/30 bg-[#0084ff]/10 text-[#dceeff]",
        success: "border-[#22c55e]/35 bg-[#22c55e]/10 text-[#dcfce7]",
        destructive: "border-[#ef4444]/35 bg-[#ef4444]/10 text-[#fee2e2]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return <h5 className={cn("col-start-2 text-[13px] font-[900] tracking-[0.5px]", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("col-start-2 text-[11px] leading-relaxed opacity-80", className)} {...props} />;
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("col-start-3 row-span-2 self-center", className)} {...props} />;
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
