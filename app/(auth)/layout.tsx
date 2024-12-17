/*
<ai_context>
This server layout provides a centered layout for (auth) pages.
</ai_context>
*/

"use server"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  )
}
