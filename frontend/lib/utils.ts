import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate Air Quality Index (AQI) based on pollutant levels
 */
export function calculateAQI(pollutants: {
  pm25?: number
  pm10?: number
  no2?: number
  o3?: number
  co?: number
}): number {
  // Simplified AQI calculation based on PM2.5
  const pm25 = pollutants.pm25 || 0
  
  if (pm25 <= 12) return Math.round(pm25 * 4.17)
  if (pm25 <= 35.4) return Math.round(((pm25 - 12.1) / 23.3) * 49 + 51)
  if (pm25 <= 55.4) return Math.round(((pm25 - 35.5) / 19.9) * 49 + 101)
  if (pm25 <= 150.4) return Math.round(((pm25 - 55.5) / 94.9) * 99 + 151)
  if (pm25 <= 250.4) return Math.round(((pm25 - 150.5) / 99.9) * 99 + 201)
  return Math.round(((pm25 - 250.5) / 99.9) * 99 + 301)
}

/**
 * Get AQI category and color
 */
export function getAQICategory(aqi: number): {
  level: string
  color: string
  description: string
} {
  if (aqi <= 50) {
    return {
      level: 'Good',
      color: 'text-pollution-good',
      description: 'Air quality is satisfactory',
    }
  } else if (aqi <= 100) {
    return {
      level: 'Moderate',
      color: 'text-pollution-moderate',
      description: 'Acceptable for most people',
    }
  } else if (aqi <= 150) {
    return {
      level: 'Unhealthy for Sensitive Groups',
      color: 'text-pollution-unhealthy',
      description: 'Sensitive groups should limit outdoor activities',
    }
  } else if (aqi <= 200) {
    return {
      level: 'Unhealthy',
      color: 'text-pollution-veryUnhealthy',
      description: 'Everyone may experience health effects',
    }
  } else if (aqi <= 300) {
    return {
      level: 'Very Unhealthy',
      color: 'text-red-600',
      description: 'Health alert: everyone may experience serious effects',
    }
  } else {
    return {
      level: 'Hazardous',
      color: 'text-pollution-hazardous',
      description: 'Health warning of emergency conditions',
    }
  }
}

/**
 * Calculate Pollution Index using the provided formula
 * PI = min((0.3×T) + (0.4×PM) + (1.2×CO) - (0.8×AT))
 */
export function calculatePollutionIndex(params: {
  temperature: number
  pm25: number
  co: number
  altitude: number
}): number {
  const { temperature, pm25, co, altitude } = params
  
  const pi = Math.min(
    0.3 * temperature + 0.4 * pm25 + 1.2 * co - 0.8 * altitude
  )
  
  return Math.max(0, pi) // Ensure non-negative
}

/**
 * Calculate number of bio-urban trees needed
 * Bio-urban trees release 10x more oxygen than regular trees
 */
export function calculateBioUrbanTrees(
  pollutionIndex: number,
  area: number // in square kilometers
): number {
  // Formula: Assume 1 bio-urban tree can clean 100 units of pollution per day
  // Regular tree cleans 10 units, bio-urban cleans 100 units
  const treesNeeded = Math.ceil((pollutionIndex * area) / 100)
  return Math.max(1, treesNeeded)
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
