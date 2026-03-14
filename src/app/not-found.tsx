import Link from 'next/link';
import { Home, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-primary">
        <SearchX className="w-10 h-10 text-primary" />
      </div>
      <div className="space-y-2">
        <p className="text-7xl font-black text-gradient-primary">404</p>
        <h2 className="text-2xl font-bold">Page not found</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist in the CARE Agent system.
        </p>
      </div>
      <Link href="/dashboard">
        <Button className="gap-2">
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
