import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Sprout, CloudRain, Sun, AlertTriangle, Clock } from "lucide-react";

const CropCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const plantingCalendar = [
    {
      crop: 'Maize',
      seasons: [
        { name: 'Season A', months: [2, 3], status: 'optimal', regions: ['Kabale', 'Kisoro'] },
        { name: 'Season B', months: [8, 9], status: 'good', regions: ['Gulu', 'Lira'] }
      ]
    },
    {
      crop: 'Beans',
      seasons: [
        { name: 'Season A', months: [2, 3, 4], status: 'optimal', regions: ['Mbale', 'Sironko'] },
        { name: 'Season B', months: [8, 9], status: 'caution', regions: ['Mbarara'] }
      ]
    },
    {
      crop: 'Coffee',
      seasons: [
        { name: 'Planting', months: [3, 4, 5], status: 'optimal', regions: ['Mount Elgon', 'Rwenzori'] }
      ]
    },
    {
      crop: 'Sweet Potato',
      seasons: [
        { name: 'Year Round', months: [0,1,2,3,4,5,6,7,8,9,10,11], status: 'good', regions: ['All Regions'] }
      ]
    }
  ];

  const upcomingTasks = [
    {
      date: '2024-06-05',
      task: 'Maize Planting Window Opens',
      crop: 'Maize',
      regions: ['Kabale', 'Kisoro'],
      priority: 'high',
      weatherCondition: 'Optimal rainfall expected'
    },
    {
      date: '2024-06-10',
      task: 'Coffee Pruning Period',
      crop: 'Coffee',
      regions: ['Mbale', 'Sironko'],
      priority: 'medium',
      weatherCondition: 'Dry period ideal'
    },
    {
      date: '2024-06-15',
      task: 'Bean Pest Monitoring',
      crop: 'Beans',
      regions: ['Gulu', 'Lira'],
      priority: 'high',
      weatherCondition: 'High humidity alert'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'avoid': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isCurrentMonth = (monthIndex: number) => {
    return monthIndex === selectedMonth;
  };

  return (
    <div className="space-y-6">
      {/* Month Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Crop Planting Calendar</span>
          </CardTitle>
          <CardDescription>
            Optimal planting windows based on weather patterns and space weather forecasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {months.map((month, index) => (
              <Button
                key={month}
                variant={selectedMonth === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMonth(index)}
                className="text-xs"
              >
                {month}
              </Button>
            ))}
          </div>

          {/* Current Month View */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{months[selectedMonth]} Planting Guide</h3>
            
            <div className="grid gap-4">
              {plantingCalendar.map((crop, cropIndex) => (
                <div key={cropIndex}>
                  {crop.seasons.map((season, seasonIndex) => (
                    season.months.includes(selectedMonth) && (
                      <Card key={seasonIndex} className="border-l-4 border-l-green-500">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-3">
                              <Sprout className="h-5 w-5 text-green-600" />
                              <div>
                                <h4 className="font-semibold">{crop.crop} - {season.name}</h4>
                                <p className="text-sm text-gray-600">
                                  Regions: {season.regions.join(', ')}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className={getStatusColor(season.status)}>
                              {season.status.charAt(0).toUpperCase() + season.status.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span>Upcoming Agricultural Tasks</span>
          </CardTitle>
          <CardDescription>
            Important farming activities and recommendations for the next 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-500">{task.date}</div>
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority} priority
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">{task.task}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Sprout className="h-4 w-4" />
                      <span>Crop: {task.crop}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Regions: {task.regions.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CloudRain className="h-4 w-4" />
                      <span>{task.weatherCondition}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Weather Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-yellow-600" />
            <span>Seasonal Weather Patterns</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700">Season A (March - July)</h4>
              <div className="text-sm space-y-1">
                <p>• <strong>Peak Rainfall:</strong> April - May</p>
                <p>• <strong>Best for:</strong> Maize, Beans, Coffee planting</p>
                <p>• <strong>Space Weather:</strong> Generally stable</p>
                <p>• <strong>Risk Period:</strong> Late May (potential floods)</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700">Season B (September - January)</h4>
              <div className="text-sm space-y-1">
                <p>• <strong>Peak Rainfall:</strong> October - November</p>
                <p>• <strong>Best for:</strong> Short-season crops</p>
                <p>• <strong>Space Weather:</strong> Variable activity</p>
                <p>• <strong>Risk Period:</strong> December (dry spells)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropCalendar;
