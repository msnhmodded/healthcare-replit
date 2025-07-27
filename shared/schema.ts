import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const workshops = pgTable("workshops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: jsonb("title").notNull(), // {en: string, so: string}
  description: jsonb("description").notNull(),
  category: text("category").notNull(), // 'chronic-disease', 'mental-health', 'navigation'
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: text("location").notNull(),
  maxAttendees: integer("max_attendees").notNull().default(30),
  currentAttendees: integer("current_attendees").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  facilitator: text("facilitator"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const workshopRegistrations = pgTable("workshop_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workshopId: varchar("workshop_id").notNull().references(() => workshops.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredLanguage: text("preferred_language").notNull(), // 'en', 'so', 'both'
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: jsonb("title").notNull(),
  description: jsonb("description").notNull(),
  category: text("category").notNull(), // 'health-guides', 'nutrition', 'videos', 'tools', 'directory', 'forms'
  type: text("type").notNull(), // 'pdf', 'video', 'link', 'tool'
  url: text("url"),
  downloadUrl: text("download_url"),
  thumbnailUrl: text("thumbnail_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredLanguage: text("preferred_language").notNull(),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  subscribeNewsletter: boolean("subscribe_newsletter").notNull().default(false),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: jsonb("description").notNull(),
  type: text("type").notNull(), // 'primary', 'supporting'
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  services: jsonb("services"), // array of strings
  isActive: boolean("is_active").notNull().default(true),
});

export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: jsonb("role").notNull(),
  description: jsonb("description").notNull(),
  photoUrl: text("photo_url"),
  email: text("email"),
  linkedinUrl: text("linkedin_url"),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

// Insert schemas
export const insertWorkshopSchema = createInsertSchema(workshops).omit({
  id: true,
  currentAttendees: true,
  createdAt: true,
});

export const insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).omit({
  id: true,
  createdAt: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Workshop = typeof workshops.$inferSelect;
export type InsertWorkshop = z.infer<typeof insertWorkshopSchema>;
export type WorkshopRegistration = typeof workshopRegistrations.$inferSelect;
export type InsertWorkshopRegistration = z.infer<typeof insertWorkshopRegistrationSchema>;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Partner = typeof partners.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
