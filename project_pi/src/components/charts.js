import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

function Charts() {
  const dailyTaskData = [
    { name: 'Finished', value: 50 },
    { name: 'Unfinished', value: 50 },
  ];

  const finishRateData = [
    { name: 'Succeed', value: 50 },
    { name: 'Failed', value: 50 },
  ];

  const progressNum = 40;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
      <div style={{ flex: 1, width: '500px', marginRight: '50px' }}>
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>Progress</span>
            <span>{progressNum}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#e0e0e0',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressNum}%`,
                height: '100%',
                backgroundColor: '#A9C52F',
                borderRadius: '5px',
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ flex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <PieChart width={300} height={300}>
            <Pie
              data={dailyTaskData}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={10}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {dailyTaskData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === 'Finished' ? '#228896' : '#f44336'} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <PieChart width={300} height={300}>
            <Pie
              data={finishRateData}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={10}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {finishRateData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === 'Succeed' ? '#A9C52F' : '#283739'} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Charts;
