/**
 * OpenWeatherMap API 서비스
 */

import {
  Location,
  CurrentWeather,
  ForecastItem,
  OpenWeatherMapCurrentResponse,
  OpenWeatherMapForecastResponse,
  OpenWeatherMapGeocodingResponse,
  ApiError,
} from '@/types';
import { API_CONFIG, DAYS_OF_WEEK } from '@/lib/constants';

/**
 * API 에러 처리 헬퍼 함수
 */
function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }
  return {
    message: '알 수 없는 오류가 발생했습니다.',
    code: 'UNKNOWN_ERROR',
  };
}

/**
 * API 응답 검증
 */
async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('네트워크 오류가 발생했습니다.');
  }
}

/**
 * 지역 검색
 * @param query 검색어 (도시명)
 * @param limit 결과 개수 (기본: 5)
 */
export async function searchLocations(
  query: string,
  limit: number = 5
): Promise<Location[]> {
  if (!query || query.length < 2) {
    return [];
  }

  if (!API_CONFIG.API_KEY) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  try {
    const url = `${API_CONFIG.GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_CONFIG.API_KEY}`;
    const data = await fetchWithErrorHandling<OpenWeatherMapGeocodingResponse[]>(url);

    return data.map((item) => ({
      name: item.name,
      lat: item.lat,
      lon: item.lon,
      country: item.country,
      state: item.state,
    }));
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 역지오코딩: 위도/경도로 지역명 가져오기
 * @param lat 위도
 * @param lon 경도
 */
export async function getLocationByCoordinates(
  lat: number,
  lon: number
): Promise<Location> {
  if (!API_CONFIG.API_KEY) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  try {
    const url = `${API_CONFIG.GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_CONFIG.API_KEY}`;
    const data = await fetchWithErrorHandling<OpenWeatherMapGeocodingResponse[]>(url);

    if (data.length === 0) {
      throw new Error('해당 위치의 정보를 찾을 수 없습니다.');
    }

    const location = data[0];
    return {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      country: location.country,
      state: location.state,
    };
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 현재 날씨 조회
 * @param lat 위도
 * @param lon 경도
 */
export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  if (!API_CONFIG.API_KEY) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  try {
    const url = `${API_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${API_CONFIG.UNITS}&lang=${API_CONFIG.LANG}&appid=${API_CONFIG.API_KEY}`;
    const data = await fetchWithErrorHandling<OpenWeatherMapCurrentResponse>(url);

    return {
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0]?.description || '정보 없음',
      icon: data.weather[0]?.icon || '01d',
      timestamp: data.dt,
    };
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 5일 주간 예보 조회
 * @param lat 위도
 * @param lon 경도
 */
export async function getWeeklyForecast(
  lat: number,
  lon: number
): Promise<ForecastItem[]> {
  if (!API_CONFIG.API_KEY) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  try {
    const url = `${API_CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${API_CONFIG.UNITS}&lang=${API_CONFIG.LANG}&appid=${API_CONFIG.API_KEY}`;
    const data = await fetchWithErrorHandling<OpenWeatherMapForecastResponse>(url);

    // 날짜별로 모든 시간대 데이터를 그룹화
    const dailyData = new Map<string, typeof data.list>();

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

      if (!dailyData.has(dateKey)) {
        dailyData.set(dateKey, []);
      }
      dailyData.get(dateKey)!.push(item);
    });

    // 오늘 제외하고 최대 5일 예보
    const today = new Date().toISOString().split('T')[0];
    const forecasts: ForecastItem[] = [];

    Array.from(dailyData.entries())
      .filter(([dateKey]) => dateKey !== today) // 오늘 제외
      .slice(0, 5) // 최대 5일
      .forEach(([dateKey, items]) => {
        // 해당 날짜의 모든 시간대에서 최고/최저 온도 계산
        const temperatures = items.map((item) => item.main.temp);
        const tempMax = Math.max(...temperatures);
        const tempMin = Math.min(...temperatures);

        // 강수 확률은 해당 날의 최대값 사용
        const maxPrecipitation = Math.max(...items.map((item) => item.pop));

        // 정오(12시) 데이터 우선, 없으면 첫 번째 데이터의 날씨 설명과 아이콘 사용
        let representativeItem = items[0];
        for (const item of items) {
          const hour = new Date(item.dt * 1000).getHours();
          if (hour >= 11 && hour <= 13) {
            representativeItem = item;
            break;
          }
        }

        const date = new Date(representativeItem.dt * 1000);
        const dayOfWeek = DAYS_OF_WEEK[date.getDay()];

        forecasts.push({
          date: dateKey,
          dayOfWeek,
          tempMax: Math.round(tempMax),
          tempMin: Math.round(tempMin),
          description: representativeItem.weather[0]?.description || '정보 없음',
          icon: representativeItem.weather[0]?.icon || '01d',
          humidity: representativeItem.main.humidity,
          precipitationProbability: Math.round(maxPrecipitation * 100),
        });
      });

    return forecasts;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 통합 날씨 정보 조회 (현재 날씨 + 주간 예보)
 * @param lat 위도
 * @param lon 경도
 */
export async function getCompleteWeatherData(lat: number, lon: number) {
  try {
    const [current, weekly] = await Promise.all([
      getCurrentWeather(lat, lon),
      getWeeklyForecast(lat, lon),
    ]);

    return {
      current,
      weekly,
    };
  } catch (error) {
    throw handleApiError(error);
  }
}

