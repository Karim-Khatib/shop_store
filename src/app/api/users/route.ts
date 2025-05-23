import { connectDB } from "../../../backend/mongodb/MongoDbProvider";
import { User } from "../../../backend/mongodb/models/Users";
import { NextResponse } from "next/server";
export const revalidate = 60;
export async function GET() {
  try {
    // console.log(request);
  
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to create post${e}` },
      { status: 500 }
    );
  }
}
export async function POST() {
  try {
    await connectDB(); //
    const user = await User.create({
      name: "test",
      email: `email@${Math.random()}`,
      password: "111222333",
    });
    return NextResponse.json(JSON.stringify(user), { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to create post${e}` },
      { status: 500 }
    );
  }
}
