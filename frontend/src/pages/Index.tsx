import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Sprout, Users, MessageSquare, Satellite, CloudRain, Sun, Zap, Calendar, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FarmerRegistration from "@/components/FarmerRegistration";
import CropMonitoring from "@/components/CropMonitoring";
import WeatherDashboard from "@/components/WeatherDashboard";
import AlertsPanel from "@/components/AlertsPanel";
import SpaceWeatherMonitor from "@/components/SpaceWeatherMonitor";
import CropCalendar from "@/components/CropCalendar";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

// API endpoints
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Types
interface DashboardStats {
  totalFarmers: number;
  activeAlerts: number;
  healthyCrops: number;
  riskCrops: number;
  spaceWeatherStatus: string;
  nextPlantingWindow: string;
}

interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  affectedFarmers: number;
}

interface SystemStatus {
  satelliteFeed: string;
  weatherApi: string;
  spaceWeatherMonitor: string;
  smsGateway: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!response.ok) throw new Error("Failed to fetch dashboard stats");
      return response.json();
    },
  });

  // Fetch recent alerts
  const { data: alerts, isLoading: alertsLoading } = useQuery<Alert[]>({
    queryKey: ["recentAlerts"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/alerts/recent`);
      if (!response.ok) throw new Error("Failed to fetch recent alerts");
      return response.json();
    },
  });

  // Fetch system status
  const { data: systemStatus, isLoading: statusLoading } = useQuery<SystemStatus>({
    queryKey: ["systemStatus"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/system/status`);
      if (!response.ok) throw new Error("Failed to fetch system status");
      return response.json();
    },
  });

  // Show loading state
  if (statsLoading || alertsLoading || statusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-600 to-blue-600 p-2 rounded-lg">
                <Satellite className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  AgroGuard SkyFarm
                </h1>
                <p className="text-sm text-gray-600">Satellite Crop Health & Space Weather Advisory System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                System Active
              </Badge>
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                <Zap className="h-3 w-3 mr-1" />
                {stats?.spaceWeatherStatus}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="flex flex-nowrap overflow-x-auto justify-start md:grid md:grid-cols-7 w-full bg-white space-x-2 px-2 md:px-0">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="farmers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Farmers</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Satellite className="h-4 w-4" />
              <span>Crop Health</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center space-x-2">
              <CloudRain className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
            <TabsTrigger value="space" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Space Weather</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Crop Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Alerts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Farmers</CardTitle>
                  <Users className="h-5 w-5 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats?.totalFarmers}</div>
                  <p className="text-xs opacity-75 mt-1">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Space Weather</CardTitle>
                  <Zap className="h-5 w-5 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{stats?.spaceWeatherStatus}</div>
                  <p className="text-xs opacity-75 mt-1">Monitoring crop impact</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Healthy Crops</CardTitle>
                  <Sprout className="h-5 w-5 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats?.healthyCrops}</div>
                  <p className="text-xs opacity-75 mt-1">76% of total farms</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Next Planting</CardTitle>
                  <Calendar className="h-5 w-5 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{stats?.nextPlantingWindow}</div>
                  <p className="text-xs opacity-75 mt-1">Optimal window for maize</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <span>Recent SMS Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts?.map((alert) => (
                    <div key={alert.id} className="border-l-4 border-orange-400 pl-4">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-600">Sent to {alert.affectedFarmers} farmers • {alert.timestamp}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Satellite className="h-5 w-5 text-green-600" />
                    <span>System Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Satellite NDVI Feed</span>
                    <Badge variant="outline" className={`bg-${systemStatus?.satelliteFeed === 'Online' ? 'green' : 'red'}-100 text-${systemStatus?.satelliteFeed === 'Online' ? 'green' : 'red'}-800`}>
                      {systemStatus?.satelliteFeed}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weather API</span>
                    <Badge variant="outline" className={`bg-${systemStatus?.weatherApi === 'Active' ? 'green' : 'red'}-100 text-${systemStatus?.weatherApi === 'Active' ? 'green' : 'red'}-800`}>
                      {systemStatus?.weatherApi}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Space Weather Monitor</span>
                    <Badge variant="outline" className={`bg-${systemStatus?.spaceWeatherMonitor === 'Alert Mode' ? 'orange' : 'green'}-100 text-${systemStatus?.spaceWeatherMonitor === 'Alert Mode' ? 'orange' : 'green'}-800`}>
                      {systemStatus?.spaceWeatherMonitor}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SMS Gateway</span>
                    <Badge variant="outline" className={`bg-${systemStatus?.smsGateway === 'Connected' ? 'green' : 'red'}-100 text-${systemStatus?.smsGateway === 'Connected' ? 'green' : 'red'}-800`}>
                      {systemStatus?.smsGateway}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="farmers">
            <FarmerRegistration />
          </TabsContent>

          <TabsContent value="monitoring">
            <CropMonitoring />
          </TabsContent>

          <TabsContent value="weather">
            <WeatherDashboard />
          </TabsContent>

          <TabsContent value="space">
            <SpaceWeatherMonitor />
          </TabsContent>

          <TabsContent value="calendar">
            <CropCalendar />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
