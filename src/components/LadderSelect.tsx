'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LadderOption } from '@/lib/types';

interface LadderSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function LadderSelect({ value, onValueChange, placeholder = "Select a ladder..." }: LadderSelectProps) {
  const [ladders, setLadders] = useState<LadderOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLadders() {
      try {
        const response = await fetch('/api/ladders');
        const data = await response.json();
        if (data.success) {
          setLadders(data.data);
        }
      } catch (error) {
        console.error('Failed to load ladders:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLadders();
  }, []);

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {ladders.map((ladder) => (
          <SelectItem key={ladder.id} value={ladder.id}>
            {ladder.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 