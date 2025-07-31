'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface TierAutocompleteProps {
  ladderId: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function TierAutocomplete({ ladderId, value, onValueChange, placeholder = "Select tier..." }: TierAutocompleteProps) {
  const [tiers, setTiers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadTiers() {
      if (!ladderId) {
        setTiers([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/ladders/${ladderId}`);
        const data = await response.json();
        if (data.success && data.data.type === 'tiered') {
          setTiers(data.data.bins.map((bin: any) => bin.label));
        } else {
          setTiers([]);
        }
      } catch (error) {
        console.error('Failed to load tiers:', error);
        setTiers([]);
      } finally {
        setLoading(false);
      }
    }

    loadTiers();
  }, [ladderId]);

  const filteredTiers = tiers.filter(tier =>
    tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (tiers.length === 0) {
    return (
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            placeholder="Search tiers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
        </div>
        {filteredTiers.map((tier) => (
          <SelectItem key={tier} value={tier}>
            {tier}
          </SelectItem>
        ))}
        {filteredTiers.length === 0 && (
          <div className="px-2 py-1 text-sm text-muted-foreground">
            No tiers found
          </div>
        )}
      </SelectContent>
    </Select>
  );
} 