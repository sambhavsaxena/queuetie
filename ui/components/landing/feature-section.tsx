import { 
  Code, 
  BarChart3,
  Fingerprint, 
  Layers, 
  Zap,
  CheckCircle2
} from 'lucide-react'

export function FeatureSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-[58rem] text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Everything you need to power your email communications
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Our API provides all the features you need to integrate email functionality into your applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
        
        <div className="mt-16 rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="font-bold text-xl md:text-2xl mb-4">API Example</h3>
            <p className="text-muted-foreground mb-6">
              Enqueue your emails with just hitting an API.
            </p>
            <div className="rounded-lg bg-background/70 p-4">
              <pre className="text-xs md:text-sm overflow-x-auto whitespace-pre-wrap"><code>{`fetch('https://api.queuetie.com/v1/email/enqueue', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'recipient@example.com',
    subject: 'Hello from Queuetie API',
    body: 'This is a test email sent using the Queuetie API!',
    attachments: [],
    key: 'your_api_token_here'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                </code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Simple API",
    description: "Intuitive RESTful API that's easy to integrate with any language or framework"
  },
  {
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Secure Tokens",
    description: "Generate and manage API tokens with fine-grained permissions and expiration"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Detailed Analytics",
    description: "Track delivery rates, opens, clicks, and more with our comprehensive dashboard"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast Delivery",
    description: "Optimized message queueing and delivery system for minimal latency"
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Attachments Support",
    description: "Send emails with multiple file attachments in various formats"
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Reliable Delivery",
    description: "Automatic retries and fallbacks to ensure your emails reach their destination"
  }
]

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm transition-all hover:bg-card/50">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {feature.icon}
      </div>
      <h3 className="mb-2 font-semibold">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">{feature.description}</p>
    </div>
  )
}