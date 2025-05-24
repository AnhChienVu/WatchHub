import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  movieSlug: varchar("movie_slug").notNull(),
  userId: varchar("user_id").notNull(),
  userEmail: varchar("user_email").notNull(),
  createdAt: varchar("created_at").notNull(),
});

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  createdAt: varchar("created_at").notNull(),
});
