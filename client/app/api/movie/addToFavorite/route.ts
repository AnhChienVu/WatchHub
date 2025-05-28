import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/dbConfig"; // your Drizzle db instance
import { Favorites, Users } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { slug, email } = await req.json();

  // Check userID
  const user = await db
    .select({ userId: Users.id })
    .from(Users)
    .where(eq(Users.email, email));

  // Check if movie exists in favorites list
  const existing = await db
    .select()
    .from(Favorites)
    .where(eq(Favorites.movieSlug, slug));
  if (existing.length > 0) {
    return NextResponse.json(
      { error: "Movie already added in favorite lists" },
      { status: 409 }
    );
  }

  // Insert new movie into favorites list
  const result = await db.insert(Favorites).values({
    movieSlug: slug,
    userEmail: email,
    createdAt: new Date().toISOString(),
    userId: user[0]?.userId,
  });

  if (!result) {
    return NextResponse.json(
      { error: "Failed to add a movie to favorite list" },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true });
}
