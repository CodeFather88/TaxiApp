import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { UserRole } from "src/modules/users/domain/types/user.types";


export const users = pgTable("users", {

    id: serial("id").primaryKey(),

    phoneNumber: text("phone-number").notNull().unique(),

    password: text("password").notNull(),

    name: text("name").notNull(),

    role: text("role").$type<UserRole>().notNull().default(UserRole.driver),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    
})