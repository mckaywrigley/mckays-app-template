"use client"

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Lightbulb, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Lightbulb className="size-6" />
          <h1 className="text-xl font-bold">Todo App</h1>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 space-x-4 md:flex">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <SignedIn>
            <Link href="/todo" className="hover:underline">
              Todo
            </Link>
          </SignedIn>
        </nav>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="bg-primary-foreground text-primary p-4 md:hidden">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="block hover:underline"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <SignedIn>
              <li>
                <Link
                  href="/todo"
                  className="block hover:underline"
                  onClick={toggleMenu}
                >
                  Todo
                </Link>
              </li>
            </SignedIn>
          </ul>
        </nav>
      )}
    </header>
  )
}
