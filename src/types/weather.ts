/**
 * 날씨 관련 TypeScript 타입 정의
 */

// 지역 정보
export interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// 현재 날씨 정보
export interface CurrentWeather {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  precipitationProbability?: number;
  timestamp: number;
}

// 주간 예보 항목
export interface ForecastItem {
  date: string;
  dayOfWeek: string;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  humidity: number;
  precipitationProbability: number;
}

// 주간 예보 데이터
export interface WeeklyForecast {
  location: string;
  forecasts: ForecastItem[];
}

// 통합 날씨 데이터
export interface WeatherData {
  current: CurrentWeather | null;
  weekly: WeeklyForecast | null;
}

// API 상태
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

// API 에러
export interface ApiError {
  message: string;
  code?: string | number;
}

// OpenWeatherMap API 응답 타입들
export interface OpenWeatherMapCurrentResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface OpenWeatherMapForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      '3h': number;
    };
    snow?: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface OpenWeatherMapGeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

