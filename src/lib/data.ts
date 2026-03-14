// ─── Centralised mock data layer (production: replace with Supabase client) ───

export type ToneAnalysis = { positive: number; neutral: number; negative: number };
export type ConsultationStatus = 'Reviewed' | 'Flagged' | 'Pending';
export type ToneLabel = 'Positive' | 'Neutral' | 'Negative';

export interface Consultant {
  id: string;
  name: string;
  avatar: string;
  role: string;
  score: number;
  sessions: number;
  tone: ToneLabel;
  trend: number;   // % delta week-on-week
}

export interface ConsultationRecord {
  id: string;
  date: string;
  hr: string;
  hrId: string;
  candidate: string;
  score: number;
  status: ConsultationStatus;
  tone: ToneLabel;
  flags: number;
  duration: string;
  metrics: {
    professionalism: number;
    engagement: number;
    advice: number;
    communication: number;
  };
}

export interface WeeklyMetric {
  name: string;
  score: number;
  positive: number;
  neutral: number;
  negative: number;
  sessions: number;
}

export interface PlatformStat {
  label: string;
  value: string;
  raw: number;
  delta: string;
  up: boolean;
  icon: string;
}

// ─── Weekly trend data ────────────────────────────────────────────
export const weeklyData: WeeklyMetric[] = [
  { name: 'Mon', score: 7.2, positive: 61, neutral: 24, negative: 15, sessions: 42 },
  { name: 'Tue', score: 8.5, positive: 73, neutral: 18, negative: 9,  sessions: 58 },
  { name: 'Wed', score: 8.1, positive: 68, neutral: 21, negative: 11, sessions: 51 },
  { name: 'Thu', score: 9.3, positive: 84, neutral: 11, negative: 5,  sessions: 67 },
  { name: 'Fri', score: 8.8, positive: 79, neutral: 14, negative: 7,  sessions: 63 },
  { name: 'Sat', score: 9.5, positive: 89, neutral: 8,  negative: 3,  sessions: 44 },
  { name: 'Sun', score: 9.1, positive: 82, neutral: 12, negative: 6,  sessions: 38 },
];

// ─── Platform KPIs ───────────────────────────────────────────────
export const platformStats: PlatformStat[] = [
  { label: 'Avg. Score',        value: '8.7',   raw: 8.7,  delta: '+2.1% vs last week', up: true,  icon: 'star' },
  { label: 'Sessions Analyzed', value: '1,240', raw: 1240, delta: '+18% this month',    up: true,  icon: 'activity' },
  { label: 'Avg. Professionalism', value: '9.2', raw: 9.2, delta: 'High standard',      up: true,  icon: 'user-check' },
  { label: 'Avg. Engagement',   value: '7.4',   raw: 7.4,  delta: '-4.2% needs focus',  up: false, icon: 'zap' },
];

// ─── Top HR Consultants ──────────────────────────────────────────
export const topConsultants: Consultant[] = [
  { id: 'HR-001', name: 'Sarah Jenkins',    avatar: 'SJ', role: 'Senior HR Advisor', score: 9.8, sessions: 142, tone: 'Positive', trend: 3.2  },
  { id: 'HR-002', name: 'Michael Chen',     avatar: 'MC', role: 'HR Consultant',      score: 9.4, sessions: 98,  tone: 'Positive', trend: 1.1  },
  { id: 'HR-003', name: 'Emily Rodriguez',  avatar: 'ER', role: 'Senior HR Advisor', score: 8.9, sessions: 204, tone: 'Neutral',  trend: -0.3 },
  { id: 'HR-004', name: 'David Kim',        avatar: 'DK', role: 'HR Consultant',      score: 8.7, sessions: 56,  tone: 'Neutral',  trend: 2.0  },
  { id: 'HR-005', name: 'Priya Sharma',     avatar: 'PS', role: 'HR Specialist',      score: 8.2, sessions: 88,  tone: 'Positive', trend: 0.8  },
];

