import { NextResponse } from 'next/server'; // Corrected import statement
import prisma from '../config/prisma';

export async function POST(req) {
    const { registrationNumber, description, userId } = await req.json();

    const vehicle = await prisma.vehicle.findFirst({
        where: {
            registrationNumber
        }
    })

    if (vehicle) {
        return NextResponse.json({ message: "vehicle already exist" }, { status: 400 })
    }

    try {
        const newVehicle = await prisma.vehicle.create({
            data: {
                registrationNumber,
                description,
                userId,
            }
        });

        if (newVehicle) {
            return NextResponse.json({ newVehicle }, { status: 200 }); 
        } else {
            return NextResponse.json(null, { status: 400 }); 
        }
    } catch (error) {
        console.error('Error creating vehicle:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 }); 
    }
}
