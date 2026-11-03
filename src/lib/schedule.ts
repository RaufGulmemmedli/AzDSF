import { competitions } from '@/data/competitions';
import type { Competition } from '@/types';

/**
 * The event the hero counts down to. Picked on the server so the client never
 * disagrees about "now" — pass the result down as a prop.
 */
export function getNextCompetition(from: Date = new Date()): Competition {
  const upcoming = competitions
    .filter((c) => new Date(`${c.isoDate}T09:00:00Z`).getTime() > from.getTime())
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  return upcoming[0] ?? competitions[0];
}
