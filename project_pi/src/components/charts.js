import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

function Charts(){
    const dailyTaskData = [
        {name: 'Finished', value: 50},
        {name: "Unfinished", value: 50},
    ]

    const finishRateData = [
        {name: 'Succeed', value: 50},
        {name: "Failed", value: 50},
    ]

    const progressNum = 40

    return(
        <div style={{display: "flex"}}>
            <div style={{"flex": 1}}>
                <PieChart width={300} height={300}>
                    <Pie
                        data={dailyTaskData}
                        cx={150}
                        cy={150}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#283739"
                        paddingAngle={10}
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    ></Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div style={{"flex": 2}}>
                <PieChart width={300} height={300}>
                    <Pie
                        data={finishRateData}
                        cx={150}
                        cy={150}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#228896"
                        paddingAngle={10}
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    ></Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div style={{"flex": 3}}>
                <div style={{ width: '80%', marginTop: '40px' }}>
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
                        }}/>
                    </div>
                </div>
            </div>
        </div>
)
}

export default Charts;