export function FeatureShowcase() {
  const features = [
    {
      title: "Smart Matching",
      description: "AI-powered algorithm connects brands with the perfect creators",
      icon: "🎯",
    },
    {
      title: "Real-time Analytics",
      description: "Track campaign performance and ROI with detailed insights",
      icon: "📊",
    },
    {
      title: "Secure Payments",
      description: "Automated payments and escrow protection for both parties",
      icon: "💳",
    },
    {
      title: "Campaign Management",
      description: "Easy-to-use tools for creating and managing campaigns",
      icon: "📱",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Powerful Features</h2>
        <p className="text-muted-foreground mt-2">
          Everything you need to succeed in influencer marketing
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}