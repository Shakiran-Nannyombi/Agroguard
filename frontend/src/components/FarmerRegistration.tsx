import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Phone, MapPin, Sprout, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Farmer, FormData, FormField } from '@/types';
import { validateForm, formatPhoneNumber } from '@/utils/validation';
import { api } from '@/services/api';

const FarmerRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    district: '',
    subCounty: '',
    crop: '',
    language: 'english'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [farmers, setFarmers] = useState<Farmer[]>([]);

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

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await api.farmers.getAll();
      setFarmers(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch farmers. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const { isValid, errors: validationErrors } = validateForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await api.farmers.register({
        ...formData,
        status: 'active'
      });

      toast({
        title: "Success",
        description: `${formData.name} has been registered successfully.`
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

      // Refresh farmers list
      fetchFarmers();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register farmer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: FormField, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'phone') {
        newData.phone = formatPhoneNumber(value);
      }
      return newData;
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
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
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p className="text-sm text-red-500" id="name-error">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+256 700 000 000"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500" id="phone-error">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select 
                  value={formData.district} 
                  onValueChange={(value) => handleInputChange('district', value)}
                >
                  <SelectTrigger aria-invalid={!!errors.district}>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {ugandanDistricts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && (
                  <p className="text-sm text-red-500">{errors.district}</p>
                )}
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
                <Select 
                  value={formData.crop} 
                  onValueChange={(value) => handleInputChange('crop', value)}
                >
                  <SelectTrigger aria-invalid={!!errors.crop}>
                    <SelectValue placeholder="Select primary crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.crop && (
                  <p className="text-sm text-red-500">{errors.crop}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select 
                  value={formData.language} 
                  onValueChange={(value) => handleInputChange('language', value as FormData['language'])}
                >
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

            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              <User className="h-4 w-4 mr-2" />
              {isLoading ? 'Registering...' : 'Register Farmer'}
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
            {farmers.map((farmer) => (
              <div key={farmer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
                  <Badge variant="outline" className={farmer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {farmer.status}
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
