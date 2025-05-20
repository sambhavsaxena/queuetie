import { NewTokenForm } from '@/components/dashboard/tokens/new-token-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewTokenPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/tokens">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create API Token</h1>
        </div>
        <p className="text-muted-foreground">
          Generate a new API token to authenticate your requests
        </p>
      </div>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm">
        <NewTokenForm />
      </div>
    </div>
  )
}