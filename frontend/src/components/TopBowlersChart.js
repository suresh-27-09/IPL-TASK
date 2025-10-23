import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTopEconomicalBowlers } from '../api';
import '../components/chartSetup';

export default function TopBowlersChart({ year }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTopEconomicalBowlers(year); 
      const labels = (data || []).map(d => d.bowler);
      const values = (data || []).map(d => Number(d.economy).toFixed(2));
      setChartData({ labels, datasets: [{ label: `Economy (${year})`, data: values, backgroundColor: 'rgba(54,162,235,0.6)' }]});
      setLoading(false);
    })();
  }, [year]);

  if (loading) return <p>Loading top bowlers...</p>;
  if (!chartData || chartData.labels.length === 0) return <p>No data for bowlers.</p>;

  return (
    <div className="mt-4">
      <h4>Top Economical Bowlers ({year})</h4>
      <Bar data={chartData} />
    </div>
  );
}
