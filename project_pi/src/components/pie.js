import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './webUsageStats';


export default function PieActiveArc() {
    return (
      <PieChart
        series={[
          {
            data: desktopOS,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter,
          },
        ]}
        height={200}
      />
    );
  }

// export default function BasicPie() {
//   return (
//     <PieChart
//     colors={['red', 'blue', 'green']} // Use palette
//       series={[
//         {
//           data: [
//             { id: 0, value: 10, color: 'red', label: 'task A' },
//             { id: 1, value: 15, color: 'blue', label: 'task B' },
//             { id: 2, value: 20, color: 'yellow', label: 'task C' },
//           ],
//           innerRadius: 30,
//           outerRadius: 100,
//           paddingAngle: 5,
//           cornerRadius: 5,
//           startingAngle: -134,
//           endingAngle: 225,
//           cx: 150,
//           cy: 150,
//         },
//       ]}
//       width={400}
//       height={200}
//     />
//   );
// }
