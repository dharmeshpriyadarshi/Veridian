const stats = [
  {
    value: '100K+',
    label: 'Data Points Analyzed',
    description: 'Historical pollution data from NASA',
  },
  {
    value: '365',
    label: 'Days Predicted',
    description: 'Full year 2026 forecasting',
  },
  {
    value: '10x',
    label: 'More Oxygen',
    description: 'Bio-urban trees vs regular trees',
  },
  {
    value: '95%',
    label: 'Accuracy',
    description: 'ML model prediction accuracy',
  },
]

export function Stats() {
  return (
    <section className="container py-20">
      <div className="rounded-2xl bg-gradient-to-br from-veridian-600 to-veridian-800 p-12 text-white shadow-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Powered by Data & Science
          </h2>
          <p className="text-veridian-100 text-lg max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with environmental science
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <div className="text-veridian-200 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
