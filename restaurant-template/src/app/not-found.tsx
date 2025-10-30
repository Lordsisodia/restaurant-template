export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-center text-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">The page you are looking for doesn’t exist.</p>
      </div>
    </div>
  );
}
