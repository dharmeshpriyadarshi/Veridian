'use client'

import { useState, useEffect } from 'react'
import { MapPin, Trees, TrendingDown, Leaf, DollarSign, Calendar, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapContainer, TileLayer, Marker, Rectangle, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import toast from 'react-hot-toast'

// Custom tree icon
const treeIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" width="24" height="24">
      <path d="M16.5,11H15V9.5c0-2.21-1.79-4-4-4s-4,1.79-4,4V11H5.5C4.67,11,4,11.67,4,12.5S4.67,14,5.5,14H7v7h2v-7h6v7h2v-7h1.5 c0.83,0,1.5-0.67,1.5-1.5S17.33,11,16.5,11z"/>
    </svg>
  `)}`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

interface SimulationResult {
  location: string
  currentAQI: number
  pollutionIndex: number
  areaKm2: number
  treesNeeded: number
  projectedReduction: number
  projectedAQI: number
  treePlacements: Array<{ latitude: number; longitude: number }>
}

interface Recommendation {
  treeSpecies: string[]
  estimatedCost: number
  implementationTimeline: string
  maintenanceCost: number
  co2Reduction: number
}

// Map component to select area
function AreaSelector({
  onAreaSelect,
}: {
  onAreaSelect: (bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }) => void
}) {
  const [bounds, setBounds] = useState<[[number, number], [number, number]] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null)

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (!isDrawing) {
          setStartPoint([e.latlng.lat, e.latlng.lng])
          setIsDrawing(true)
        } else {
          const newBounds: [[number, number], [number, number]] = [
            startPoint!,
            [e.latlng.lat, e.latlng.lng],
          ]
          setBounds(newBounds)
          setIsDrawing(false)

          onAreaSelect({
            minLat: Math.min(startPoint![0], e.latlng.lat),
            maxLat: Math.max(startPoint![0], e.latlng.lat),
            minLon: Math.min(startPoint![1], e.latlng.lng),
            maxLon: Math.max(startPoint![1], e.latlng.lng),
          })
        }
      },
    })
    return null
  }

  return (
    <>
      <MapClickHandler />
      {bounds && <Rectangle bounds={bounds} pathOptions={{ color: '#22c55e', weight: 2 }} />}
    </>
  )
}

