/**
 * 주간 예보 컴포넌트
 * 5~7일간의 날씨 예보를 테이블 형태로 표시
 */

'use client';

import { memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { WeeklyForecastProps } from '@/types';
import { getWeatherIcon, formatDate } from '@/lib/weatherUtils';

function WeeklyForecastComponent({ forecasts, isLoading }: WeeklyForecastProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!forecasts || forecasts.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        예보 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">날짜</TableHead>
            <TableHead className="w-[60px]">요일</TableHead>
            <TableHead className="w-[60px] text-center">날씨</TableHead>
            <TableHead className="text-right">최고/최저</TableHead>
            <TableHead className="w-[70px] text-right">강수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forecasts.map((forecast, index) => {
            const weatherIcon = getWeatherIcon(forecast.icon);
            return (
              <TableRow key={`${forecast.date}-${index}`}>
                <TableCell className="text-sm font-medium">
                  {formatDate(forecast.date)}
                </TableCell>
                <TableCell className="text-sm">{forecast.dayOfWeek}</TableCell>
                <TableCell className="text-center">
                  <span className="text-2xl" aria-label="날씨 아이콘">
                    {weatherIcon}
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm">
                  <span className="font-semibold text-red-500">
                    {forecast.tempMax}°
                  </span>
                  {' / '}
                  <span className="font-semibold text-blue-500">
                    {forecast.tempMin}°
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm">
                  <span className={`font-medium ${forecast.precipitationProbability > 0 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    {forecast.precipitationProbability}%
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export const WeeklyForecast = memo(WeeklyForecastComponent);

