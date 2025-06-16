"use server"

import process from "process"
import { db } from "../index"
import { customers } from "../schema/customers"
import { customersData } from "./data/customers"

async function seed() {
  console.warn("Seeding database...")

  // Reset all tables in reverse order of dependencies
  console.warn("Resetting tables...")
  await db.execute("TRUNCATE TABLE customers CASCADE")
  console.warn("Finished resetting tables")

  // Seed customers
  console.warn("Seeding customers...")
  await db.insert(customers).values(customersData)

  console.warn("Seeding complete!")
  db.$client.end()
}

seed().catch(error => {
  console.error("Error seeding database:", error)
  process.exit(1)
})
