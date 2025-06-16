"use client"

import { UserProfile, useUser } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export default function ProfilePage() {
  const { theme } = useTheme()
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Clerk UserProfile Component */}
      <UserProfile
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined
        }}
      />
    </div>
  )
}
