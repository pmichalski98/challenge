import {
  boolean,
  integer,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { randomUUID } from "node:crypto";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  challenges: many(challenge),
}));
export const challenge = pgTable("challenge", {
  id: uuid("id").primaryKey().defaultRandom(),
  duration: integer("duration").notNull(),
  status: varchar("status").notNull(),
  userId: serial("userId"),
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
  challengeId: serial("challengeId"),
});

type Prop = typeof prop.$inferSelect;
export const propRelations = relations(prop, ({ one }) => ({
  challenge: one(challenge, {
    fields: [prop.challengeId],
    references: [challenge.id],
  }),
}));
