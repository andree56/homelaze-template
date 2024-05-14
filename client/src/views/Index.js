/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = () => {
  const [chartData, setChartData] = useState({
      labels: [],
      datasets: [{
          label: 'Monthly Sales',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
      }]
  }); // Set initial state directly here
  const options = chartOptions();
  console.log("ASFUJIOASDFJIASOPEFJIAEFJIOJOASEFJIOASEFJ OPTIONS", options);


  useEffect(() => {
      const fetchSalesData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/appointments/sales/monthly');
              const labels = response.data.map(item => new Date(2020, item.month - 1).toLocaleString('default', { month: 'long' }));
              const salesData = response.data.map(item => item.totalSales);

              

              setChartData({
                  labels: labels,
                  datasets: [{
                      label: 'Monthly Sales',
                      data: salesData,
                      borderColor: 'rgb(75, 192, 192)', // Customize the chart line color here
                      fill: false,
                      tension: 0.1 // Customize the line tension (curve) here
                  }]
              });
          } catch (error) {
              console.error('Failed to fetch sales data:', error);
          }
      };

      fetchSalesData();
  }, []);


  if (window.Chart) {
    parseOptions(Chart, options);
  }


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl={{ size: 8, offset: 2 }}> {/* Centering the column in the grid */}
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                </div>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Line
                    data={chartData} // Ensure chartData is set up correctly to reflect the monthly sales data
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
);


};

export default Index;
