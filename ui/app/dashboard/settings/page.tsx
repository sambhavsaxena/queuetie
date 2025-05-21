export default function Settings() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
            Manage your account settings and preferences
        </p>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm">
        Nothing to configure yet.
      </div>
    </div>
  );
}
