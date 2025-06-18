"use server"

import { db } from "@/db"
import { customers, type SelectCustomer } from "@/db/schema/customers"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function getCustomerByUserId(
  userId: string
): Promise<SelectCustomer | null> {
  try {
    const customer = await db.query.customers.findFirst({
      where: eq(customers.userId, userId)
    })
    return customer || null
  } catch (error) {
    // Silently handle error and return null
    return null
  }
}

export async function getUserDataByUserId(userId: string): Promise<{
  customer: SelectCustomer | null
  clerkEmail: string | null
}> {
  try {
    // Get Clerk user data
    const user = await currentUser()

    // Get customer profile
    const customer = await db.query.customers.findFirst({
      where: eq(customers.userId, userId)
    })

    return {
      customer: customer || null,
      clerkEmail: user?.emailAddresses[0]?.emailAddress || null
    }
  } catch (error) {
    // Silently handle error and return default values
    return {
      customer: null,
      clerkEmail: null
    }
  }
}

export async function createCustomer(
  userId: string
): Promise<{ isSuccess: boolean; data?: SelectCustomer }> {
  try {
    const [newCustomer] = await db
      .insert(customers)
      .values({
        userId,
        membership: "free"
      })
      .returning()

    if (!newCustomer) {
      return { isSuccess: false }
    }

    return { isSuccess: true, data: newCustomer }
  } catch (error) {
    console.error("Error creating customer:", error)
    return { isSuccess: false }
  }
}

export async function updateCustomerByUserId(
  userId: string,
  updates: Partial<SelectCustomer>
): Promise<{ isSuccess: boolean; data?: SelectCustomer }> {
  try {
    const [updatedCustomer] = await db
      .update(customers)
      .set(updates)
      .where(eq(customers.userId, userId))
      .returning()

    if (!updatedCustomer) {
      return { isSuccess: false }
    }

    return { isSuccess: true, data: updatedCustomer }
  } catch (error) {
    console.error("Error updating customer by userId:", error)
    return { isSuccess: false }
  }
}


