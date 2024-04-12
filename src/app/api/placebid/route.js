import { NextResponse } from 'next/server';
import prisma from '../config/prisma';

export  async function POST(req) {
  try {
    const { vehicleId, bidAmount,bidderId,auctionId } = await req.json();

    const bidAmountFloat = parseFloat(bidAmount);
    

    const currentHighestBid = await prisma.bid.findFirst({

        where:{
            auction:{vehicleId}
        },
        orderBy:{
            amount:'desc'
        }
  
    });

    if (currentHighestBid && bidAmount <= currentHighestBid.amount) {
      return NextResponse.json({ error: 'Your bid must be higher than the current highest bid' }, { status: 400 });
    }
    await prisma.bid.create({
      data: {
        amount: bidAmountFloat,
        bidderId: bidderId, 
        // auction: { connect: { vehicleId } },
        auctionId:auctionId
      },
    });

    return NextResponse.json({ message: 'Bid placed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error placing bid:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
