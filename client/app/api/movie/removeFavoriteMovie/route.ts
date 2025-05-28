import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/dbConfig"; // your Drizzle db instance
import { Favorites, Users } from "@/utils/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
  const { slug, email } = await req.json();

  if (!email || !slug) {
    return NextResponse.json(
      { error: "Missing userEmail or slug parameter" },
      { status: 400 }
    );
  }

  // Check userID
  const user = await db
    .select({ userId: Users.id })
    .from(Users)
    .where(eq(Users.email, email));

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
  } else {
    const isFavorite = result.some((item) => item.movieSlug === slug);
    if (isFavorite) {
      await db
        .delete(Favorites)
        .where(
          and(
            eq(Favorites.userId, user[0]?.userId),
            eq(Favorites.movieSlug, slug)
          )
        )
        .returning();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }
}
