import { useEffect, useState, useRef } from "react";
import * as Location from 'expo-location';

type LocationData = {
  distance: number;
};

export function useLocation(): LocationData {
  const [distance, setDistance] = useState<number>(0);
  const prevLocationRef = useRef<Location.LocationObject | null>(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | undefined;

    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location: Location.LocationObject) => {
          if (prevLocationRef.current) {
            const newDistance = calculateDistance(
              prevLocationRef.current.coords.latitude,
              prevLocationRef.current.coords.longitude,
              location.coords.latitude,
              location.coords.longitude
            );
            setDistance((prev) => prev + newDistance);
          }
          // Update the ref with the current location
          prevLocationRef.current = location;
        }
      );
    };

    startLocationTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2)); // Distance in kilometers
  };

  return { distance };
}
