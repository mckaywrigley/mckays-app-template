# Auth Setup Instructions

Use this guide to setup the auth for this project.

It uses Clerk for authentication.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the auth setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [Clerk](https://clerk.com/)
- [Clerk Docs](https://clerk.com/docs)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i @clerk/nextjs @clerk/themes @clerk/backend
```

## Setup Steps

- Create a `middleware.ts` file in the root of the project with the following code:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/todo(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = auth();

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: "/login" });
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && isProtectedRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
```

- Wrap `<ClerkProvider>` around the entire `html` tag in the `app/layout.tsx` file with the following code and make it async with a profile creation check:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (userId) {
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      await createProfile({ userId });
    }
  }

  return <ClerkProvider>{/* ...add existing code here... */}</ClerkProvider>;
}
```

- Create a `components/header.tsx` file with the following code:

```tsx
"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

- Update the `app/page.tsx` file to include the `Header` component with the existing code:

```tsx
import Header from "@/components/header";

export default function HomePage() {
  return (
    <>
      <Header />
      {/* ...add existing code here... */}
    </>
  );
}
```

- Create a `app/(auth)/layout.tsx` file with the following code:

```tsx
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="flex h-screen items-center justify-center">{children}</div>;
}
```

- Create a `app/(auth)/login/[[...login]]/page.tsx` file with the following code:

```tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const { theme } = useTheme();

  return <SignIn appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />;
}
```

- Create a `app/(auth)/signup/[[...signup]]/page.tsx` file with the following code:

```tsx
"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();

  return <SignUp appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />;
}
```

- The auth system is now setup.
