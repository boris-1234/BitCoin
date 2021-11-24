import { Line } from "react-chartjs-2";
import Timeslice from "./Timeslice";
import classes from "./Overview.module.css";

const Overview = (props) => {
  console.log(props.data.map((rec) => rec.Date));
  return (
    <div>
      <Timeslice handleSliceChange={props.handleSliceChange} />
      <Line
        data={{
          labels: props.data.map((rec) => rec.Date),
          datasets: [
            {
							label: 'Bitcoin price',
              data: props.data.map((rec) => rec.Close),
              fill: true,
              borderColor: "#556677",
            },
          ],
        }}
				options = {{
					plugins:{
						legend: {
							display: false,
						},
						// tooltips: {
						// 	callbacks: {
						// 		label: function(tooltipItem) {
						// 		console.log(tooltipItem)
						// 			return tooltipItem.yLabel;
						// 		}
						// 	}
						// }						
					},

				}}
      />
    </div>
  );
};

export default Overview;
