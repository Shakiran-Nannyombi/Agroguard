import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Phone, MapPin, Sprout, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FarmerRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    subCounty: '',
    crop: '',
    language: 'english'
  });

  const ugandanDistricts = [
    'Kabale', 'Kisoro', 'Mbale', 'Sironko', 'Kapchorwa', 'Gulu', 'Lira', 'Mbarara', 'Kampala'
  ];

  const crops = [
    'Maize', 'Beans', 'Coffee', 'Sweet Potato', 'Cassava', 'Rice', 'Banana', 'Groundnuts'
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'luganda', label: 'Luganda' },
    { value: 'runyankole', label: 'Runyankole' },
    { value: 'ateso', label: 'Ateso' },
    { value: 'acholi', label: 'Acholi' }
  ];

  const registeredFarmers = [
    { name: 'John Mukasa', district: 'Kabale', crop: 'Maize', phone: '+256 700 123 456' },
    { name: 'Sarah Namuli', district: 'Mbale', crop: 'Coffee', phone: '+256 701 234 567' },
    { name: 'Peter Okello', district: 'Gulu', crop: 'Beans', phone: '+256 702 345 678' },
    { name: 'Mary Atim', district: 'Lira', crop: 'Rice', phone: '+256 703 456 789' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.district || !formData.crop) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Farmer Registered Successfully!",
      description: `${formData.name} has been registered for ${formData.crop} farming in ${formData.district}.`
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      district: '',
      subCounty: '',
      crop: '',
      language: 'english'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-green-600" />
            <span>Farmer Registration</span>
          </CardTitle>
          <CardDescription>
            Register farmers to receive personalized crop health alerts via SMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter farmer's full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+256 700 000 000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {ugandanDistricts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCounty">Sub-County</Label>
                <Input
                  id="subCounty"
                  value={formData.subCounty}
                  onChange={(e) => handleInputChange('subCounty', e.target.value)}
                  placeholder="Enter sub-county"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop">Primary Crop *</Label>
                <Select value={formData.crop} onValueChange={(value) => handleInputChange('crop', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <User className="h-4 w-4 mr-2" />
              Register Farmer
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Registered Farmers List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Registered Farmers</span>
          </CardTitle>
          <CardDescription>
            Recently registered farmers in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {registeredFarmers.map((farmer, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{farmer.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{farmer.district}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Sprout className="h-3 w-3" />
                        <span>{farmer.crop}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{farmer.phone}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Active
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

export default FarmerRegistration;
