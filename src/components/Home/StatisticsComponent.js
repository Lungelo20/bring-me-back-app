import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/StatisticsComponent.css';

const StatisticsComponent = () => {
  // Dummy data for the charts
  const missingVsFoundData = [
    { name: 'Women', value: 400 },
    { name: 'Men', value: 300 },
    { name: 'Children', value: 200 },
  ];

  const raceDistributionData = [
    { name: 'White', value: 400 },
    { name: 'Black', value: 300 },
    { name: 'Asian', value: 300 },
    { name: 'Other', value: 200 },
  ];

  const genderDistributionData = [
    { name: 'Female', value: 600 },
    { name: 'Male', value: 500 },
    { name: 'Other', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="statistics-component">
      <Row>
        <Col xs={12} className="mb-3">
          <Card className="stat-card border rounded bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Missing vs Found</Card.Title>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={missingVsFoundData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {missingVsFoundData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} className="mb-3">
          <Card className="stat-card border rounded bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Missing by Race</Card.Title>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={raceDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    fill="#82ca9d"
                    dataKey="value"
                  >
                    {raceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} className="mb-3">
          <Card className="stat-card border rounded bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Gender Distribution</Card.Title>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={genderDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    fill="#FFBB28"
                    dataKey="value"
                  >
                    {genderDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="stat-card border rounded bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Missing Reports Over Time</Card.Title>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { name: 'Jan', reports: 400 },
                    { name: 'Feb', reports: 300 },
                    { name: 'Mar', reports: 200 },
                    { name: 'Apr', reports: 278 },
                    { name: 'May', reports: 189 },
                    { name: 'Jun', reports: 239 },
                    { name: 'Jul', reports: 349 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reports" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsComponent;
