import useLocationStore from '@/store/useLocationStore';
import {useEffect, useRef} from 'react';
import MapView, {LatLng} from 'react-native-maps';

function useMoveMapView() {
  const {moveLocation} = useLocationStore();
  const mapRef = useRef<MapView | null>(null);

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation]);

  return {mapRef, moveMapView};
}

export default useMoveMapView;
