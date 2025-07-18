'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, CloudSnow, MapPin, Thermometer, Wind, Droplets, Eye } from 'lucide-react'

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  feelsLike: number
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock weather data for demonstration
  const mockWeatherData: WeatherData[] = [
    {
      location: "New York, NY",
      temperature: 22,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      feelsLike: 25
    },
    {
      location: "London, UK",
      temperature: 18,
      condition: "Rainy",
      humidity: 80,
      windSpeed: 15,
      visibility: 8,
      feelsLike: 16
    },
    {
      location: "Tokyo, JP",
      temperature: 28,
      condition: "Sunny",
      humidity: 55,
      windSpeed: 8,
      visibility: 12,
      feelsLike: 30
    },
    {
      location: "Sydney, AU",
      temperature: 24,
      condition: "Cloudy",
      humidity: 70,
      windSpeed: 10,
      visibility: 15,
      feelsLike: 26
    }
  ]

  useEffect(() => {
    // Simulate API call
    const fetchWeather = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Select random weather data
        const randomWeather = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)]
        setWeatherData(randomWeather)
        setError(null)
      } catch (err) {
        setError('Failed to fetch weather data')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-16 w-16 text-yellow-500" />
      case 'rainy':
        return <CloudRain className="h-16 w-16 text-blue-500" />
      case 'snowy':
        return <CloudSnow className="h-16 w-16 text-blue-300" />
      case 'cloudy':
      case 'partly cloudy':
      default:
        return <Cloud className="h-16 w-16 text-gray-500" />
    }
  }

  const refreshWeather = () => {
    setLoading(true)
    setTimeout(() => {
      const randomWeather = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)]
      setWeatherData(randomWeather)
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading weather data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-red-500 to-red-600">
        <div className="text-center">
          <p className="text-white text-xl mb-4">{error}</p>
          <button
            onClick={refreshWeather}
            className="bg-white text-red-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather App</h1>
          <p className="text-blue-100">Current weather conditions</p>
        </div>

        {weatherData && (
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-white mr-2" />
                <h2 className="text-2xl font-semibold text-white">{weatherData.location}</h2>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                {getWeatherIcon(weatherData.condition)}
              </div>
              
              <div className="mb-4">
                <div className="text-6xl font-bold text-white mb-2">
                  {weatherData.temperature}°C
                </div>
                <p className="text-blue-100 text-xl">{weatherData.condition}</p>
                <p className="text-blue-100 text-sm mt-2">
                  Feels like {weatherData.feelsLike}°C
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <Thermometer className="h-8 w-8 text-white mx-auto mb-3" />
                <p className="text-blue-100 text-sm">Feels Like</p>
                <p className="text-white text-2xl font-bold">{weatherData.feelsLike}°C</p>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <Droplets className="h-8 w-8 text-white mx-auto mb-3" />
                <p className="text-blue-100 text-sm">Humidity</p>
                <p className="text-white text-2xl font-bold">{weatherData.humidity}%</p>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <Wind className="h-8 w-8 text-white mx-auto mb-3" />
                <p className="text-blue-100 text-sm">Wind Speed</p>
                <p className="text-white text-2xl font-bold">{weatherData.windSpeed} km/h</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <Eye className="h-8 w-8 text-white mx-auto mb-3" />
                <p className="text-blue-100 text-sm">Visibility</p>
                <p className="text-white text-2xl font-bold">{weatherData.visibility} km</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={refreshWeather}
                className="bg-white text-blue-500 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              >
                Refresh Weather
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-blue-100 text-sm">
            Weather data updates automatically every hour
          </p>
        </div>
      </div>
    </div>
  )
}