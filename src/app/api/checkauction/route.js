import { NextResponse } from 'next/server';
import prisma from '../config/prisma';

export async function POST(req) {
  const { vehicleId } = await req.json();
  console.log(vehicleId);
  try {
    const auction = await prisma.auction.findFirst({
      where: {
        vehicleId,
        startTime: { lte: new Date() }, // Auction has started
        endTime: { gt: new Date() },    // Auction has not ended
      },
    });

    if (auction) {
      return NextResponse.json({ auctionFound: true,auction }, { status: 200 });
    }
    
    return NextResponse.json({ auctionFound: false,auction }, { status: 200 });
  } catch (error) {
    console.error('Error checking auction status:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
