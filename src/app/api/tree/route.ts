import { NextResponse } from "next/server";
import mockData from "@/data/tree.json";

export async function GET() {
	return NextResponse.json(mockData);
}
