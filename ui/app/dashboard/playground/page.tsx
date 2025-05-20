import { PlaygroundForm } from '@/components/dashboard/playground/playground-form'

export default function PlaygroundPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Playground</h1>
        <p className="text-muted-foreground">
          Test your API tokens by sending emails directly from this interface
        </p>
      </div>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm">
        <PlaygroundForm />
      </div>
    </div>
  )
}