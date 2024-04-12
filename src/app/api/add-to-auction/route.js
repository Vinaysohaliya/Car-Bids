import prisma from "../config/prisma";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { vehicleId } = await req.json();

  try {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 7);

    const auction = await prisma.auction.create({
      data: {
        vehicleId,
        duration: 7,
        endTime: endTime.toISOString() 
      }
    });
    
    console.log(auction);
    
    return NextResponse.json({ message: 'Vehicle added to auction', auction }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

