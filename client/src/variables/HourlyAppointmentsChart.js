import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const HourlyAppointmentsChart = () => {
    const [chartData, setChartData] = useState({});

    const fetchHourlyStats = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/appointment-stats/hourly');
            const data = response.data;
            const labels = data.map(item => item.hour);
            const counts = data.map(item => item.count);
            setChartData({
                labels,
                datasets: [{
                    label: 'Number of Appointments per Hour',
                    data: counts,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)'
                }]
            });
        } catch (error) {
            console.error('Error fetching hourly stats:', error);
        }
    };

    useEffect(() => {
        fetchHourlyStats();
    }, []);

    return (
        <div>
            <h3>Hourly Appointments Chart</h3>
            <Bar data={chartData} />
        </div>
    );
};

export default HourlyAppointmentsChart;
