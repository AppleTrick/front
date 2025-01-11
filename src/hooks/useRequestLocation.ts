import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import {Platform, Alert} from 'react-native';

function useRequestLocation() {
  const newRequest = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    try {
      // 권한 상태 확인
      const status = await check(permission);
      if (status === RESULTS.GRANTED) {
        console.log('권한이 이미 허용되었습니다.');
        return;
      }

      if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
        // 권한 요청
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          console.log('권한이 허용되었습니다.');
        } else {
          console.log('사용자가 권한 요청을 거부했습니다.');
        }
      }
    } catch (error) {
      console.error('권한 요청 중 에러 발생:', error);
    }
  };

  return {newRequest};
}

export default useRequestLocation;
