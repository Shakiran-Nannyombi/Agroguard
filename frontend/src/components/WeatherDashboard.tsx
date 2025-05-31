import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Sun, Wind, Thermometer, Droplets, Zap, AlertTriangle, Sprout } from "lucide-react";

const WeatherDashboard = () => {
  const weatherData = [
    {
      district: 'Kabale',
      temperature: 18,
      humidity: 75,
      rainfall: 15,
      windSpeed: 12,
      spaceWeather: 'Normal',
      conditions: 'Partly Cloudy',
      riskLevel: 'Medium'
    },
    {
      district: 'Gulu',
      temperature: 28,
      humidity: 45,
      rainfall: 5,
      windSpeed: 8,
      spaceWeather: 'Solar Flare Warning',
      conditions: 'Clear',
      riskLevel: 'High'
    },
    {
      district: 'Mbarara',
      temperature: 24,
      humidity: 65,
      rainfall: 25,
      windSpeed: 15,
      spaceWeather: 'Normal',
      conditions: 'Rainy',
      riskLevel: 'Low'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSpaceWeatherIcon = (status: string) => {
    return status.includes('Flare') ? 
      <Zap className="h-4 w-4 text-orange-500" /> : 
      <Sun className="h-4 w-4 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Current Weather Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherData.map((weather, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{weather.district}</CardTitle>
                <Badge variant="outline" className={getRiskColor(weather.riskLevel)}>
                  {weather.riskLevel} Risk
                </Badge>
              </div>
              <CardDescription className="flex items-center space-x-2">
                <span>{weather.conditions}</span>
                {weather.spaceWeather !== 'Normal' && (
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Space Weather Alert
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{weather.temperature}°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{weather.humidity}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{weather.rainfall}mm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{weather.windSpeed} km/h</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Space Weather</span>
                  <div className="flex items-center space-x-1">
                    {getSpaceWeatherIcon(weather.spaceWeather)}
                    <span className="text-sm">{weather.spaceWeather}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weather Alerts & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Weather Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-medium text-red-700">Drought Warning - Gulu</h4>
              <p className="text-sm text-gray-600">Low rainfall (5mm) detected. Recommend delaying maize planting.</p>
              <p className="text-xs text-gray-500">Valid until: June 5, 2024</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-medium text-orange-700">Solar Flare Activity</h4>
              <p className="text-sm text-gray-600">Elevated space weather may affect crop pollination and growth.</p>
              <p className="text-xs text-gray-500">Active: Next 48 hours</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-blue-700">Heavy Rains - Mbarara</h4>
              <p className="text-sm text-gray-600">Good conditions for coffee and beans. Monitor for flooding.</p>
              <p className="text-xs text-gray-500">Forecast: Next 3 days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sprout className="h-5 w-5 text-green-500" />
              <span>Planting Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-700">Optimal Conditions - Mbarara</h4>
              <p className="text-sm text-gray-600">Perfect weather for coffee planting. High soil moisture and moderate temperatures.</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-700">Wait Period - Kabale</h4>
              <p className="text-sm text-gray-600">Delay maize planting by 1 week. Expect better rainfall conditions.</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <h4 className="font-medium text-red-700">High Risk - Gulu</h4>
              <p className="text-sm text-gray-600">Avoid planting until rainfall improves. Consider drought-resistant varieties.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Weather Forecast</CardTitle>
          <CardDescription>Weather predictions for key agricultural districts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 items-center py-2 border-b last:border-b-0">
                <div className="font-medium">{day}</div>
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{Math.floor(Math.random() * 30) + 5}mm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{Math.floor(Math.random() * 15) + 20}°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{Math.floor(Math.random() * 10) + 8} km/h</span>
                </div>
                <div>
                  <Badge variant="outline" className="text-xs">
                    {index % 3 === 0 ? 'Sunny' : index % 3 === 1 ? 'Cloudy' : 'Rainy'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;
