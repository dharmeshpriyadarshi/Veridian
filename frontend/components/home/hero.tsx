import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf } from 'lucide-react'

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-4 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
        <div className="inline-flex items-center rounded-lg bg-veridian-100 px-3 py-1 text-sm font-medium text-veridian-800 mb-4">
          🌍 Powered by Machine Learning & Real-time Data
        </div>
        
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
          Breathe Better with{' '}
          <span className="bg-gradient-to-r from-veridian-600 to-veridian-400 bg-clip-text text-transparent">
            Veridian
          </span>
        </h1>
        
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl mt-4">
          Advanced pollution analysis, ML-powered predictions, and bio-urban tree simulation
          to create a cleaner, healthier environment for 2026 and beyond.
        </p>

        <div className="flex gap-4 mt-8">
          <Link href="/signup">
            <Button size="lg" className="gradient-veridian">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/simulation">
            <Button size="lg" variant="outline">
              <Leaf className="mr-2 h-4 w-4" />
              Try Simulation
            </Button>
          </Link>
        </div>

        <div className="mt-12 w-full max-w-5xl">
          <div className="relative rounded-xl border bg-gradient-to-br from-veridian-50 to-blue-50 p-8 shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-veridian-600 px-4 py-2 text-sm font-semibold text-white">
              Live Preview
            </div>
            <div className="aspect-video w-full rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-muted-foreground">Interactive Map Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
