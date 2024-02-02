import {
  boolean,
  date,
  integer,
  pgTable,
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
  status: varchar("status").notNull(),
  userId: varchar("userId"),
});

type Challenge = typeof challenge.$inferSelect;
export const challengeRelations = relations(challenge, ({ many, one }) => ({
  props: many(prop),
  user: one(users, {
    fields: [challenge.userId],
    references: [users.id],
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
