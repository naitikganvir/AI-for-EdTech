export default function Features() {
  const features = [
    {
      title: 'AI Tutoring',
      description: 'Get personalized tutoring with Google Gemini AI assistance',
      icon: '🤖'
    },
    {
      title: 'Content Generation',
      description: 'Generate educational content and summaries instantly',
      icon: '📝'
    },
    {
      title: 'Interactive Chat',
      description: 'Chat with AI for real-time learning support',
      icon: '💬'
    },
    {
      title: 'Progress Tracking',
      description: 'Track your learning progress and achievements',
      icon: '📊'
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
