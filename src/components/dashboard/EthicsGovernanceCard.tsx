'use client';

import { ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GovernanceStatus {
  label: string;
  status: string;
  ok: boolean;
}

interface EthicsGovernanceCardProps {
  items: GovernanceStatus[];
}

export function EthicsGovernanceCard({ items }: EthicsGovernanceCardProps) {
  return (
    <Card className="col-span-3 glass border-indigo-500/20 rounded-2xl h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldCheck className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          Ethics & Governance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5 flex-1 p-5 pt-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
            <span className="text-muted-foreground text-xs">{item.label}</span>
            <span
              className={item.ok ? 'badge-success text-[10px]' : 'badge-danger text-[10px]'}
              title={item.ok ? 'Status OK' : 'Status Warning/Error'}
            >
              <span aria-hidden="true" className="mr-1">{item.ok ? '✓' : '✗'}</span>
              {item.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
