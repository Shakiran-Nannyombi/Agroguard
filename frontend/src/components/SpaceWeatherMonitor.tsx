import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Sun, AlertTriangle, Activity, Radio, Satellite } from "lucide-react";

const SpaceWeatherMonitor = () => {
  const spaceWeatherData = {
    solarFlareIndex: 7.2,
    geomagneticStorm: 'Minor',
    radiationLevel: 'Normal',
    atmosphericDisturbance: 'Low',
    cropImpactRisk: 'Medium',
    lastUpdate: '2024-05-31 14:30 UTC'
  };

  const cropImpacts = [
    {
      crop: 'Coffee',
      risk: 'High',
      impact: 'Pollination disruption expected',
      recommendation: 'Monitor flowering stages closely',
      affectedRegions: ['Mbale', 'Sironko', 'Kapchorwa']
    },
    {
      crop: 'Maize',
      risk: 'Medium',
      impact: 'Growth rate may slow',
      recommendation: 'Adjust fertilizer schedule',
      affectedRegions: ['Kabale', 'Kisoro']
    },
    {
      crop: 'Beans',
      risk: 'Low',
      impact: 'Minimal effect expected',
      recommendation: 'Continue normal practices',
      affectedRegions: ['Gulu', 'Lira']
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSpaceWeatherIcon = (level: string) => {
    switch (level) {
      case 'High': return <Zap className="h-5 w-5 text-red-500" />;
      case 'Medium': return <Activity className="h-5 w-5 text-yellow-500" />;
      default: return <Sun className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Space Weather Status */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="h-6 w-6 text-orange-600" />
            <span>Space Weather Monitoring</span>
          </CardTitle>
          <CardDescription>
            Real-time space weather conditions affecting agricultural activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="flex justify-center mb-2">
                {getSpaceWeatherIcon('Medium')}
              </div>
              <div className="text-2xl font-bold text-orange-600">{spaceWeatherData.solarFlareIndex}</div>
              <div className="text-xs text-gray-600">Solar Flare Index</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border">
              <Badge variant="outline" className="mb-2 bg-yellow-100 text-yellow-800">
                {spaceWeatherData.geomagneticStorm}
              </Badge>
              <div className="text-xs text-gray-600">Geomagnetic Storm</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="flex justify-center mb-2">
                <Radio className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-sm font-medium">{spaceWeatherData.radiationLevel}</div>
              <div className="text-xs text-gray-600">Radiation Level</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border">
              <Badge variant="outline" className={getRiskColor(spaceWeatherData.cropImpactRisk)}>
                {spaceWeatherData.cropImpactRisk} Risk
              </Badge>
              <div className="text-xs text-gray-600 mt-1">Crop Impact</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            Last updated: {spaceWeatherData.lastUpdate}
          </div>
        </CardContent>
      </Card>

      {/* Space Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Active Space Weather Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <Zap className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Minor Solar Flare Event:</strong> Elevated solar activity detected. 
              Coffee pollination in highland areas may be affected for the next 48-72 hours.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-blue-200 bg-blue-50">
            <Radio className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Atmospheric Disturbance:</strong> Slight disruption in atmospheric conditions. 
              Consider adjusting irrigation schedules in Kabale and Kisoro districts.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Crop-Specific Impact Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Crop Impact Assessment</CardTitle>
          <CardDescription>
            How current space weather conditions may affect different crops
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cropImpacts.map((impact, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{impact.crop}</h3>
                    <Badge variant="outline" className={getRiskColor(impact.risk)}>
                      {impact.risk} Risk
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-sm">Impact: </span>
                    <span className="text-sm text-gray-700">{impact.impact}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Recommendation: </span>
                    <span className="text-sm text-gray-700">{impact.recommendation}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Affected Regions: </span>
                    <span className="text-sm text-gray-700">{impact.affectedRegions.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Space Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Space Weather Forecast</CardTitle>
          <CardDescription>
            Predicted space weather conditions and agricultural recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center py-3 border-b last:border-b-0">
                <div className="font-medium">{day}</div>
                <div className="flex items-center space-x-2">
                  {getSpaceWeatherIcon(index % 2 === 0 ? 'Medium' : 'Low')}
                  <span className="text-sm">
                    {index % 2 === 0 ? 'Moderate' : 'Calm'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Solar Index: {(Math.random() * 5 + 3).toFixed(1)}
                </div>
                <div>
                  <Badge variant="outline" className="text-xs">
                    {index % 3 === 0 ? 'Monitor Coffee' : index % 3 === 1 ? 'Normal Ops' : 'Watch Maize'}
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

export default SpaceWeatherMonitor;
