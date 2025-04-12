"use client";

import { useEffect } from "react";

const OpenPrintDialog = () => {
	useEffect(() => {
		const handle = window.requestAnimationFrame(() => {
			window.print();
		});

		return () => window.cancelAnimationFrame(handle);
	}, []);

	return null;
};

export default OpenPrintDialog;
