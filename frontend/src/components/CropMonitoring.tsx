import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Satellite, Sprout, AlertTriangle, TrendingUp, TrendingDown, Eye } from "lucide-react";

const CropMonitoring = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const cropData = [
    {
      id: 1,
      farmerId: 'F001',
      farmerName: 'John Mukasa',
      location: 'Kabale District',
      crop: 'Maize',
      ndviValue: 0.75,
      soilMoisture: 68,
      healthStatus: 'Healthy',
      riskLevel: 'Low',
      lastUpdated: '2 hours ago',
      recommendations: ['Continue current irrigation', 'Monitor for pests'],
      area: '2.5 hectares'
    },
    {
      id: 2,
      farmerId: 'F002',
      farmerName: 'Sarah Namuli',
      location: 'Mbale District',
      crop: 'Coffee',
      ndviValue: 0.45,
      soilMoisture: 34,
      healthStatus: 'At Risk',
      riskLevel: 'Medium',
      lastUpdated: '1 hour ago',
      recommendations: ['Increase irrigation', 'Apply fertilizer', 'Monitor space weather impact'],
      area: '1.8 hectares'
    },
    {
      id: 3,
      farmerId: 'F003',
      farmerName: 'Peter Okello',
      location: 'Gulu District',
      crop: 'Beans',
      ndviValue: 0.82,
      soilMoisture: 72,
      healthStatus: 'Excellent',
      riskLevel: 'Low',
      lastUpdated: '30 minutes ago',
      recommendations: ['Maintain current practices', 'Prepare for harvest'],
      area: '3.2 hectares'
    },
    {
      id: 4,
      farmerId: 'F004',
      farmerName: 'Mary Atim',
      location: 'Lira District',
      crop: 'Rice',
      ndviValue: 0.38,
      soilMoisture: 28,
      healthStatus: 'Poor',
      riskLevel: 'High',
      lastUpdated: '45 minutes ago',
      recommendations: ['Immediate irrigation needed', 'Check for disease', 'Consider replanting'],
      area: '4.1 hectares'
    }
  ];

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'Healthy': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Poor': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNDVIColor = (value: number) => {
    if (value >= 0.7) return 'text-green-600';
    if (value >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'Excellent':
      case 'Healthy':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'At Risk':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Poor':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Sprout className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Farms Monitored</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs opacity-75">Across 15 districts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Healthy Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189</div>
            <p className="text-xs opacity-75">76% of total farms</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs opacity-75">Require attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs opacity-75">Need immediate action</p>
          </CardContent>
        </Card>
      </div>

      {/* Satellite Monitoring Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="h-5 w-5 text-green-600" />
            <span>Real-time Crop Health Monitoring</span>
          </CardTitle>
          <CardDescription>
            NDVI and soil moisture data from satellite imagery updated every 30 minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cropData.map((farm) => (
              <Card key={farm.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{farm.farmerName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {farm.farmerId}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{farm.location} • {farm.crop} • {farm.area}</p>
                      <p className="text-xs text-gray-500">Last updated: {farm.lastUpdated}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getHealthIcon(farm.healthStatus)}
                      <Badge variant="outline" className={getHealthColor(farm.healthStatus)}>
                        {farm.healthStatus}
                      </Badge>
                      <Badge variant="outline" className={getRiskColor(farm.riskLevel)}>
                        {farm.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">NDVI Value</span>
                        <span className={`text-sm font-bold ${getNDVIColor(farm.ndviValue)}`}>
                          {farm.ndviValue.toFixed(2)}
                        </span>
                      </div>
                      <Progress value={farm.ndviValue * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Soil Moisture</span>
                        <span className="text-sm font-bold">{farm.soilMoisture}%</span>
                      </div>
                      <Progress value={farm.soilMoisture} className="h-2" />
                    </div>

                    <div className="flex items-center justify-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Recommendations:</h5>
                    <div className="flex flex-wrap gap-2">
                      {farm.recommendations.map((rec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {rec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* NDVI Interpretation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>NDVI Interpretation Guide</CardTitle>
          <CardDescription>
            Understanding Normalized Difference Vegetation Index values for crop health assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-lg font-bold text-red-600">0.0 - 0.4</div>
              <div className="text-sm text-red-700">Poor Health</div>
              <div className="text-xs text-gray-600 mt-1">Stressed vegetation or bare soil</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-lg font-bold text-yellow-600">0.4 - 0.6</div>
              <div className="text-sm text-yellow-700">Moderate Health</div>
              <div className="text-xs text-gray-600 mt-1">Vegetation present but stressed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-lg font-bold text-blue-600">0.6 - 0.8</div>
              <div className="text-sm text-blue-700">Healthy</div>
              <div className="text-xs text-gray-600 mt-1">Good vegetation vigor</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-lg font-bold text-green-600">0.8 - 1.0</div>
              <div className="text-sm text-green-700">Excellent</div>
              <div className="text-xs text-gray-600 mt-1">Dense, healthy vegetation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropMonitoring;
