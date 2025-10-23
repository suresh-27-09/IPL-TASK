import React, { useState } from 'react';
import ExtraRunsChart from '../components/ExtraRunsChart';
import TopBowlersChart from '../components/TopBowlersChart';
import MatchesPlayedWonChart from '../components/MatchesPlayedWonChart';

export default function YearlyStats() {
  const seasons = Array.from({length: (2023 - 2008 + 1)}, (_, i) => 2008 + i);
  const [year, setYear] = useState(2016);

  return (
    <div className="mt-4">
      <h2>Yearly Stats</h2>
      <div className="mb-3">
        <label className="me-2">Select Year:</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {seasons.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <ExtraRunsChart year={year} />
      <TopBowlersChart year={year} />
      <MatchesPlayedWonChart year={year} />
    </div>
  );
}
