"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Mail, AlertCircle, Check } from "lucide-react";

const stats = [
  {
    title: "Total Emails",
    value: "24,328",
    icon: Mail,
    description: "+12% from last month",
    trend: "up",
  },
  {
    title: "Success Rate",
    value: "98.7%",
    icon: Check,
    description: "+0.5% from last month",
    trend: "up",
  },
  {
    title: "Bounce Rate",
    value: "1.3%",
    icon: AlertCircle,
    description: "-0.3% from last month",
    trend: "down",
  },
  {
    title: "API Usage",
    value: "87.2%",
    icon: BarChart3,
    description: "+5% from last month",
    trend: "up",
  },
];

export function DashboardStats() {
  if (stats.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">No stats available.</p>
      </div>
    );
  }
  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="border-border/60 bg-card/30 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
