import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const { startDate, endDate, userId, tripId, totalPaid, guests } = req;

    const trip = await db.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      return NextResponse.json(
        { error: { code: "TRIP_NOT_FOUND" } },
        { status: 404 }
      );
    }

    await db.tripReservation.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
        tripId,
        totalPaid,
        guests,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
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
