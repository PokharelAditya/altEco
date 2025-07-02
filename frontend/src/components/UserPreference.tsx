
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { 
  Leaf, 
  Recycle, 
  Globe, 
  Heart, 
  MapPin, 
  CheckCircle, 
  Package, 
  BookOpen, 
  ShoppingBag,
  Save,
  ArrowRight
} from 'lucide-react';

const UserPreference = () => {
  const [preferences, setPreferences] = useState({
    materialSafety: [],
    wasteImpact: [],
    carbonImpact: [],
    animalEthics: [],
    sourcing: [],
    certifications: [],
    productTypes: [],
    distancePreference: '',
    packaging: [],
    educationEngagement: false
  });
  const {user,loading} = useAuthContext()

  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleMultiSelect = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSingleSelect = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/sustainability-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences)
      });
      
      const data = await response.json();
      console.log(data);
      if (data.status) {
        setSaved(true);
        console.log('Preferences saved successfully:', data);
        setTimeout(() => setSaved(false), 3000);
      } else {
        throw new Error(data.message || 'Failed to save preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const PreferenceSection = ({ title, icon: Icon, children, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl mr-3">
          <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );

  const MultiSelectButton = ({ value, selected, onClick, children }) => (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`inline-flex items-center px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
        selected
          ? 'bg-green-600 text-white border-green-600 shadow-md'
          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
      }`}
    >
      {selected && <CheckCircle className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
            <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sustainability Preferences
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Help us personalize your experience by sharing your sustainability values and preferences. 
            We'll use this to recommend products and content that align with your values.
          </p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <p className="text-green-800 dark:text-green-200 font-medium">
                Your preferences have been saved successfully!
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Material Safety */}
          <PreferenceSection 
            title="Material Safety" 
            icon={Leaf}
            description="What materials do you prefer to avoid or prioritize?"
          >
            <div className="flex flex-wrap gap-3">
              {['Plastic-free', 'Biodegradable', 'Non-toxic', 'BPA-free', 'Phthalate-free'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.materialSafety.includes(option)}
                  onClick={(value) => handleMultiSelect('materialSafety', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Waste Impact */}
          <PreferenceSection 
            title="Waste Impact" 
            icon={Recycle}
            description="How do you prefer products to handle end-of-life disposal?"
          >
            <div className="flex flex-wrap gap-3">
              {['Recyclable', 'Compostable', 'Refillable', 'Reusable', 'Zero-waste'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.wasteImpact.includes(option)}
                  onClick={(value) => handleMultiSelect('wasteImpact', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Carbon Impact */}
          <PreferenceSection 
            title="Carbon Impact" 
            icon={Globe}
            description="What carbon footprint considerations matter to you?"
          >
            <div className="flex flex-wrap gap-3">
              {['Low carbon footprint', 'Carbon-neutral', 'Carbon-negative', 'Renewable energy made'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.carbonImpact.includes(option)}
                  onClick={(value) => handleMultiSelect('carbonImpact', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Animal Ethics */}
          <PreferenceSection 
            title="Animal Ethics" 
            icon={Heart}
            description="What are your preferences regarding animal welfare?"
          >
            <div className="flex flex-wrap gap-3">
              {['Cruelty-free', 'Vegan', 'Not tested on animals', 'Ethically sourced animal products'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.animalEthics.includes(option)}
                  onClick={(value) => handleMultiSelect('animalEthics', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Sourcing */}
          <PreferenceSection 
            title="Sourcing" 
            icon={MapPin}
            description="How do you prefer products to be sourced?"
          >
            <div className="flex flex-wrap gap-3">
              {['Locally made', 'Ethically sourced', 'Fair trade', 'Small business', 'Women-owned'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.sourcing.includes(option)}
                  onClick={(value) => handleMultiSelect('sourcing', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Certifications */}
          <PreferenceSection 
            title="Certifications" 
            icon={CheckCircle}
            description="Which certifications do you trust and value?"
          >
            <div className="flex flex-wrap gap-3">
              {['USDA Organic', 'GOTS', 'FSC', 'B-Corp', 'Cradle to Cradle', 'Energy Star'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.certifications.includes(option)}
                  onClick={(value) => handleMultiSelect('certifications', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Product Types */}
          <PreferenceSection 
            title="Product Types" 
            icon={ShoppingBag}
            description="What types of products are you most interested in?"
          >
            <div className="flex flex-wrap gap-3">
              {['Food', 'Clothes', 'Tech', 'Home', 'Skincare', 'Cleaning', 'Baby products'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.productTypes.includes(option)}
                  onClick={(value) => handleMultiSelect('productTypes', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Distance Preference */}
          <PreferenceSection 
            title="Distance Preference" 
            icon={MapPin}
            description="How far are you willing to source products from?"
          >
            <div className="space-y-3">
              {[
                { value: 'local', label: 'Local (within 50 miles)' },
                { value: 'regional', label: 'Regional (within 200 miles)' },
                { value: 'national', label: 'National (within country)' },
                { value: 'global-offset', label: 'Global (with carbon offset)' },
                { value: 'global', label: 'Global (no restrictions)' }
              ].map(option => (
                <div key={option.value} className="flex items-center cursor-pointer" onClick={() => handleSingleSelect('distancePreference', option.value)}>
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    preferences.distancePreference === option.value 
                      ? 'border-green-600 bg-green-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {preferences.distancePreference === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                </div>
              ))}
            </div>
          </PreferenceSection>

          {/* Packaging */}
          <PreferenceSection 
            title="Packaging" 
            icon={Package}
            description="What packaging preferences do you have?"
          >
            <div className="flex flex-wrap gap-3">
              {['Minimal packaging', 'Plastic-free packaging', 'Recycled packaging', 'Reusable packaging'].map(option => (
                <MultiSelectButton
                  key={option}
                  value={option}
                  selected={preferences.packaging.includes(option)}
                  onClick={(value) => handleMultiSelect('packaging', value)}
                >
                  {option}
                </MultiSelectButton>
              ))}
            </div>
          </PreferenceSection>

          {/* Education Engagement */}
          <PreferenceSection 
            title="Education & Engagement" 
            icon={BookOpen}
            description="Would you like to receive educational content about sustainability?"
          >
            <div className="flex items-center cursor-pointer" onClick={() => handleToggle('educationEngagement')}>
              <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                preferences.educationEngagement 
                  ? 'border-green-600 bg-green-600' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {preferences.educationEngagement && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Yes, show me tips and articles matching my preferences
              </span>
            </div>
          </PreferenceSection>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving preferences...
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Preferences
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreference;