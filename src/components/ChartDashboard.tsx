import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { ParseResult } from '../types/papaparse.types';

interface CSVData {
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

const ChartDashboard: React.FC = () => {
  const [data, setData] = useState<CSVData[]>([]);
  const [filteredData, setFilteredData] = useState<CSVData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const mainDashboardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    textTransform: 'uppercase',
    fontFamily: '"Libre Franklin", sans-serif',
    marginTop: '2em',
  };

  useEffect(() => {
    Papa.parse("/data.csv", {
      download: true,
      header: true,
      complete: (result: ParseResult<CSVData>) => {
        const parsedData: CSVData[] = result.data.map((row) => ({
          arrival_date_year: parseInt(row.arrival_date_year?.toString() || '0'),
          arrival_date_month: row.arrival_date_month || '',
          arrival_date_day_of_month: parseInt(row.arrival_date_day_of_month?.toString() || '0'),
          adults: parseInt(row.adults?.toString() || '0'),
          children: parseInt(row.children?.toString() || '0'),
          babies: parseInt(row.babies?.toString() || '0'),
          country: row.country || '',
        }));
        setData(parsedData);
        setFilteredData(parsedData);
      },
    });
  }, []);

  const filterDataByDate = () => {
    if (startDate && endDate) {
      const filtered = data.filter((item) => {
        const itemDate = new Date(
          item.arrival_date_year,
          new Date(`${item.arrival_date_month} 1`).getMonth(),
          item.arrival_date_day_of_month
        );
        return itemDate >= startDate && itemDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data); 
    }
  };

  useEffect(() => {
    filterDataByDate();
  }, [startDate, endDate, data]);

  const lineChartData = filteredData.reduce((acc: Record<string, number>, item) => {
    const dateString = `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`;
    const totalVisitors = item.adults + item.children + item.babies;

    if (!acc[dateString]) {
      acc[dateString] = totalVisitors;
    } else {
      acc[dateString] += totalVisitors;
    }
    return acc;
  }, {});

  const barChartData = filteredData.reduce((acc: Record<string, number>, item) => {
    const totalVisitors = item.adults + item.children + item.babies;
    if (!acc[item.country]) {
      acc[item.country] = totalVisitors;
    } else {
      acc[item.country] += totalVisitors;
    }
    return acc;
  }, {});

  const adultVisitorsData = filteredData.reduce((acc: { [key: string]: number }, item) => {
    const dateString = `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`;
    acc[dateString] = (acc[dateString] || 0) + item.adults;
    return acc;
  }, {});

  const childrenVisitorsData = filteredData.reduce((acc: { [key: string]: number }, item) => {
    const dateString = `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`;
    acc[dateString] = (acc[dateString] || 0) + item.children;
    return acc;
  }, {});

  return (
    <div style={mainDashboardStyle}>
      <div style={{
        display: "flex", 
        justifyContent: "space-evenly",
        width: "50%",
        height: "5%",
        zIndex: '1',
        marginTop: '0',
        scrollbarColor: 'transparent'
      }}>
        <div style={{
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h4 style={{ margin: '0' }}>Start Date</h4>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            placeholderText="Select Date"
            className="custom-datepicker"
            showYearDropdown
            showMonthDropdown
            yearDropdownItemNumber={15} 
            scrollableYearDropdown 
          />

        </div>
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ margin: '0' }}>End Date</h4>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            placeholderText="MM/DD/YYYY"
            className="custom-datepicker"
            showYearDropdown
            showMonthDropdown
            yearDropdownItemNumber={15}
            scrollableYearDropdown
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-evenly', width: '100vw', overflow: 'hidden', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 100%', maxWidth: '400px' }}>
          <h3 style={{ color: 'rgb(5,127,219)' }}>Visitors Per Country</h3>
          <BarChart data={barChartData} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 100%', maxWidth: '400px' }}>
          <h3 style={{ color: 'rgb(5,127,219)' }}>Visitors Per Day</h3>
          <LineChart data={lineChartData} />
        </div>
        
      </div>

      <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-evenly', width: '100vw', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 100%', maxWidth: '400px' }}>
          <h3 style={{ color: 'rgb(5,127,219)' }}>Total number of adult Visitors</h3>
          <LineChart data={adultVisitorsData} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 100%', maxWidth: '400px' }}>
          <h3 style={{ color: 'rgb(5,127,219)' }}>Total number of children Visitors</h3>
          <LineChart data={childrenVisitorsData} />
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
