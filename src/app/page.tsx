/**
 * 날씨 앱 메인 페이지
 * 모든 날씨 컴포넌트 통합 및 상태 관리
 */

'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LocationSearch } from '@/components/weather/LocationSearch';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { WeatherDetails } from '@/components/weather/WeatherDetails';
import { WeeklyForecast } from '@/components/weather/WeeklyForecast';
import { ThemeToggle } from '@/components/theme-toggle';
import { Location, CurrentWeather as CurrentWeatherType, ForecastItem } from '@/types';
import { getCompleteWeatherData } from '@/services/weatherApi';
import { DEFAULT_LOCATION } from '@/lib/constants';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<ForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 날씨 데이터 로드
  const loadWeatherData = async (location: Location) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCompleteWeatherData(location.lat, location.lon);
      setCurrentWeather(data.current);
      setWeeklyForecast(data.weekly);
    } catch (err) {
      console.error('Weather data loading error:', err);
      setError(
        err instanceof Error
          ? err.message
          : '날씨 정보를 불러오는 중 오류가 발생했습니다.'
      );
      setCurrentWeather(null);
      setWeeklyForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로드 (서울)
  useEffect(() => {
    loadWeatherData(DEFAULT_LOCATION);
  }, []);

  // 지역 선택 핸들러
  const handleLocationSelect = (location: Location) => {
    loadWeatherData(location);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* 테마 토글 (오른쪽 상단) */}
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>

        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
            🌤️ 날씨 정보
          </h1>
          <p className="text-muted-foreground">
            원하는 지역의 날씨를 검색해보세요
          </p>
        </div>

        {/* 지역 검색 */}
        <div className="mb-8 flex justify-center">
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            isLoading={isLoading}
          />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mx-auto mb-8 max-w-2xl">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* 메인 날씨 카드 */}
        <div className="mx-auto max-w-4xl space-y-6">
          {/* 현재 날씨 */}
          <Card className="animate-fade-in overflow-hidden shadow-lg transition-smooth hover:shadow-xl">
            {currentWeather ? (
              <CurrentWeather data={currentWeather} isLoading={isLoading} />
            ) : (
              !isLoading && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    지역을 선택하여 날씨 정보를 확인하세요.
                  </p>
                </div>
              )
            )}
          </Card>

          {/* 상세 날씨 */}
          {currentWeather && !isLoading && (
            <WeatherDetails
              humidity={currentWeather.humidity}
              windSpeed={currentWeather.windSpeed}
              precipitationProbability={
                currentWeather.precipitationProbability || 0
              }
            />
          )}

          {/* 주간 예보 */}
          <Card className="animate-fade-in overflow-hidden shadow-lg transition-smooth hover:shadow-xl">
            <div className="border-b bg-muted/50 px-6 py-4">
              <h2 className="text-xl font-semibold">주간 예보</h2>
            </div>
            <div className="p-6">
              <WeeklyForecast forecasts={weeklyForecast} isLoading={isLoading} />
            </div>
          </Card>
        </div>

        {/* 푸터 */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Powered by{' '}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              OpenWeatherMap
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
