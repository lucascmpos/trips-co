import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const reservations = await db.tripReservation.findMany({
      where: {
        userId,
      },
      include: {
        trip: true,
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: { code: "INTERNAL_SERVER_ERROR", message: error.message } },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unknown error occurred",
          },
        },
        { status: 500 }
      );
    }
  }
}
