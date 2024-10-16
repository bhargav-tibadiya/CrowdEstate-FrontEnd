import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react'
import styles from "./PieChart.module.scss"

const Piechart = ({ data, labels }) => {
    const ChartRef = useRef(null);
    const ChartInstance = useRef(null);
    const backgroundColor = ['#E85602', '#A9DD24', "#0000ff","#FFD60A","#AFB2BF"]

    useEffect(() => {
        if (ChartInstance.current) {
            ChartInstance.current.destroy();
        }

        const myChartRef = ChartRef.current.getContext("2d");

        ChartInstance.current = new Chart(myChartRef, {
            type: "doughnut",
            data: {
                // labels: labels,
                datasets: [
                    {
                        label: "Crowd Estate",
                        data: data,
                        borderWidth: 1,
                        backgroundColor: backgroundColor,
                    }
                ],

                hoverOffset: 4
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        enabled: true,
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
            },


        })
        return () => {
            if (ChartInstance.current) {
                ChartInstance.current.destroy();
            }
        }
    }, [data, labels]);


    return (
        <div className={styles.container}>
            <canvas ref={ChartRef} />
            <div className={styles.all_labels_data}>
                {
                    labels.map((ele, index) => {
                        return (
                            <div className={styles.labels} key={index}>
                                <div className={styles.color} style={{background:backgroundColor[index]}}></div>
                                <div className={styles.labels_parts}>
                                    <div className={styles.que}>{ele}</div>
                                    <div className={styles.ans}>{data[index]}</div>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
        </div>
    )
}

export default Piechart