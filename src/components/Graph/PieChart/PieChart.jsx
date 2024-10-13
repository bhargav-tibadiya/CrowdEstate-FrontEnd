import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react'
import styles from "./PieChart.module.scss"

const Piechart = ({ data, labels }) => {
    const ChartRef = useRef(null);
    const ChartInstance = useRef(null);

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
                        backgroundColor: [
                            '#E85602',
                            '#A9DD24',
                            "#0000ff"

                        ],
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

                <div className={styles.labels}>
                    <div className={styles.color}></div>
                    <div className={styles.labels_parts}>
                        <div className={styles.que}>{labels[0]}</div>
                        <div className={styles.ans}>{data[0]}</div>
                    </div>
                </div>
                <div className={styles.labels}>
                    <div className={styles.color1}></div>
                    <div className={styles.labels_parts}>
                        <div className={styles.que}>{labels[1]}</div>
                        <div className={styles.ans}>{data[1]}</div>
                    </div>
                </div>
                <div className={styles.labels}>
                    <div className={styles.color2}></div>
                    <div className={styles.labels_parts}>
                        <div className={styles.que}>{labels[2]}</div>
                        <div className={styles.ans}>{data[2]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Piechart