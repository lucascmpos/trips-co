import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params: { reservationId } }: { params: { reservationId: string } }
) {
  if (!reservationId) {
    return NextResponse.json(
      { message: "Missing reservationId" },
      { status: 400 }
    );
  }

  try {
    const reservation = await db.tripReservation.delete({
      where: {
        id: reservationId,
      },
    });

    return NextResponse.json(reservation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
