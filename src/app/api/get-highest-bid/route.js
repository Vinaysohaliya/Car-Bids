import prisma from '../../config/prisma';
import { NextResponse } from 'next/server';

export  async function POST(req) {
  try {
    const { vehicleId } = await req.json();

    // Find the current highest bid for the specified vehicle
    const highestBid = await prisma.bid.findFirst({
      where: { auction: { vehicleId } },
      orderBy: { amount: 'desc' },
    });

    if (!highestBid) {
      return NextResponse.json({ message: 'No bids found for this vehicle' }, { status: 404 });
    }

    return NextResponse.json({ highestBid }, { status: 200 });
  } catch (error) {
    console.error('Error getting highest bid:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
