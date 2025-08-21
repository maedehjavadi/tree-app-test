"use client";

import dynamic from "next/dynamic";

const MaterialBaseProvider = dynamic(() => import("./MaterialThemeProvider"), {
	ssr: false,
});

export default MaterialBaseProvider;