export default function SimulationPage() {
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState<[number, number]>([28.6139, 77.209])
  const [selectedArea, setSelectedArea] = useState<{ minLat: number; maxLat: number; minLon: number; maxLon: number } | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    pm25: '',
    pm10: '',
    no2: '',
    co: '',
    temperature: '',
  })

  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAreaSelect = (bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }) => {
    setSelectedArea(bounds)
    
    // Calculate area in km²
    const R = 6371 // Earth's radius in km
    const latDiff = (bounds.maxLat - bounds.minLat) * (Math.PI / 180)
    const lonDiff = (bounds.maxLon - bounds.minLon) * (Math.PI / 180)
    const avgLat = (bounds.minLat + bounds.maxLat) / 2 * (Math.PI / 180)
    
    const area = R * R * latDiff * lonDiff * Math.cos(avgLat)
    
    toast.success(`Area selected: ${area.toFixed(2)} km²`)
  }

  const handleSimulate = async () => {
    if (!selectedArea) {
      toast.error('Please select an area on the map first')
      return
    }

    if (!formData.pm25 || !formData.pm10 || !formData.no2 || !formData.co || !formData.temperature) {
      toast.error('Please fill in all pollution values')
      return
    }

    setLoading(true)

    try {
      // Calculate area
      const R = 6371
      const latDiff = (selectedArea.maxLat - selectedArea.minLat) * (Math.PI / 180)
      const lonDiff = (selectedArea.maxLon - selectedArea.minLon) * (Math.PI / 180)
      const avgLat = (selectedArea.minLat + selectedArea.maxLat) / 2 * (Math.PI / 180)
      const areaKm2 = R * R * latDiff * lonDiff * Math.cos(avgLat)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/simulation/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location || 'Selected Area',
          latitude: (selectedArea.minLat + selectedArea.maxLat) / 2,
          longitude: (selectedArea.minLon + selectedArea.maxLon) / 2,
          pm25: parseFloat(formData.pm25),
          pm10: parseFloat(formData.pm10),
          no2: parseFloat(formData.no2),
          co: parseFloat(formData.co),
          temperature: parseFloat(formData.temperature),
          areaKm2: areaKm2,
        }),
      })

      const data = await response.json()
      setSimulationResult(data)

      // Fetch recommendations
      const recResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/simulation/recommendations?location=${encodeURIComponent(location || 'Selected Area')}`
      )
      const recData = await recResponse.json()
      setRecommendations(recData)

      toast.success('Simulation completed successfully!')
    } catch (error) {
      toast.error('Failed to run simulation')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!isClient) {
    return <div className="min-h-screen bg-gradient-to-br from-veridian-50 to-blue-50 flex items-center justify-center">
      <p>Loading...</p>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-veridian-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Bio-Urban Tree Simulation</h1>
          <p className="text-muted-foreground mt-1">Calculate optimal tree placement for pollution reduction</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            {/* Location Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Step 1: Location
                </CardTitle>
                <CardDescription>Enter the location name</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="e.g., Central Park, New Delhi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Area Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Step 2: Select Area
                </CardTitle>
                <CardDescription>Click two points on the map to draw a rectangle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-lg overflow-hidden border">
                  <MapContainer
                    center={coordinates}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <AreaSelector onAreaSelect={handleAreaSelect} />
                  </MapContainer>
                </div>
                {selectedArea && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✓ Area selected! Click "Run Simulation" below.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pollution Data Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Step 3: Current Pollution Data
                </CardTitle>
                <CardDescription>Enter current pollution levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">PM2.5 (μg/m³)</label>
                    <Input
                      name="pm25"
                      type="number"
                      placeholder="e.g., 85"
                      value={formData.pm25}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">PM10 (μg/m³)</label>
                    <Input
                      name="pm10"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.pm10}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">NO₂ (μg/m³)</label>
                    <Input
                      name="no2"
                      type="number"
                      placeholder="e.g., 45"
                      value={formData.no2}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CO (μg/m³)</label>
                    <Input
                      name="co"
                      type="number"
                      placeholder="e.g., 850"
                      value={formData.co}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Temperature (°C)</label>
                    <Input
                      name="temperature"
                      type="number"
                      placeholder="e.g., 28"
                      value={formData.temperature}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSimulate}
                  disabled={loading || !selectedArea}
                  className="w-full mt-6 gradient-veridian"
                >
                  {loading ? 'Running Simulation...' : 'Run Simulation'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {simulationResult && (
              <>
                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Trees Needed</CardTitle>
                      <Trees className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-veridian-600">
                        {simulationResult.treesNeeded.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Bio-urban trees required</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pollution Reduction</CardTitle>
                      <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {simulationResult.projectedReduction.toFixed(1)}%
                      </div>
                      <p className="text-xs text-muted-foreground">Expected improvement</p>
                    </CardContent>
                  </Card>
                </div>

                {/* AQI Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Air Quality Improvement</CardTitle>
                    <CardDescription>Before and after simulation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Current AQI</p>
                          <p className="text-3xl font-bold text-red-600">{Math.round(simulationResult.currentAQI)}</p>
                        </div>
                        <div className="text-sm text-red-600">Unhealthy</div>
                      </div>

                      <div className="flex items-center justify-center">
                        <TrendingDown className="h-6 w-6 text-green-600" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Projected AQI</p>
                          <p className="text-3xl font-bold text-green-600">{Math.round(simulationResult.projectedAQI)}</p>
                        </div>
                        <div className="text-sm text-green-600">Improved!</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tree Placement Map */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      Tree Placement Visualization
                    </CardTitle>
                    <CardDescription>Optimal locations for {simulationResult.treesNeeded} trees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] rounded-lg overflow-hidden border">
                      <MapContainer
                        center={[simulationResult.treePlacements[0]?.latitude || coordinates[0], simulationResult.treePlacements[0]?.longitude || coordinates[1]]}
                        zoom={14}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {simulationResult.treePlacements.map((tree, index) => (
                          <Marker
                            key={index}
                            position={[tree.latitude, tree.longitude]}
                            icon={treeIcon}
                          />
                        ))}
                      </MapContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                {recommendations && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Implementation Recommendations</CardTitle>
                      <CardDescription>Suggested tree species and cost estimates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Recommended Tree Species:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendations.treeSpecies.map((species, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-veridian-100 text-veridian-700 rounded-full text-sm"
                            >
                              {species}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Estimated Cost</p>
                            <p className="text-xl font-bold text-blue-600">
                              ${recommendations.estimatedCost.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Timeline</p>
                            <p className="text-xl font-bold text-purple-600">
                              {recommendations.implementationTimeline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                          Annual CO₂ Reduction: <span className="font-bold">{recommendations.co2Reduction.toLocaleString()} kg</span>
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          Annual maintenance cost: ${recommendations.maintenanceCost.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!simulationResult && (
              <Card className="h-full flex items-center justify-center p-12">
                <div className="text-center text-muted-foreground">
                  <Trees className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Run a simulation to see results here</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
