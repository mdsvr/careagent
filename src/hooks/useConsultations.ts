import { useState, useMemo } from 'react';
import type { ConsultationRecord, ConsultationStatus } from '@/lib/data';

interface UseConsultationsProps {
  initialData: ConsultationRecord[];
}

export function useConsultations({ initialData }: UseConsultationsProps) {
  const [filter, setFilter] = useState<ConsultationStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return initialData.filter((consultation) => {
      // 1. Status Filter
      const matchesStatus = filter === 'All' || consultation.status === filter;

      // 2. Search Query Filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        consultation.hr.toLowerCase().includes(q) ||
        consultation.candidate.toLowerCase().includes(q) ||
        consultation.id.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [initialData, filter, searchQuery]);

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredData,
    totalCount: initialData.length,
    reviewedCount: initialData.filter(c => c.status === 'Reviewed').length,
    flaggedCount: initialData.filter(c => c.status === 'Flagged').length,
  };
}
