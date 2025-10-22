/**
 * 상세 날씨 컴포넌트
 * 습도, 풍속, 강수 확률 등 상세 정보 표시
 */

'use client';

import { memo } from 'react';
import { Droplets, Wind, CloudRain } from 'lucide-react';
import { WeatherDetailsProps } from '@/types';
import {
  formatHumidity,
  formatWindSpeed,
  formatPrecipitation,
} from '@/lib/weatherUtils';

function WeatherDetailsComponent({
  humidity,
  windSpeed,
  precipitationProbability,
}: WeatherDetailsProps) {
  const details = [
    {
      icon: Droplets,
      label: '습도',
      value: formatHumidity(humidity),
      color: 'text-blue-500',
    },
    {
      icon: Wind,
      label: '풍속',
      value: formatWindSpeed(windSpeed),
      color: 'text-cyan-500',
    },
    {
      icon: CloudRain,
      label: '강수 확률',
      value: formatPrecipitation(precipitationProbability),
      color: 'text-indigo-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {details.map((detail) => {
        const Icon = detail.icon;
        return (
          <div
            key={detail.label}
            className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
          >
            <div className={`${detail.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">{detail.label}</span>
              <span className="text-lg font-semibold">{detail.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const WeatherDetails = memo(WeatherDetailsComponent);

