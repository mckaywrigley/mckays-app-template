import { type InsertCustomer } from "../../schema/customers"

// get this from your 1st user in clerk (dev mode)
export const userId = "user_2y8Cx5ekKHYstsIdBVAj2ZYB6EV"

export const customersData: InsertCustomer[] = [
  {
    userId,
    membership: "pro", // default to pro for testing,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
