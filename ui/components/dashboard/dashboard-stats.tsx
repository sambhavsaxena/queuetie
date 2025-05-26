"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { BarChart3, Mail, AlertCircle, Check } from "lucide-react";

type Data = {
  used_quota: number;
  max_quota: number;
  total_keys: number;
};

interface HeaderProps {
  token: string;
}

export function DashboardStats({ token }: HeaderProps) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/analytics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const placeholderStats = [
    { icon: Mail },
    { icon: Check },
    { icon: BarChart3 },
    { icon: AlertCircle },
  ];

  if (loading) {
    return (
      <>
        {placeholderStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-border/60 bg-card/30 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-1" />
                <Skeleton className="h-3 w-36" />
              </CardContent>
            </Card>
          );
        })}
      </>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-red-500">
          Create an API key to see your statistics here.
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Emails Enqueued",
      value: `${data.used_quota}`,
      description: `${((data.used_quota / data.max_quota) * 100).toFixed(
        2
      )}% of your quota used`,
      trend: (data.used_quota / data.max_quota) * 100 > 80 ? "down" : "up",
      icon: Mail,
    },
    {
      title: "API Keys created",
      value: `${data.total_keys}`,
      description: `You have created ${data.total_keys} API key${
        data.total_keys > 1 ? "s" : ""
      }`,
      trend: data.total_keys > 5 ? "down" : "up",
      icon: Check,
    },
    {
      title: "API Limit",
      value: `${data.max_quota}`,
      description: `${(
        ((data.max_quota - data.used_quota) / data.max_quota) *
        100
      ).toFixed(2)}% of your quota remaining`,
      trend: (data.used_quota / data.max_quota) * 100 > 80 ? "down" : "up",
      icon: BarChart3,
    },
    {
      title: "Success Rate",
      value: `${data.used_quota ? 100 : 0}%`,
      description: `Success rate is ${data.used_quota ? 100 : 0}%`,
      trend: "up",
      icon: AlertCircle,
    },
  ];

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
