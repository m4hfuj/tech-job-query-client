import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const items = [
  { value: 10, label: 'Bachelors' },
  { value: 15, label: 'Masters' },
  { value: 20, label: 'PhD.' },
];

const formatObject = (obj) => {
  if (obj === null) {
    return '  undefined';
  }
  return JSON.stringify(obj, null, 2)
    .split('\n')
    .map((l) => `  ${l}`)
    .join('\n');
};
export default function Donut({ education }) {
  // const [identifier, setIdentifier] = React.useState(null);
  // const [id, setId] = React.useState(undefined);

  // const handleClick = (event, itemIdentifier, item) => {
  //   setId(item.id);
  //   setIdentifier(itemIdentifier);
  // };

  // console.log(education);

  // Combine Category and Value arrays into an array of objects
  const items = education.Category.map((category, index) => ({
    label: category,
    value: education.Value[index],
  }));

  // console.log(items);


  return (
    

    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      justifyContent="space-between"
      sx={{ width: '100%' }}
    >
      <Typography
        component="pre"
        sx={{ maxWidth: { xs: '100%', md: '50%', flexShrink: 2 }, overflow: 'auto' }}
      />

      {/* </Typography> */}

      <PieChart
        series={[
          {
            data: items,
            outerRadius: 80,
            innerRadius: 50,
            paddingAngle: 1,
          },
        ]}
        // onItemClick={handleClick}
        width={500}
        height={250}
        margin={{ right: 20 }}
      />
    </Stack>

    // </div>
  );
}
