import { config } from "dotenv"
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { customers } from "./schema/customers"

config({ path: ".env.local" })

// Check if we're in development mode
const isDev = process.env.NODE_ENV !== 'production'

// Mock database for development
const mockDb = {
  query: {
    customers: {
      findFirst: async () => {
        // Return a mock customer object
        return {
          id: "mock-id",
          userId: "mock-user-id",
          membership: "free",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      findMany: async () => {
        // Return an empty array
        return []
      }
    }
  },
  insert: () => ({ 
    values: () => ({ 
      returning: async () => [
        {
          id: "mock-id",
          userId: "mock-user-id",
          membership: "free",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] 
    }) 
  }),
  update: () => ({ 
    set: () => ({ 
      where: () => ({ 
        returning: async () => [
          {
            id: "mock-id",
            userId: "mock-user-id",
            membership: "free",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ] 
      }) 
    }) 
  })
}

// Try to connect to the database, but use mock in development if it fails
let db: any

// In development, we can use a mock database if connection fails
if (isDev) {
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    console.warn("DATABASE_URL is not set, using mock database")
    db = mockDb
  } else {
    try {
      const client = postgres(databaseUrl, { prepare: false })
      db = drizzlePostgres(client, { 
        schema: {
          customers
        } 
      })
      console.log("Connected to database successfully")
    } catch (error) {
      console.warn("Failed to connect to database, using mock database")
      db = mockDb
    }
  }
} else {
  // In production, we require a database connection
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set")
  }
  
  const client = postgres(databaseUrl, { prepare: false })
  db = drizzlePostgres(client, { 
    schema: {
      customers
    }
  })
}

export { db }
