import { MapPin, Brain, TreePine, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    icon: MapPin,
    title: 'Enter Your Location',
    description: 'Search for your area or let us detect your current location automatically.',
    number: '01',
  },
  {
    icon: Brain,
    title: 'Get AI Predictions',
    description: 'Our ML model predicts pollution levels for the upcoming year based on historical data.',
    number: '02',
  },
  {
    icon: TreePine,
    title: 'Simulate Solutions',
    description: 'Calculate how many bio-urban trees you need to plant to reduce pollution effectively.',
    number: '03',
  },
  {
    icon: CheckCircle2,
    title: 'Visualize Impact',
    description: 'See the projected improvements on an interactive map and track your progress.',
    number: '04',
  },
]

export function HowItWorks() {
  return (
    <section className="container py-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          How Veridian Works
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Four simple steps to understand and improve your environment
        </p>
      </div>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-veridian-200 via-veridian-400 to-veridian-600 lg:block" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-8 lg:flex-row ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block rounded-lg bg-veridian-100 px-3 py-1 text-sm font-semibold text-veridian-800 mb-4">
                  Step {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>

              {/* Icon */}
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-veridian-400 to-veridian-600 shadow-lg">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                {/* Pulse animation */}
                <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-veridian-300 opacity-30" />
              </div>

              {/* Spacer for alignment */}
              <div className="flex-1 hidden lg:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
