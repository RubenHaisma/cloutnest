import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const positions = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for a senior full-stack developer to help build and scale our platform.",
  },
  {
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our marketing team to help shape and promote our product offerings.",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Support",
    location: "Remote",
    type: "Full-time",
    description: "Help our customers succeed by providing exceptional support and guidance.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create beautiful and intuitive user experiences for our platform.",
  },
];

export default function CareersPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground">
            Help us revolutionize influencer marketing
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Why CloutNest?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Work on cutting-edge technology and help shape the future of 
                influencer marketing.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Growth</h3>
              <p className="text-muted-foreground">
                Continuous learning opportunities and clear career progression 
                paths for all team members.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Benefits</h3>
              <p className="text-muted-foreground">
                Competitive salary, equity, health insurance, unlimited PTO, 
                and remote-first culture.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <div className="space-y-6">
            {positions.map((position) => (
              <Card key={position.title}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{position.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {position.department} · {position.location} · {position.type}
                      </p>
                    </div>
                    <Button>Apply Now</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{position.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Don't see the right role?</h2>
          <p className="text-muted-foreground mb-8">
            We're always looking for talented people to join our team. Send us your resume!
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}