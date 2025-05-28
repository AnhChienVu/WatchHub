import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/dbConfig"; // your Drizzle db instance
import { Favorites, Users } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("userEmail");

  if (!userEmail) {
    return NextResponse.json(
      { error: "Missing userEmail parameter" },
      { status: 400 }
    );
  }

  // Check userID
  const user = await db
    .select({ userId: Users.id })
    .from(Users)
    .where(eq(Users.email, userEmail));

  // Get favorite movie list
  const result = await db
    .select()
    .from(Favorites)
    .where(eq(Favorites.userId, user[0]?.userId));

  if (!result) {
    return NextResponse.json(
      { error: "Failed to fetch favorite list" },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, favoriteList: result });
}
