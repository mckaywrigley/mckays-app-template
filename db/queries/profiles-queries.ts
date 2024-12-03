"use server"

import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import {
  InsertProfile,
  profilesTable,
  SelectProfile
} from "../schema/profiles-schema"

export const createProfile = async (data: InsertProfile) => {
  try {
    const [newProfile] = await db.insert(profilesTable).values(data).returning()
    return newProfile
  } catch (error) {
    console.error("Error creating profile:", error)
    throw new Error("Failed to create profile")
  }
}

export const getProfileByUserId = async (userId: string) => {
  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profilesTable.userId, userId)
    })

    return profile
  } catch (error) {
    console.error("Error getting profile by user ID:", error)
    throw new Error("Failed to get profile")
  }
}

export const getAllProfiles = async (): Promise<SelectProfile[]> => {
  return db.query.profiles.findMany()
}

export const updateProfile = async (
  userId: string,
  data: Partial<InsertProfile>
) => {
  try {
    const [updatedProfile] = await db
      .update(profilesTable)
      .set(data)
      .where(eq(profilesTable.userId, userId))
      .returning()
    return updatedProfile
  } catch (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }
}

export const updateProfileByStripeCustomerId = async (
  stripeCustomerId: string,
  data: Partial<InsertProfile>
) => {
  try {
    const [updatedProfile] = await db
      .update(profilesTable)
      .set(data)
      .where(eq(profilesTable.stripeCustomerId, stripeCustomerId))
      .returning()
    return updatedProfile
  } catch (error) {
    console.error("Error updating profile by stripe customer ID:", error)
    throw new Error("Failed to update profile")
  }
}

export const deleteProfile = async (userId: string) => {
  try {
    await db.delete(profilesTable).where(eq(profilesTable.userId, userId))
  } catch (error) {
    console.error("Error deleting profile:", error)
    throw new Error("Failed to delete profile")
  }
}
