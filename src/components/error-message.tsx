"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

interface ErrorMessageProps {
	message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
	return (
		<motion.div
			className="text-red-500 overflow-hidden"
			initial={{ opacity: 0, height: 0, marginBottom: 0 }}
			animate={{
				opacity: 1,
				height: "auto",
				marginBottom: "1rem",
			}}
			exit={{ opacity: 0, height: 0, marginBottom: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<XCircle className="inline-block mr-2" /> {message}
		</motion.div>
	);
}
