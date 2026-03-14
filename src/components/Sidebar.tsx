'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, UploadCloud, Users, ShieldAlert,
  Settings, Network, ChevronRight, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_GROUPS = [
  {
    label: 'Main',
    links: [
      { name: 'Dashboard',        href: '/dashboard',     icon: LayoutDashboard, badge: null },
      { name: 'Upload Transcript', href: '/upload',        icon: UploadCloud,     badge: 'NEW' },
      { name: 'Consultations',    href: '/consultations',  icon: Users,           badge: '8' },
    ],
  },
  {
    label: 'System',
    links: [
      { name: 'Architecture',     href: '/architecture',  icon: Network,     badge: null },
      { name: 'Admin',            href: '/admin',         icon: ShieldAlert, badge: null },
      { name: 'Settings',         href: '/settings',      icon: Settings,    badge: null },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/60 bg-card/90 backdrop-blur-xl flex flex-col">

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border/40">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-blue-500 to-violet-600 flex items-center justify-center shadow-lg glow-primary">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-card animate-pulse-ring" />
        </div>
        <div>
          <p className="font-bold text-base tracking-tight leading-tight">CARE Agent</p>
          <p className="text-[10px] font-semibold text-emerald-400 tracking-widest uppercase">JSO Phase-2 ✓</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto" aria-label="Main Navigation">
        {NAV_GROUPS.map((group) => (
          <section key={group.label} aria-labelledby={`nav-group-${group.label}`}>
            <h2 id={`nav-group-${group.label}`} className="metric-label px-3 mb-2">{group.label}</h2>
            <ul className="space-y-0.5" role="list">
              {group.links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn('nav-link justify-between', active && 'nav-link-active')}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-primary' : 'text-muted-foreground')} />
                        {link.name}
                      </span>
                      <span className="flex items-center gap-1">
                        {link.badge && (
                          <span className={cn(
                            'text-[10px] font-bold px-1.5 py-0.5 rounded-md',
                            link.badge === 'NEW'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-secondary text-muted-foreground'
                          )}>
                            {link.badge}
                          </span>
                        )}
                        {active && <ChevronRight className="w-3 h-3 text-primary" />}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border/40 space-y-2">
        <div className="flex items-center gap-2 px-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
          <span className="text-xs text-muted-foreground">All systems operational</span>
        </div>
        <p className="text-[10px] text-muted-foreground/50 px-1 leading-relaxed">
          Powered by Google Vertex AI · AES-256 · AariyaTech JSO
        </p>
      </div>
    </aside>
  );
}
