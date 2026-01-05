'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Lock, Settings, Bell, Globe, Palette, Save, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  })
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    language: 'en',
    theme: 'light',
    defaultLocation: '',
    aqiUnit: 'standard',
  })

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setProfileData({
        name: parsed.name || '',
        email: parsed.email || '',
      })
    } else {
      router.push('/signin')
    }
  }, [router])

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // In a real app, this would call the backend API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update localStorage
      const updatedUser = { ...user, ...profileData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)

      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSavePreferences = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage
      localStorage.setItem('preferences', JSON.stringify(preferences))

      toast.success('Preferences saved successfully!')
    } catch (error) {
      toast.error('Failed to save preferences')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-veridian-50 to-blue-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-veridian-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              {/* Researcher Badge */}
              {user.isResearcher && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Verified Researcher</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Institution: {user.institution || 'Not specified'}
                  </p>
                </div>
              )}

              <Button onClick={handleSaveProfile} disabled={loading} className="gradient-veridian">
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Manage how you receive updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive air quality alerts via email</p>
                </div>
                <button
                  onClick={() =>
                    setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.emailNotifications ? 'bg-veridian-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get real-time pollution alerts</p>
                </div>
                <button
                  onClick={() =>
                    setPreferences({ ...preferences, pushNotifications: !preferences.pushNotifications })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.pushNotifications ? 'bg-veridian-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              App Preferences
            </CardTitle>
            <CardDescription>Customize your Veridian experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Language */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4" />
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veridian-500"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="fr">Français (French)</option>
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Palette className="h-4 w-4" />
                  Theme
                </label>
                <select
                  value={preferences.theme}
                  onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veridian-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>

              {/* Default Location */}
              <div>
                <label className="text-sm font-medium mb-2 block">Default Location</label>
                <Input
                  value={preferences.defaultLocation}
                  onChange={(e) => setPreferences({ ...preferences, defaultLocation: e.target.value })}
                  placeholder="e.g., New Delhi"
                />
              </div>

              {/* AQI Unit */}
              <div>
                <label className="text-sm font-medium mb-2 block">AQI Standard</label>
                <select
                  value={preferences.aqiUnit}
                  onChange={(e) => setPreferences({ ...preferences, aqiUnit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veridian-500"
                >
                  <option value="standard">US EPA Standard</option>
                  <option value="india">India CPCB Standard</option>
                  <option value="eu">EU Standard</option>
                </select>
              </div>

              <Button onClick={handleSavePreferences} disabled={loading} className="gradient-veridian">
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button variant="outline" className="w-full">
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
