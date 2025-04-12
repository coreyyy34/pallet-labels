import { cn } from "@/utils/util";
import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cn(
					"w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm m-[1px] text-gray-900",
					"shadow-sm placeholder-gray-400",
					"focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
					"transition duration-200 ease-in-out",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
