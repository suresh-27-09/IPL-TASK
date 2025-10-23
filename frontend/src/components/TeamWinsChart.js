import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTeamWins } from '../api';
import '../components/chartSetup';

export default function TeamWinsChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTeamWins();

      if (!Array.isArray(data) || data.length === 0) {
        setChartData(null);
        setLoading(false);
        return;
      }

      const seasons = [...new Set(data.map(d => d.season))].sort((a,b)=>a-b);
      const teams = [...new Set(data.map(d => d.winner).filter(Boolean))].sort();
      const datasets = teams.map((team, idx) => {
        const dataPoints = seasons.map(s => {
          const found = data.find(d => d.season === s && d.winner === team);
          return found ? found.wins : 0;
        });
        const color = `hsl(${(idx * 47) % 360} 70% 50%)`;
        return {
          label: team,
          data: dataPoints,
          backgroundColor: color,
        };
      });

      setChartData({ labels: seasons, datasets });
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading team wins chart...</p>;
  if (!chartData) return <p>No data available for team wins.</p>;

  return (
    <div className="mt-4">
      <h3>Matches Won by Teams Over Years (Stacked)</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true },
          },
        }}
      />
    </div>
  );
}
