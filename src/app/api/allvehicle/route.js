import prisma from "../config/prisma";
import { NextResponse } from 'next/server';


export async function GET(req) {
    try {

        const allvehicle=await prisma.vehicle.findMany();
        if (!allvehicle) {
        return NextResponse.error({ message: 'vehicle not found' }, { status: 500 }); 
        }

        return NextResponse.json({allvehicle},{status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        const {id}= await req.json();
        const allvehicle=await prisma.vehicle.findMany(
            {
                where:{
                    userId:id
                }
            }
        );
        if (!allvehicle) {
        return NextResponse.error({ message: 'vehicle not found' }, { status: 500 }); 
        }

        return NextResponse.json({allvehicle},{status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    }
}
