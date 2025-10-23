import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getMatchesPerYear } from '../api';
import '../components/chartSetup';

export default function MatchesPerYearChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getMatchesPerYear();
      
      const labels = (data || []).map(d => d.season);
      const values = (data || []).map(d => d.matches);
      setChartData({
        labels,
        datasets: [
          {
            label: 'Matches Per Year',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading matches per year...</p>;
  if (!chartData || chartData.labels.length === 0) return <p>No data available.</p>;

  return (
    <div className="mt-4">
      <h3>Matches Per Year</h3>
      <Bar data={chartData} />
    </div>
  );
}
