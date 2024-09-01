"use server";

import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { InsertProfile, profiles, SelectProfile } from "../schema/profile-schema";

export const createProfile = async (data: InsertProfile) => {
  try {
    const [newProfile] = await db.insert(profiles).values(data).returning();
    return newProfile;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw new Error("Failed to create profile");
  }
};

export const getProfileByUserId = async (userId: string) => {
  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId)
    });

    return profile;
  } catch (error) {
    console.error("Error getting profile by user ID:", error);
    throw new Error("Failed to get profile");
  }
};

export const getAllProfiles = async (): Promise<SelectProfile[]> => {
  return db.query.profiles.findMany();
};

export const updateProfile = async (userId: string, data: Partial<InsertProfile>) => {
  try {
    const [updatedProfile] = await db.update(profiles).set(data).where(eq(profiles.userId, userId)).returning();
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
};

export const updateProfileByStripeCustomerId = async (stripeCustomerId: string, data: Partial<InsertProfile>) => {
  try {
    const [updatedProfile] = await db.update(profiles).set(data).where(eq(profiles.stripeCustomerId, stripeCustomerId)).returning();
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile by stripe customer ID:", error);
    throw new Error("Failed to update profile");
  }
};

export const deleteProfile = async (userId: string) => {
  try {
    await db.delete(profiles).where(eq(profiles.userId, userId));
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw new Error("Failed to delete profile");
  }
};
