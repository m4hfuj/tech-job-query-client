import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';



export default function BasicBars({ columns, data }) {
  return (
    <div className='flex justify-center'>
        <BarChart
          // xAxis={[{ scaleType: 'band', data: columns }]}
          xAxis={[
            { 
              scaleType: 'band', 
              data: columns,
              angle: -45,
              // label: {
              //   angle: -45, // Rotate labels by -45 degrees
              // }
            }
          ]}
          series={[{ data: data, color: '#FF5733' }]}
          width={450}
          height={250}
        />

    </div>
  );
}
