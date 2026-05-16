import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const toppings = await prisma.topping.findMany();
  return NextResponse.json(toppings);
}
