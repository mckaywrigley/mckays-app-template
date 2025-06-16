export default function MarketingPagesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </main>
  )
}
