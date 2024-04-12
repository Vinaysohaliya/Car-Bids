import { NextResponse } from 'next/server';
import prisma from '../config/prisma';

export async function POST(req) {
    try {
        const { input } = await req.json(); 
        const vehicles = await prisma.vehicle.findMany({
            where: {
                name: {
                    mode:"insensitive",
                    startsWith: input
                }
            }
        });
        if (vehicles.length === 0) {
            return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Vehicle(s) found', data: vehicles }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    }
}
