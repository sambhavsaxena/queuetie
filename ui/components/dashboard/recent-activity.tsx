"use client";

import { cn } from "@/lib/utils";
import { Mail, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

type Activity = {
  id: string;
  type: string;
  status: "success" | "failed";
  createdAt: string;
  info: string;
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activity");
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        console.log("Fetched activities:", data);
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
          {activities.map((activity) => (
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
                {activity.type.includes("email") ? (
                  <Mail className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {activity.type === "login" && "Requested Login"}
                    {activity.type === "logout" && "Logged out"}
                    {activity.type === "verify" && "Login approved"}
                    {activity.type === "key_delete" && "Token deleted"}
                    {activity.type === "key_create" && "Token created"}
                    {activity.type === "enqueue" && "Email sent"}
                  </p>
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
          ))}
        </ul>
      )}
    </div>
  );
}
