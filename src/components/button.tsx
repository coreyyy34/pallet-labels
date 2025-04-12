import type React from "react";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/util";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-300 m-[1px] focus-visible:outline-none focus-visible:ring-1 disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				primary:
					"bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus-visible:ring-blue-500",
				secondary:
					"bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
				tertiary:
					"bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 focus-visible:ring-gray-400",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-3 rounded-md",
				lg: "h-11 px-8 rounded-md",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	}
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";

export default Button;
