import { Activity, TrendingUp, TreePine, FlaskConical } from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Track pollution levels in your area with live, accurate data from multiple sources.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'ML-Powered Predictions',
    description: 'Forecast pollution levels for 2026 using advanced machine learning models trained on NASA data.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: TreePine,
    title: 'Bio-Urban Tree Simulation',
    description: 'Calculate and visualize the number of bio-urban trees needed to minimize pollution in your area.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: FlaskConical,
    title: 'Research Portal',
    description: 'Exclusive access for researchers with advanced analytics and pollution pattern insights.',
    gradient: 'from-orange-500 to-red-500',
  },
]

export function Features() {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Powerful Features for a Cleaner Future
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to understand, predict, and combat air pollution
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
          >
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
            
            {/* Animated border on hover */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-veridian-400 to-veridian-600 opacity-0 blur transition-opacity group-hover:opacity-20" />
          </div>
        ))}
      </div>
    </section>
  )
}
