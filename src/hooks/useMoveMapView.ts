import useLocationStore from '@/store/useLocationStore';
import {useEffect, useRef} from 'react';
import MapView, {LatLng} from 'react-native-maps';

// 지도가 화면을 이동하는 데 사용되는 hook
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
