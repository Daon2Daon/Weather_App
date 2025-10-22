/**
 * 현재 날씨 컴포넌트
 * 선택된 지역의 현재 날씨 정보를 표시
 */

'use client';

import { memo } from 'react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CurrentWeatherProps } from '@/types';
import {
  getWeatherIcon,
  formatTemperature,
} from '@/lib/weatherUtils';

function CurrentWeatherComponent({ data, isLoading }: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-16 w-32" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </CardContent>
      </>
    );
  }

  const weatherIcon = getWeatherIcon(data.icon);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">
          {data.location}
          <span className="ml-2 text-lg font-normal text-muted-foreground">
            {data.country}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 메인 날씨 정보 */}
        <div className="flex items-center justify-between">
          {/* 날씨 아이콘 및 설명 */}
          <div className="flex items-center gap-4">
            <span className="text-6xl" aria-label="날씨 아이콘">
              {weatherIcon}
            </span>
            <div className="flex flex-col">
              <span className="text-7xl font-bold tracking-tight">
                {data.temperature}°
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                {data.description}
              </span>
            </div>
          </div>
        </div>

        {/* 상세 온도 정보 */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">체감:</span>
            <span className="font-medium">{formatTemperature(data.feelsLike)}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">최고:</span>
            <span className="font-medium">{formatTemperature(data.tempMax)}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">최저:</span>
            <span className="font-medium">{formatTemperature(data.tempMin)}</span>
          </div>
        </div>
      </CardContent>
    </>
  );
}

export const CurrentWeather = memo(CurrentWeatherComponent);

