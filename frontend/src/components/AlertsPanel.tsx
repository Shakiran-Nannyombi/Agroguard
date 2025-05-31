import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Clock, Users, AlertTriangle, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  type: 'drought' | 'pest' | 'weather' | 'planting' | 'harvest';
  priority: 'high' | 'medium' | 'low';
  district: string;
  crop: string;
  message: string;
  sentTo: number;
  status: 'sent' | 'pending' | 'failed';
  timestamp: string;
}

const AlertsPanel = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'drought',
      priority: 'high',
      district: 'Gulu',
      crop: 'Maize',
      message: '🌤 Too dry for maize — delay planting until next week. Rainfall expected soon.',
      sentTo: 23,
      status: 'sent',
      timestamp: '2024-05-31 14:30'
    },
    {
      id: '2',
      type: 'pest',
      priority: 'medium',
      district: 'Kabale',
      crop: 'Beans',
      message: '🐛 High pest risk for beans — consider early pesticide application.',
      sentTo: 15,
      status: 'sent',
      timestamp: '2024-05-31 12:15'
    },
    {
      id: '3',
      type: 'planting',
      priority: 'low',
      district: 'Mbarara',
      crop: 'Coffee',
      message: '🌱 Optimal planting conditions for coffee. Good soil moisture and temperature.',
      sentTo: 31,
      status: 'pending',
      timestamp: '2024-05-31 10:00'
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    type: '',
    priority: '',
    district: '',
    crop: '',
    message: ''
  });

  const alertTypes = [
    { value: 'drought', label: 'Drought Warning', icon: '🌤' },
    { value: 'pest', label: 'Pest Alert', icon: '🐛' },
    { value: 'weather', label: 'Weather Update', icon: '🌧' },
    { value: 'planting', label: 'Planting Advisory', icon: '🌱' },
    { value: 'harvest', label: 'Harvest Time', icon: '🌾' }
  ];

  const districts = ['Kabale', 'Gulu', 'Mbarara', 'Kampala', 'Jinja', 'Mbale'];
  const crops = ['Maize', 'Beans', 'Coffee', 'Cassava', 'Sweet Potato', 'Rice'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAlert.type || !newAlert.district || !newAlert.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const alert: Alert = {
      id: Date.now().toString(),
      type: newAlert.type as any,
      priority: newAlert.priority as any || 'medium',
      district: newAlert.district,
      crop: newAlert.crop || 'All Crops',
      message: newAlert.message,
      sentTo: Math.floor(Math.random() * 50) + 10,
      status: 'sent',
      timestamp: new Date().toLocaleString()
    };

    setAlerts(prev => [alert, ...prev]);
    setNewAlert({
      type: '',
      priority: '',
      district: '',
      crop: '',
      message: ''
    });

    toast({
      title: "Alert Sent",
      description: `SMS alert sent to farmers in ${alert.district}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Create New Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5 text-blue-600" />
            <span>Send New SMS Alert</span>
          </CardTitle>
          <CardDescription>
            Create and send personalized alerts to farmers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendAlert} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alertType">Alert Type *</Label>
                <Select value={newAlert.type} onValueChange={(value) => setNewAlert(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    {alertTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newAlert.priority} onValueChange={(value) => setNewAlert(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select value={newAlert.district} onValueChange={(value) => setNewAlert(prev => ({ ...prev, district: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">Specific Crop (Optional)</Label>
              <Select value={newAlert.crop} onValueChange={(value) => setNewAlert(prev => ({ ...prev, crop: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop or leave blank for all" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={newAlert.message}
                onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your alert message (160 characters max for SMS)"
                className="min-h-[100px]"
                maxLength={160}
              />
              <p className="text-xs text-gray-500">
                {newAlert.message.length}/160 characters
              </p>
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Send Alert
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            <span>Recent Alerts ({alerts.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                      {alert.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {alertTypes.find(t => t.value === alert.type)?.icon} {alert.type.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(alert.status)}
                      <span className="text-sm text-gray-600 capitalize">{alert.status}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>📍 {alert.district}</span>
                    <span>🌾 {alert.crop}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{alert.sentTo} farmers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsPanel;
