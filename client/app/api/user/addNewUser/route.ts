import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/dbConfig"; // your Drizzle db instance
import { Users } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { email, password, name, googleUser = false } = await req.json();

  // Check if user exists
  const existing = await db.select().from(Users).where(eq(Users.email, email));
  if (existing.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  // Insert new user
  const values: any = {
    email,
    name,
    createdAt: new Date().toISOString(),
    googleUser,
  };
  if (!googleUser) {
    values.password = password; // Only set password if not a Google user
  }
  const result = await db.insert(Users).values(values);
  if (!result) {
    return NextResponse.json(
      { error: "Failed to create new user" },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true });
}
