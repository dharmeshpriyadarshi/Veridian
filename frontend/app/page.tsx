import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/home/hero'
import { Features } from '@/components/home/features'
import { HowItWorks } from '@/components/home/how-it-works'
import { Stats } from '@/components/home/stats'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="text-2xl font-bold text-veridian-600">🌱 Veridian</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6">
              <Link
                href="/insights"
                className="text-sm font-medium transition-colors hover:text-veridian-600"
              >
                Insights
              </Link>
              <Link
                href="/simulation"
                className="text-sm font-medium transition-colors hover:text-veridian-600"
              >
                Simulation
              </Link>
              <Link
                href="/research"
                className="text-sm font-medium transition-colors hover:text-veridian-600"
              >
                Research
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="gradient-veridian">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{' '}
            <a
              href="https://github.com/dharmeshpriyadarshi"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Dharmesh Priyadarshi
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/dharmeshpriyadarshi/veridian"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
