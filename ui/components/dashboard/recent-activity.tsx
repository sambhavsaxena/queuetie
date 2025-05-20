"use client"

import { cn } from '@/lib/utils'
import { Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

// Demo data
const activities = [
  {
    id: 1,
    type: "email_sent",
    recipient: "customer@example.com",
    time: "Just now",
    status: "success",
  },
  {
    id: 2,
    type: "token_created",
    name: "Production API",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 3,
    type: "email_sent",
    recipient: "support@example.com",
    time: "5 hours ago",
    status: "success",
  },
  {
    id: 4,
    type: "email_failed",
    recipient: "invalid@example",
    time: "1 day ago",
    status: "error",
  },
  {
    id: 5,
    type: "email_sent",
    recipient: "team@example.com",
    time: "1 day ago",
    status: "success",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <RefreshCw className="h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-medium">No recent activity</h3>
          <p className="text-sm text-muted-foreground">
            Activity will appear here as you use the API
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li 
              key={activity.id}
              className="flex items-center gap-3 rounded-md border border-border/40 bg-background/40 p-3"
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                activity.status === "success" 
                  ? "bg-green-500/10 text-green-500" 
                  : "bg-red-500/10 text-red-500"
              )}>
                {activity.type.includes('email') ? (
                  <Mail className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {activity.type === "email_sent" && "Email sent"}
                    {activity.type === "email_failed" && "Email failed"}
                    {activity.type === "token_created" && "Token created"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {activity.type.includes('email') 
                    ? `To: ${activity.recipient}` 
                    : `Name: ${activity.name}`}
                </p>
              </div>
              
              <div>
                {activity.status === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}