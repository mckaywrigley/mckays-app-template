"use server"

import {
  createProfile,
  getProfileByUserId
} from "@/db/queries/profiles-queries"
import { InsertProfile, SelectProfile } from "@/db/schema/profiles-schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createProfileAction(
  data: InsertProfile
): Promise<ActionState<SelectProfile>> {
  try {
    const newProfile = await createProfile(data)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Profile created successfully",
      data: newProfile
    }
  } catch (error) {
    console.error("Error creating profile", error)
    return { isSuccess: false, message: "Failed to create profile" }
  }
}

export async function getProfileByUserIdAction(
  userId: string
): Promise<ActionState<SelectProfile>> {
  try {
    const profile = await getProfileByUserId(userId)
    return {
      isSuccess: true,
      message: "Profile retrieved successfully",
      data: profile
    }
  } catch (error) {
    console.error("Error getting profile by user id", error)
    return { isSuccess: false, message: "Failed to get profile" }
  }
}
