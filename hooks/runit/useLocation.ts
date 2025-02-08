import { useEffect, useState, useRef } from "react";
import Geolocation, { GeoPosition, GeoError, GeoOptions, GeoWatchOptions } from "react-native-geolocation-service";
import { PermissionsAndroid, Platform } from "react-native";

const geoWatchOptions: GeoWatchOptions = {
  accuracy: {
    android: 'high',
  },
  enableHighAccuracy: true,
  distanceFilter: 10, // Location updates every 10 meters, suitable for jogging
  interval: 10000, // Set a fixed interval of 10 seconds between updates (adjustable)
  useSignificantChanges: false, // Use constant location updates to track every movement while jogging
  showsBackgroundLocationIndicator: true, // Display a background indicator for transparency
};


export function useLocation() {
  const [distance, setDistance] = useState<number>(0);
  const prevLocationRef = useRef<GeoPosition | null>(null);

  useEffect(() => {
    let watchId: number | null = null;

    const startLocationTracking = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.error("Location permission not granted");
        return;
      }

      // Start watching position changes
      watchId = Geolocation.watchPosition(
        (position: GeoPosition) => {
          if (prevLocationRef.current) {
            const newDistance = calculateDistance(
              prevLocationRef.current.coords.latitude,
              prevLocationRef.current.coords.longitude,
              position.coords.latitude,
              position.coords.longitude
            );
            setDistance((prev) => parseFloat((prev + newDistance).toFixed(2)));
          } 
          prevLocationRef.current = position; // Update the reference with the current position
        },
        (error: GeoError) => {
          console.error("Error watching location:", error);
        },
        geoWatchOptions
      );
    };

    startLocationTracking();

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    if (Platform.OS === "ios") {
      // For iOS, permissions are handled automatically by Geolocation
      return true;
    }
    return false;
  };

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