// ─── Consultation Records ────────────────────────────────────────
export const consultations: ConsultationRecord[] = [
  { id: 'C-1049', date: 'Today, 10:30 AM',    hr: 'Sarah Jenkins',   hrId: 'HR-001', candidate: 'John Doe',      score: 9.2, status: 'Reviewed', tone: 'Positive', flags: 0, duration: '28 min', metrics: { professionalism: 9.5, engagement: 9.1, advice: 9.0, communication: 9.2 } },
  { id: 'C-1048', date: 'Today, 09:15 AM',    hr: 'Michael Chen',    hrId: 'HR-002', candidate: 'Alan Turing',   score: 6.8, status: 'Flagged',  tone: 'Negative', flags: 2, duration: '19 min', metrics: { professionalism: 6.5, engagement: 6.2, advice: 7.1, communication: 7.4 } },
  { id: 'C-1047', date: 'Yesterday, 3:00 PM', hr: 'Emily Rodriguez', hrId: 'HR-003', candidate: 'Jane Smith',    score: 8.5, status: 'Reviewed', tone: 'Neutral',  flags: 0, duration: '34 min', metrics: { professionalism: 8.8, engagement: 8.2, advice: 8.5, communication: 8.5 } },
  { id: 'C-1046', date: 'Yesterday, 11:00 AM',hr: 'Sarah Jenkins',   hrId: 'HR-001', candidate: 'Bob Ross',      score: 9.7, status: 'Reviewed', tone: 'Positive', flags: 0, duration: '41 min', metrics: { professionalism: 9.8, engagement: 9.6, advice: 9.7, communication: 9.7 } },
  { id: 'C-1045', date: '2 days ago',         hr: 'David Kim',       hrId: 'HR-004', candidate: 'Alice Green',   score: 7.1, status: 'Flagged',  tone: 'Neutral',  flags: 1, duration: '22 min', metrics: { professionalism: 7.4, engagement: 6.8, advice: 7.2, communication: 7.0 } },
  { id: 'C-1044', date: '2 days ago',         hr: 'Emily Rodriguez', hrId: 'HR-003', candidate: 'Mark Lee',      score: 8.9, status: 'Reviewed', tone: 'Positive', flags: 0, duration: '37 min', metrics: { professionalism: 9.1, engagement: 8.7, advice: 9.0, communication: 8.8 } },
  { id: 'C-1043', date: '3 days ago',         hr: 'Priya Sharma',    hrId: 'HR-005', candidate: 'Omar Farooq',   score: 8.3, status: 'Reviewed', tone: 'Positive', flags: 0, duration: '31 min', metrics: { professionalism: 8.5, engagement: 8.0, advice: 8.4, communication: 8.3 } },
  { id: 'C-1042', date: '3 days ago',         hr: 'Michael Chen',    hrId: 'HR-002', candidate: 'Sara Williams', score: 9.1, status: 'Reviewed', tone: 'Positive', flags: 0, duration: '29 min', metrics: { professionalism: 9.3, engagement: 9.0, advice: 9.2, communication: 8.9 } },
];

// ─── Audit log ───────────────────────────────────────────────────
export const auditLog = [
  { time: 'Today, 08:00',  event: 'PII scrubbing verification passed — all pipelines clean.',          level: 'ok'   as const },
  { time: 'Today, 09:15',  event: 'Session C-1048 flagged by Agent 2: low engagement (6.8).',          level: 'warn' as const },
  { time: 'Today, 10:30',  event: 'Session C-1049 analyzed — 9.2/10, no risk flags.',                  level: 'ok'   as const },
  { time: 'Today, 11:45',  event: 'Bias audit completed: no demographic signals detected.',             level: 'ok'   as const },
  { time: 'Yesterday, 15:00', event: 'Vercel auto-scaled — serverless compute optimised.',             level: 'ok'   as const },
  { time: 'Yesterday, 09:00', event: 'RBAC verified — HR Consultant scope limited to own sessions.', level: 'ok'   as const },
  { time: '2 days ago, 08:00', event: 'AES-256 S3 bucket key rotation completed.',                    level: 'ok'   as const },
];
