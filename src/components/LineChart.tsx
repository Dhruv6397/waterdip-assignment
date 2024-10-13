import Chart from "react-apexcharts";

interface LineChartProps {
  data: { [key: string]: number }; 
}

const chartStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "40vh", 
  alignItems: "center",
  justifyContent: "center",
  width: "40vw", 
  boxSizing: "border-box",
  backgroundColor:'#202020',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.6)'
};

const interiorStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const categories = Object.keys(data);
  const seriesData = Object.values(data);

  return (
    <div style={chartStyle}>
      <Chart
        options={{
          chart: { id: "visitors-per-day" },
          xaxis: { categories },
          
        }
      
      }
        series={[
          {
            name: "Total Visitors",
            data: seriesData,
          },
        ]}
        type="line"
        width="100%"
        height="90%" 
        style={interiorStyle}
      />
    </div>
  );
};

export default LineChart;