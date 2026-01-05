'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, TrendingUp, Wind, Droplets, Thermometer, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAQICategory } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import PollutionMap from '@/components/map/pollution-map'
import toast from 'react-hot-toast'

interface PollutionData {
  location: string
  latitude: number
  longitude: number
  timestamp: string
  pm25: number
  pm10: number
  no2: number
  o3: number
  co: number
  temperature: number
  humidity: number
  aqi: number
}

interface HistoricalData {
  timestamp: string
  aqi: number
  pm25: number
  pm10: number
  no2: number
}

export default function InsightsPage() {
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [pollutionData, setPollutionData] = useState<PollutionData | null>(null)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [showMap, setShowMap] = useState(false)

  // Auto-detect location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPollutionByCoords(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to default location
          setLocation('New Delhi')
          fetchPollution('New Delhi')
        }
      )
    }
  }, [])

  const fetchPollutionByCoords = async (lat: number, lon: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pollution/current?lat=${lat}&lon=${lon}`
      )
      const data = await response.json()
      setPollutionData(data)
      setLocation(data.location)
      fetchHistoricalData(data.location)
    } catch (error) {
      toast.error('Failed to fetch pollution data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPollution = async (loc: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pollution/current?location=${encodeURIComponent(loc)}`
      )
      const data = await response.json()
      setPollutionData(data)
      fetchHistoricalData(loc)
    } catch (error) {
      toast.error('Failed to fetch pollution data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHistoricalData = async (loc: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pollution/history?location=${encodeURIComponent(loc)}&days=7`
      )
      const data = await response.json()
      setHistoricalData(data)
    } catch (error) {
      console.error('Failed to fetch historical data:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      fetchPollution(location.trim())
    }
  }

  const aqiCategory = pollutionData ? getAQICategory(pollutionData.aqi) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-veridian-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Air Quality Insights</h1>
            <Button
              variant="outline"
              onClick={() => setShowMap(!showMap)}
            >
              <MapPin className="mr-2 h-4 w-4" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter city name (e.g., New Delhi, Mumbai, Bangalore)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading} className="gradient-veridian">
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Map View */}
        {showMap && pollutionData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pollution Map</CardTitle>
              <CardDescription>Real-time air quality monitoring across regions</CardDescription>
            </CardHeader>
            <CardContent>
              <PollutionMap
                center={[pollutionData.latitude, pollutionData.longitude]}
                zoom={12}
              />
            </CardContent>
          </Card>
        )}

        {/* Current AQI */}
        {pollutionData && aqiCategory && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* AQI Card */}
            <Card className="col-span-full md:col-span-2" style={{ borderLeft: `4px solid ${aqiCategory.color}` }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Current Air Quality Index
                </CardTitle>
                <CardDescription>{pollutionData.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-bold" style={{ color: aqiCategory.color }}>
                      {Math.round(pollutionData.aqi)}
                    </div>
                    <div className="text-lg font-semibold mt-2" style={{ color: aqiCategory.color }}>
                      {aqiCategory.label}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {aqiCategory.description}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Updated: {new Date(pollutionData.timestamp).toLocaleString()}</div>
                    <div className="mt-2">
                      <MapPin className="inline h-3 w-3" /> {pollutionData.latitude.toFixed(4)}, {pollutionData.longitude.toFixed(4)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Temperature Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pollutionData.temperature}°C</div>
                <p className="text-xs text-muted-foreground">Current temperature</p>
              </CardContent>
            </Card>

            {/* Humidity Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pollutionData.humidity}%</div>
                <p className="text-xs text-muted-foreground">Relative humidity</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pollutant Breakdown */}
        {pollutionData && (
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Pollutants Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Pollutant Levels</CardTitle>
                <CardDescription>Concentration of major air pollutants (μg/m³)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: 'PM2.5', value: pollutionData.pm25, limit: 60 },
                      { name: 'PM10', value: pollutionData.pm10, limit: 100 },
                      { name: 'NO₂', value: pollutionData.no2, limit: 80 },
                      { name: 'O₃', value: pollutionData.o3, limit: 100 },
                      { name: 'CO', value: pollutionData.co, limit: 2000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#22c55e" name="Current Level" />
                    <Bar dataKey="limit" fill="#ef4444" name="Safe Limit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Pollutant Info */}
            <Card>
              <CardHeader>
                <CardTitle>Pollutant Details</CardTitle>
                <CardDescription>Individual pollutant concentrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PollutantRow
                    name="PM2.5"
                    value={pollutionData.pm25}
                    unit="μg/m³"
                    limit={60}
                    description="Fine particulate matter"
                  />
                  <PollutantRow
                    name="PM10"
                    value={pollutionData.pm10}
                    unit="μg/m³"
                    limit={100}
                    description="Coarse particulate matter"
                  />
                  <PollutantRow
                    name="NO₂"
                    value={pollutionData.no2}
                    unit="μg/m³"
                    limit={80}
                    description="Nitrogen dioxide"
                  />
                  <PollutantRow
                    name="O₃"
                    value={pollutionData.o3}
                    unit="μg/m³"
                    limit={100}
                    description="Ground-level ozone"
                  />
                  <PollutantRow
                    name="CO"
                    value={pollutionData.co}
                    unit="μg/m³"
                    limit={2000}
                    description="Carbon monoxide"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Historical Chart */}
        {historicalData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                7-Day Trend
              </CardTitle>
              <CardDescription>Historical air quality data for {pollutionData?.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="aqi" stroke="#22c55e" name="AQI" strokeWidth={2} />
                  <Line type="monotone" dataKey="pm25" stroke="#3b82f6" name="PM2.5" />
                  <Line type="monotone" dataKey="pm10" stroke="#f59e0b" name="PM10" />
                  <Line type="monotone" dataKey="no2" stroke="#ef4444" name="NO₂" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Helper component for pollutant rows
function PollutantRow({
  name,
  value,
  unit,
  limit,
  description,
}: {
  name: string
  value: number
  unit: string
  limit: number
  description: string
}) {
  const percentage = (value / limit) * 100
  const isHigh = value > limit

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="font-medium">{name}</span>
          <span className="text-muted-foreground ml-2">- {description}</span>
        </div>
        <span className={isHigh ? 'text-red-600 font-semibold' : 'text-green-600'}>
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${isHigh ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">
        Safe limit: {limit} {unit}
      </div>
    </div>
  )
}
