'use client'

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'

// Fix for default marker icon
const createCustomIcon = (color: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

interface PollutionMapProps {
  center?: [number, number]
  zoom?: number
  markers?: Array<{
    id: string
    position: [number, number]
    aqi: number
    location: string
  }>
}

export default function PollutionMap({
  center = [28.6139, 77.2090], // Default: New Delhi
  zoom = 12,
  markers = [],
}: PollutionMapProps) {
  const [mapData, setMapData] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Fetch pollution data for map
    const fetchMapData = async () => {
      try {
        // Calculate bounding box around center
        const latDelta = 0.5
        const lonDelta = 0.5
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pollution/map?` +
          `min_lat=${center[0] - latDelta}&max_lat=${center[0] + latDelta}&` +
          `min_lon=${center[1] - lonDelta}&max_lon=${center[1] + lonDelta}`
        )
        
        const data = await response.json()
        setMapData(data.points || [])
      } catch (error) {
        console.error('Failed to fetch map data:', error)
      }
    }

    fetchMapData()
  }, [center])

  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return '#22c55e' // Good - Green
    if (aqi <= 100) return '#facc15' // Moderate - Yellow
    if (aqi <= 150) return '#f97316' // Unhealthy for Sensitive Groups - Orange
    if (aqi <= 200) return '#ef4444' // Unhealthy - Red
    if (aqi <= 300) return '#a855f7' // Very Unhealthy - Purple
    return '#7f1d1d' // Hazardous - Maroon
  }

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
    if (aqi <= 200) return 'Unhealthy'
    if (aqi <= 300) return 'Very Unhealthy'
    return 'Hazardous'
  }

  // Only render map on client side
  if (!isClient) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render custom markers if provided */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={createCustomIcon(getMarkerColor(marker.aqi))}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-lg">{marker.location}</h3>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">AQI: </span>
                <span className="font-bold text-lg" style={{ color: getMarkerColor(marker.aqi) }}>
                  {marker.aqi}
                </span>
              </div>
              <div className="text-sm" style={{ color: getMarkerColor(marker.aqi) }}>
                {getAQILabel(marker.aqi)}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render map data points */}
      {mapData.map((point, index) => (
        <Circle
          key={`point-${index}`}
          center={[point.latitude, point.longitude]}
          radius={1000}
          pathOptions={{
            fillColor: getMarkerColor(point.aqi),
            fillOpacity: 0.4,
            color: getMarkerColor(point.aqi),
            weight: 2,
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-lg">{point.location}</h3>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">AQI: </span>
                <span className="font-bold text-lg" style={{ color: getMarkerColor(point.aqi) }}>
                  {Math.round(point.aqi)}
                </span>
              </div>
              <div className="text-sm mb-2" style={{ color: getMarkerColor(point.aqi) }}>
                {getAQILabel(point.aqi)}
              </div>
              <div className="text-xs space-y-1">
                <div>PM2.5: {point.pm25?.toFixed(1)} μg/m³</div>
                <div>PM10: {point.pm10?.toFixed(1)} μg/m³</div>
                <div>NO₂: {point.no2?.toFixed(1)} μg/m³</div>
              </div>
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  )
}
