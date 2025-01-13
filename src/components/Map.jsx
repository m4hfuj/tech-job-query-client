import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import * as d3 from 'd3';

export default function ChoroplethChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv').then(rows => {
      const unpack = (rows, key) => rows.map(row => row[key]);

      const chartData = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'code'),
        z: unpack(rows, 'total exports'),
        text: unpack(rows, 'state'),
        zmin: 0,
        zmax: 17000,
        colorscale: [
          [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
          [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
          [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
        ],
        // colorbar: {
        //   title: { text: 'Millions USD' },
        //   thickness: 20
        // },
        marker: {
          line: {
            color: 'rgb(255,255,255)',
            width: 2
          }
        }
      }];

      setData(chartData);
    });
  }, []);

  const layout = {
    // title: { text: '2011 US Agriculture Exports by State' },
    geo: {
      scope: 'europe',
      // showlakes: true,Russia
      // lakecolor: 'rgb(255,255,255)'
    }
  };

  return (
    <Plot
      data={data}
      layout={layout}
      // config={{ showLink: true }}
      style={{ width: '150%', height: '150%' }}
    />
  );
}
