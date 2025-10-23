import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getMatchesVsWins } from '../api';
import '../components/chartSetup';

export default function MatchesPlayedWonChart({ year }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getMatchesVsWins(year); 
      const labels = (data || []).map(d => d.team);
      const played = (data || []).map(d => d.played);
      const won = (data || []).map(d => d.won);
      setChartData({
        labels,
        datasets: [
          { label: 'Played', data: played, backgroundColor: 'rgba(255,206,86,0.6)' },
          { label: 'Won', data: won, backgroundColor: 'rgba(75,192,192,0.6)' },
        ],
      });
      setLoading(false);
    })();
  }, [year]);

  if (loading) return <p>Loading matches vs wins...</p>;
  if (!chartData || chartData.labels.length === 0) return <p>No matches data.</p>;

  return (
    <div className="mt-4">
      <h4>Matches Played vs Won ({year})</h4>
      <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </div>
  );
}
