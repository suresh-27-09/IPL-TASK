import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getExtraRuns } from '../api';
import '../components/chartSetup';

export default function ExtraRunsChart({ year }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getExtraRuns(year); 
      const labels = (data || []).map(d => d.bowling_team);
      const values = (data || []).map(d => d.extra_runs);
      setChartData({ labels, datasets: [{ label: `Extra Runs Conceded (${year})`, data: values, backgroundColor: 'rgba(255,99,132,0.6)' }]});
      setLoading(false);
    })();
  }, [year]);

  if (loading) return <p>Loading extra runs...</p>;
  if (!chartData || chartData.labels.length === 0) return <p>No data for extra runs.</p>;

  return (
    <div className="mt-4">
      <h4>Extra Runs Conceded Per Team ({year})</h4>
      <Bar data={chartData} />
    </div>
  );
}
