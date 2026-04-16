/**
 * Menu Board Component
 * Digital menu display for showing featured items and weather information
 * Designed for non-interactive display screens in restaurant environments
 */

// Import React hooks for state management and side effects
import { useState, useEffect } from 'react';

// Import weather service functions for real-time weather data
import { getCurrentWeather, getWeatherEmoji } from '../services/weatherService';

// Featured menu items to display prominently
// In a real application, this would come from an API or database
const featuredItems = [
  { name: 'Brown Sugar Boba', description: 'Our signature slow-cooked tapioca with organic milk.', price: '$5.50' },
  { name: 'Matcha Latte', description: 'Premium ceremonial grade matcha.', price: '$5.00' },
  { name: 'Taro Slush', description: 'Ice blended sweet taro root.', price: '$5.25' },
];

/**
 * MenuBoard component - digital menu display
 * Shows featured menu items with real-time weather information
 * Optimized for large display screens with high contrast design
 */
export default function MenuBoard() {
  // State to manage weather data and loading status
  const [weather, setWeather] = useState({
    temperature: 75,
    description: 'Clear',
    location: 'College Station',
    icon: '01d',
    loading: true,
    isRealData: false
  });

  // useEffect hook to fetch weather data on component mount
  useEffect(() => {
    // Async function to fetch weather data from the weather service
    const fetchWeather = async () => {
      try {
        // Get current weather data
        const weatherData = await getCurrentWeather();
        // Update weather state with fetched data and set loading to false
        setWeather({ ...weatherData, loading: false });
      } catch (error) {
        // Log error if weather fetch fails
        console.error('Failed to fetch weather:', error);
        // Set loading to false even on error to show fallback data
        setWeather(prev => ({ ...prev, loading: false }));
      }
    };

    // Initial weather fetch
    fetchWeather();
    
    // Set up interval to refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs only on mount

  return (
    // Main container with dark theme and full viewport height
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header section with menu title and weather display */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #aa3bff', paddingBottom: '20px' }}>
        {/* Large menu title */}
        <h1 style={{ fontSize: '48px', margin: 0 }}>Menu</h1>
        {/* Weather information display */}
        <div style={{ fontSize: '24px', color: '#aaa' }}>
          {weather.loading ? (
            // Show loading message while fetching weather
            'Loading weather...'
          ) : (
            // Display weather with emoji, temperature, and location
            <span>
              {getWeatherEmoji(weather.icon)} {weather.temperature}°F {weather.location}
              {/* Show API status indicator if using mock data */}
              {!weather.isRealData && <span style={{ color: '#ff6b6b', fontSize: '14px', marginLeft: '8px' }}>(API inactive)</span>}
            </span>
          )}
        </div>
      </header>
      
      {/* Main content area with featured menu items */}
      <main style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {featuredItems.map((item, idx) => (
          // Individual menu item card with dark background
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: '30px', borderRadius: '16px' }}>
            {/* Item information section */}
            <div>
              {/* Item name with brand color */}
              <h2 style={{ fontSize: '36px', margin: '0 0 10px 0', color: '#aa3bff' }}>{item.name}</h2>
              {/* Item description in lighter color */}
              <p style={{ fontSize: '20px', color: '#ccc', margin: 0 }}>{item.description}</p>
            </div>
            {/* Large price display */}
            <span style={{ fontSize: '42px', fontWeight: 'bold' }}>{item.price}</span>
          </div>
        ))}
      </main>
    </div>
  );
}