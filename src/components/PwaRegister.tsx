"use client";

import { useEffect } from "react";

const PwaRegister = () => {
	useEffect(() => {
		if (process.env.NODE_ENV !== "production") return;
		if (!("serviceWorker" in navigator)) return;

		navigator.serviceWorker.register("/sw.js").catch(() => {
			// ignore
		});
	}, []);

	return null;
};

export default PwaRegister;
