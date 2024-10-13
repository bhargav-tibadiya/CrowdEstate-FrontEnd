import { useEffect, useRef } from 'react';
import { Chart} from 'chart.js';


const BarChart = ({ labels, amounts}) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        // const labels = ;
        const label = labels;
        chartInstance.current = new Chart(ctx, {
            type: 'bar',

            data: {
                labels: label,
                datasets: [{
                    label:"Recent Transaction",
                    data: amounts,
                    backgroundColor:'#2C333F',
                    hoverBackgroundColor:"#FFD60A",
                    borderWidth: 1,
                    borderRadius:30,
                }]
            },
            
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels,amounts]);

    return (
        <div className="bar-chart-container">
            <canvas ref={chartRef} style={{maxWidth:"100%", maxHeight:"200px"}}/>
        </div>
    );
};

export default BarChart;
