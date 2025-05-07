import {  getUserByEmail } from '@/backend/users/UsersRepository';
import { connectDB } from '../../../backend/mongodb/MongoDbProvider'
import { User } from "../../../backend/mongodb/models/Users";
import { NextResponse } from 'next/server';
export const revalidate = 60
export  async function GET(
    request: Request
) {
    try {
        console.log(request)
        const userResponse=await getUserByEmail("asdasdas");
        return NextResponse.json(userResponse, { status: 200 });
        } catch (e) {
        return   NextResponse.json({ error: `Failed to create post${e}` }, { status: 500 });
    }
}
export  async function POST(
    request: Request
) {
    try {
        console.log(request)
        await connectDB() //
      const  user= await  User.create(
            {
                name: "test",
                email: `email@${Math.random()}`,
                password: "111222333",

            }
        );
        return NextResponse.json(user, { status: 201 });
        } catch (e) {
        return   NextResponse.json({ error: `Failed to create post${e}` }, { status: 500 });
    }
}