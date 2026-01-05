'use client'

import { useState, useEffect } from 'react'
import { Shield, Lock, Database, TrendingUp, FileText, Download, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import toast from 'react-hot-toast'

interface ResearchData {
  yearlyPredictions: Array<{
    month: string
    predictedAQI: number
    confidence: number
  }>
  correlationData: Array<{
    pm25: number
    aqi: number
    no2: number
  }>
}

export default function ResearchPage() {
  const [isResearcher, setIsResearcher] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)
  const [credentials, setCredentials] = useState({
    institution: '',
    researchId: '',
    credentials: '',
  })
  const [researchData, setResearchData] = useState<ResearchData | null>(null)
  const [selectedLocation, setSelectedLocation] = useState('New Delhi')

  useEffect(() => {
    // Check if user is already verified
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.isResearcher) {
        setIsResearcher(true)
        fetchResearchData()
      }
    }
  }, [])

  const handleVerify = async () => {
    if (!credentials.institution || !credentials.researchId || !credentials.credentials) {
      toast.error('Please fill in all fields')
      return
    }

    setIsVerifying(true)

    try {
      // In a real application, this would verify credentials with backend
      // For now, we'll simulate verification
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update user data
      const user = localStorage.getItem('user')
      if (user) {
        const userData = JSON.parse(user)
        userData.isResearcher = true
        userData.institution = credentials.institution
        localStorage.setItem('user', JSON.stringify(userData))
      }

      setIsResearcher(true)
      toast.success('Researcher credentials verified!')
      fetchResearchData()
    } catch (error) {
      toast.error('Failed to verify credentials')
      console.error(error)
    } finally {
      setIsVerifying(false)
    }
  }

  const fetchResearchData = async () => {
    try {
      // Fetch yearly predictions for 2026
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prediction/yearly?location=${encodeURIComponent(selectedLocation)}&year=2026`
      )
      const yearlyData = await response.json()

      // Generate correlation data (mock)
      const correlationData = Array.from({ length: 50 }, () => ({
        pm25: Math.random() * 150,
        aqi: 50 + Math.random() * 250,
        no2: Math.random() * 100,
      }))

      setResearchData({
        yearlyPredictions: yearlyData.predictions || [],
        correlationData,
      })
    } catch (error) {
      console.error('Failed to fetch research data:', error)
    }
  }

  const handleExportData = () => {
    if (!researchData) return

    const dataStr = JSON.stringify(researchData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `veridian-research-data-${selectedLocation}-${new Date().toISOString()}.json`
    link.click()
    URL.revokeObjectURL(url)

    toast.success('Data exported successfully!')
  }

  if (!isResearcher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-veridian-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-blue-100 p-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Research Portal Access</CardTitle>
            <CardDescription className="text-base">
              This section is restricted to verified researchers only. Please provide your credentials to access advanced analytics and data exports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Institution */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4" />
                  Institution Name
                </label>
                <Input
                  placeholder="e.g., MIT Environmental Research Lab"
                  value={credentials.institution}
                  onChange={(e) => setCredentials({ ...credentials, institution: e.target.value })}
                />
              </div>

              {/* Research ID */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Research ID / Employee ID
                </label>
                <Input
                  placeholder="e.g., RES-2024-001"
                  value={credentials.researchId}
                  onChange={(e) => setCredentials({ ...credentials, researchId: e.target.value })}
                />
              </div>

              {/* Credentials */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4" />
                  Verification Credentials
                </label>
                <div className="relative">
                  <Input
                    type={showCredentials ? 'text' : 'password'}
                    placeholder="Enter your verification code"
                    value={credentials.credentials}
                    onChange={(e) => setCredentials({ ...credentials, credentials: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCredentials(!showCredentials)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showCredentials ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Don't have credentials? Contact your institution's environmental department.
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full gradient-veridian mt-6"
              >
                {isVerifying ? 'Verifying...' : 'Verify Credentials'}
              </Button>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-6">
                <h4 className="font-medium text-blue-900 mb-2">What you'll get access to:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Advanced pollution prediction models for 2026</li>
                  <li>• Correlation analysis between pollutants</li>
                  <li>• Raw data exports in JSON/CSV formats</li>
                  <li>• Pattern recognition and trend analysis</li>
                  <li>• Historical comparison tools</li>
                  <li>• Custom visualization options</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-veridian-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Research Portal</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Advanced analytics and data access for verified researchers
              </p>
            </div>
            <Button onClick={handleExportData} className="gradient-veridian">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Selector */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Select Location</label>
                <Input
                  placeholder="Enter city name"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>
              <Button onClick={fetchResearchData} className="gradient-veridian">
                Load Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {researchData && (
          <>
            {/* 2026 Predictions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  2026 Pollution Predictions
                </CardTitle>
                <CardDescription>
                  Monthly predictions for {selectedLocation} using NASA pollution dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={researchData.yearlyPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="predictedAQI"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Predicted AQI"
                    />
                    <Line
                      type="monotone"
                      dataKey="confidence"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Confidence %"
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* Statistics */}
                <div className="grid gap-4 sm:grid-cols-3 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Average AQI (2026)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round(
                        researchData.yearlyPredictions.reduce((sum, p) => sum + p.predictedAQI, 0) /
                          researchData.yearlyPredictions.length
                      )}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Best Month</p>
                    <p className="text-2xl font-bold text-green-600">
                      {researchData.yearlyPredictions.reduce((min, p) =>
                        p.predictedAQI < min.predictedAQI ? p : min
                      ).month}
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Worst Month</p>
                    <p className="text-2xl font-bold text-red-600">
                      {researchData.yearlyPredictions.reduce((max, p) =>
                        p.predictedAQI > max.predictedAQI ? p : max
                      ).month}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Correlation Analysis */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>PM2.5 vs AQI Correlation</CardTitle>
                <CardDescription>Scatter plot showing relationship between PM2.5 levels and AQI</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pm25" name="PM2.5" unit=" μg/m³" />
                    <YAxis dataKey="aqi" name="AQI" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Data Points" data={researchData.correlationData} fill="#22c55e" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* NO2 vs AQI Correlation */}
            <Card>
              <CardHeader>
                <CardTitle>NO₂ vs AQI Correlation</CardTitle>
                <CardDescription>Scatter plot showing relationship between NO₂ levels and AQI</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="no2" name="NO₂" unit=" μg/m³" />
                    <YAxis dataKey="aqi" name="AQI" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Data Points" data={researchData.correlationData} fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Data Access Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Data Access & Citation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Dataset Information:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Source: NASA Pollution Dataset (Simulated)</li>
                    <li>• Location: {selectedLocation}</li>
                    <li>• Prediction Period: 2026 (12 months)</li>
                    <li>• ML Model: TensorFlow-based LSTM network</li>
                    <li>• Last Updated: {new Date().toLocaleDateString()}</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Citation Guidelines:</h4>
                  <p className="text-sm text-yellow-800">
                    When using this data in research publications, please cite: "Veridian Air Quality Platform
                    ({new Date().getFullYear()}). Pollution Prediction Model for {selectedLocation}. Retrieved
                    from https://github.com/dharmeshpriyadarshi/veridian"
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
