import React from "react";
import Chart from "react-apexcharts";

interface BarChartProps {
  data: { [key: string]: number };
}

const chartStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "40vh",
  alignItems: "center",
  justifyContent: "center",
  width: "40vw",
  fontFamily:'"Libre Franklin", sans-serif',
  boxSizing: "border-box",
  overflowX:'auto',
  scrollbarColor: 'transparent transparent',
  backgroundColor:'#202020',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.6)'
};

const interiorStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const categories = Object.keys(data);
  const seriesData = Object.values(data);

  return (
    <div style={chartStyle}>
      <Chart
        options={{
          chart: {
            id: "visitors-per-country",
            zoom: {
              enabled: true,  // Enable zooming
              type: 'x',      // Zoom along the x-axis (can also be 'xy' or 'y')
            },
            toolbar: {
              autoSelected: 'zoom', // Add zoom toolbar option
              tools: {
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true, // Enable panning
              },
            },
          },
          xaxis: { categories },
        }}
        series={[
          {
            name: "Visitors",
            data: seriesData,
          },
        ]}
        type="bar"
        width="200%"
        height="90%"
        style={interiorStyle}
      />
    </div>
  );
};

export default BarChart;
