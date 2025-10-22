/**
 * 컴포넌트 Props 타입 정의
 */

import { CurrentWeather, ForecastItem, Location } from './weather';

// LocationSearch 컴포넌트
export interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
  isLoading?: boolean;
}

// CurrentWeather 컴포넌트
export interface CurrentWeatherProps {
  data: CurrentWeather;
  isLoading?: boolean;
}

// WeatherDetails 컴포넌트
export interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  precipitationProbability: number;
}

// WeeklyForecast 컴포넌트
export interface WeeklyForecastProps {
  forecasts: ForecastItem[];
  isLoading?: boolean;
}

// WeatherCard 컴포넌트 (통합)
export interface WeatherCardProps {
  currentWeather?: CurrentWeather | null;
  weeklyForecast?: ForecastItem[] | null;
  isLoading?: boolean;
  error?: string | null;
}

