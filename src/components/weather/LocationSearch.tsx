/**
 * 지역 검색 컴포넌트
 * 사용자가 날씨를 조회할 지역을 검색하고 선택
 */

'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { LocationSearchProps, Location } from '@/types';
import { searchLocations, getLocationByCoordinates } from '@/services/weatherApi';
import { useDebounce } from '@/hooks/useDebounce';

export function LocationSearch({ onLocationSelect, isLoading = false }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // 디바운스된 검색어 (500ms 지연)
  const debouncedQuery = useDebounce(query, 500);

  // 검색 실행
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.length < 2) {
        setLocations([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        const results = await searchLocations(debouncedQuery, 5);
        setLocations(results);
        setShowResults(true);
      } catch (err) {
        setError('지역 검색 중 오류가 발생했습니다.');
        setLocations([]);
        console.error('Location search error:', err);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  // 지역 선택 핸들러
  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location);
    setQuery('');
    setShowResults(false);
    setLocations([]);
  };

  // 검색 버튼 클릭 (Enter 키로도 가능)
  const handleSearch = () => {
    if (locations.length > 0) {
      handleLocationSelect(locations[0]);
    }
  };

  // 현재 위치 가져오기
  const handleGetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('브라우저가 위치 정보를 지원하지 않습니다.');
      return;
    }

    setIsGettingLocation(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const location = await getLocationByCoordinates(latitude, longitude);
          onLocationSelect(location);
          setQuery('');
          setShowResults(false);
        } catch (err) {
          console.error('Location error:', err);
          setError('현재 위치를 가져오는 중 오류가 발생했습니다.');
        } finally {
          setIsGettingLocation(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        let errorMessage = '위치 정보를 가져올 수 없습니다.';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = '위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 사용할 수 없습니다.';
            break;
          case err.TIMEOUT:
            errorMessage = '위치 정보 요청 시간이 초과되었습니다.';
            break;
        }
        
        setError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* 검색 입력 필드 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="도시 이름을 입력하세요 (예: Seoul, Busan)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="pl-10"
            disabled={isLoading || isGettingLocation}
          />
        </div>
        <Button
          onClick={handleGetCurrentLocation}
          disabled={isLoading || isGettingLocation}
          size="icon"
          variant="outline"
          title="현재 위치"
        >
          {isGettingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
        <Button
          onClick={handleSearch}
          disabled={isLoading || locations.length === 0 || isGettingLocation}
          size="icon"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* 검색 결과 드롭다운 */}
      {showResults && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-md border bg-white dark:bg-gray-900 shadow-lg">
          <Command className="bg-white dark:bg-gray-900">
            <CommandList className="bg-white dark:bg-gray-900">
              {isSearching && (
                <div className="py-6 text-center text-sm text-muted-foreground bg-white dark:bg-gray-900">
                  검색 중...
                </div>
              )}

              {!isSearching && locations.length === 0 && (
                <CommandEmpty className="bg-white dark:bg-gray-900">검색 결과가 없습니다.</CommandEmpty>
              )}

              {!isSearching && locations.length > 0 && (
                <CommandGroup heading="검색 결과" className="bg-white dark:bg-gray-900">
                  {locations.map((location, index) => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}-${index}`}
                      onSelect={() => handleLocationSelect(location)}
                      className="cursor-pointer bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{location.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {location.state && `${location.state}, `}
                          {location.country}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

