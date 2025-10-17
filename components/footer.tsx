import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold">PeakstudyAI</h3>
        </div>

        <div className="flex gap-6">
          <Link
            href="/privacy-policy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}