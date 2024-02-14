import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  challenges: many(challenge),
}));
export const challenge = pgTable("challenge", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: date("createdAt", { mode: "date" }).defaultNow(),
  duration: integer("duration").notNull(),
  userId: varchar("userId"),
});

export type Challenge = typeof challenge.$inferSelect;
export const challengeRelations = relations(challenge, ({ many, one }) => ({
  props: many(prop),
  days: many(day),
  user: one(users, {
    fields: [challenge.userId],
    references: [users.id],
  }),
}));

export const day = pgTable("day", {
  id: serial("id").notNull().primaryKey(),
  date: date("date", { mode: "date" }),
  status: varchar("status").notNull(),
  challengeId: varchar("challengeId"),
});
export const dayRelations = relations(day, ({ many, one }) => ({
  challenge: one(challenge, {
    fields: [day.challengeId],
    references: [challenge.id],
  }),
}));

export const prop = pgTable("prop", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  check: boolean("check").default(false),
  challengeId: uuid("challengeId"),
});

type Prop = typeof prop.$inferSelect;
export const propRelations = relations(prop, ({ one }) => ({
  challenge: one(challenge, {
    fields: [prop.challengeId],
    references: [challenge.id],
  }),
}));
