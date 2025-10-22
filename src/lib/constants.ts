/**
 * 애플리케이션 상수 정의
 */

// API 설정
export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  GEO_URL: 'https://api.openweathermap.org/geo/1.0',
  API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '',
  UNITS: 'metric', // 섭씨 온도
  LANG: 'kr', // 한국어
} as const;

// 기본 지역 (서울)
export const DEFAULT_LOCATION = {
  name: '서울',
  lat: 37.5665,
  lon: 126.9780,
  country: 'KR',
} as const;

// 요일 매핑 (한글)
export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

// 날씨 아이콘 매핑 (OpenWeatherMap icon code)
export const WEATHER_ICONS: Record<string, string> = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️',
  '04d': '☁️', // broken clouds
  '04n': '☁️',
  '09d': '🌧️', // shower rain
  '09n': '🌧️',
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️',
  '13d': '❄️', // snow
  '13n': '❄️',
  '50d': '🌫️', // mist
  '50n': '🌫️',
} as const;

