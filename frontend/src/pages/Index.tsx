import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Sprout, Users, MessageSquare, Satellite, CloudRain, Sun, Zap, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FarmerRegistration from "@/components/FarmerRegistration";
import CropMonitoring from "@/components/CropMonitoring";
import WeatherDashboard from "@/components/WeatherDashboard";
import AlertsPanel from "@/components/AlertsPanel";
import SpaceWeatherMonitor from "@/components/SpaceWeatherMonitor";
import CropCalendar from "@/components/CropCalendar";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard overview
  const stats = {
    totalFarmers: 247,
    activeAlerts: 12,
    healthyCrops: 189,
    riskCrops: 58,
    spaceWeatherStatus: 'Minor Storm',
    nextPlantingWindow: 'June 5-15'
  };

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
                {stats.spaceWeatherStatus}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 bg-white">
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
                  <div className="text-3xl font-bold">{stats.totalFarmers}</div>
                  <p className="text-xs opacity-75 mt-1">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Space Weather</CardTitle>
                  <Zap className="h-5 w-5 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{stats.spaceWeatherStatus}</div>
                  <p className="text-xs opacity-75 mt-1">Monitoring crop impact</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Healthy Crops</CardTitle>
                  <Sprout className="h-5 w-5 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.healthyCrops}</div>
                  <p className="text-xs opacity-75 mt-1">76% of total farms</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Next Planting</CardTitle>
                  <Calendar className="h-5 w-5 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{stats.nextPlantingWindow}</div>
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
                  <div className="border-l-4 border-orange-400 pl-4">
                    <p className="text-sm font-medium">Space Weather Alert - Coffee Regions</p>
                    <p className="text-xs text-gray-600">Sent to 45 coffee farmers • 1 hour ago</p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-4">
                    <p className="text-sm font-medium">Drought Warning - Kabale</p>
                    <p className="text-xs text-gray-600">Sent to 23 maize farmers • 2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4">
                    <p className="text-sm font-medium">Optimal Planting Window - Mbarara</p>
                    <p className="text-xs text-gray-600">Sent to 31 farmers • 6 hours ago</p>
                  </div>
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
                    <Badge variant="outline" className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weather API</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Space Weather Monitor</span>
                    <Badge variant="outline" className="bg-orange-100 text-orange-800">Alert Mode</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SMS Gateway</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Connected</Badge>
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
