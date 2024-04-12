import { NextRequest, NextResponse } from 'next/server';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, role } = body;
        
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json({ success: false, message: 'Email already exists. Please use a different email.' },{status:400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {

                name,
                email,  
                password: hashedPassword,
                role,
                
            },
        });

        return NextResponse.json({ success: true, message: 'User signed up successfully!', data: newUser },{status:200});
    } catch (error) {
        console.error('Sign up failed:', error);
        return NextResponse.json({ success: false, message: 'Sign up failed. Please try again.' },{status:500});
    }
}
