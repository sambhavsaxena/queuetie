"use client";

import { cn } from "@/lib/utils";
import {
  Mail,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  LogIn,
  LogOut,
  ShieldCheck,
  Key,
  KeyRound,
  Send,
  Rocket
} from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

type Activity = {
  id: string;
  type: string;
  status: "success" | "failed";
  createdAt: string;
  info: string;
};

const activityMap: Record<
  string,
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  login: { label: "Requested Login", Icon: LogIn },
  logout: { label: "Logged out", Icon: LogOut },
  verify: { label: "Login approved", Icon: ShieldCheck },
  key_delete: { label: "Token deleted", Icon: KeyRound },
  key_create: { label: "Token created", Icon: Key },
  enqueue: { label: "Email enqueued", Icon: Send },
  subscribe: { label: "Subscription activated", Icon: Rocket },
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activity", {
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(Array.isArray(data.activities) ? data.activities : []);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center mt-10">
          <RefreshCw className="h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-medium">No recent activity</h3>
          <p className="text-sm text-muted-foreground">
            Activity will appear here as you use the API
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => {
            const mapping = activityMap[activity.type];
            const ActivityIcon = mapping?.Icon ?? RefreshCw;
            const label = mapping?.label ?? activity.type;

            return (
              <li
                key={activity.id}
                className="flex items-center gap-3 rounded-md border border-border/40 bg-background/40 p-3"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    activity.status === "success"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  )}
                >
                  <ActivityIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{label}</p>
                    <span
                      className="text-xs text-muted-foreground"
                      title={activity.createdAt}
                    >
                      {format(activity.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.info}</p>
                </div>
                <div>
                  {activity.status === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
