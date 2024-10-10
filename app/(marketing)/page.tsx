"use server"

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <SignedIn>
        <div>Welcome to Todo App</div>
        <Link href="/todo">
          <Button>Start Searching &rarr;</Button>
        </Link>
      </SignedIn>

      <SignedOut>
        <div>Please login to access the search page</div>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </SignedOut>
    </main>
  )
}
