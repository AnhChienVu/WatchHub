import {
  pgTable,
  serial,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  password: varchar("password"),
  createdAt: varchar("created_at").notNull(),
  googleUser: boolean("google_user").notNull().default(false),
});

export const Favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  movieSlug: varchar("movie_slug").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.id),
  userEmail: varchar("user_email").notNull(),
  createdAt: varchar("created_at").notNull(),
});
