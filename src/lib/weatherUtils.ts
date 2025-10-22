/**
 * 날씨 관련 유틸리티 함수
 */

import { WEATHER_ICONS } from './constants';

/**
 * 날씨 아이콘 코드를 이모지로 변환
 */
export function getWeatherIcon(iconCode: string): string {
  return WEATHER_ICONS[iconCode] || '🌤️';
}

/**
 * 온도를 포맷팅
 */
export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

/**
 * 날짜를 포맷팅 (YYYY-MM-DD -> MM/DD)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

/**
 * 풍속을 포맷팅
 */
export function formatWindSpeed(speed: number): string {
  return `${speed.toFixed(1)} m/s`;
}

/**
 * 습도를 포맷팅
 */
export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

/**
 * 강수 확률을 포맷팅
 */
export function formatPrecipitation(probability: number): string {
  return `${probability}%`;
}

