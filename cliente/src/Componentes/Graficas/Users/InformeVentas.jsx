import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Informe de ventas',
        },
    },
};

const DIAGRAM = {
    labels: [],
    datasets: [
        {
            label: 'ventas totales',
            backgroundColor: 'violet',
            


        }
    ],
};

const InformeVentas = ({ items, labels }) => {
    const [data, setData] = useState(DIAGRAM);

    useEffect(() => {
        setData({
            labels,
            datasets: [{
                label: 'ventas totales',
                backroundColor: 'rgba(255, 99, 132, 0.5)',             
                data: items
            }]
        })
    }, [items, labels])

    return (
        <div className="container-sm">
            <div id ="graficas" className='graficas'>
                 <Bar options={OPTIONS} data={data} />
            </div>

        </div>
    )
}

export default InformeVentas