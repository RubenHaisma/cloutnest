export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            About CloutNest
          </h1>
          <p className="text-xl text-muted-foreground">
            Connecting brands with authentic content creators
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At CloutNest, we're revolutionizing how brands and content creators collaborate. 
              Our platform makes it easy for small to medium-sized businesses to find and work 
              with authentic content creators who can tell their brand's story in a genuine way.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-4xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Creators</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">5K+</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Campaigns</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-muted-foreground">
                We believe in genuine connections between brands and creators, 
                fostering authentic storytelling that resonates with audiences.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Our platform leverages cutting-edge technology to make influencer 
                marketing accessible, efficient, and measurable.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We maintain clear communication, fair pricing, and honest metrics 
                to build trust between all parties.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Marketing",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
              },
              {
                name: "David Kim",
                role: "Head of Product",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div
                  className="w-32 h-32 mx-auto rounded-full bg-cover bg-center mb-4"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}