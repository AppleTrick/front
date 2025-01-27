import {alerts} from '@/constants';
import {useEffect} from 'react';
import {Alert, Platform, Linking} from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissonOS = {
  [key in PermissionType]: Permission;
};

const androidPermissons: PermissonOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissons: PermissonOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermissions(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissons : iosPermissons;

      const checked = await check(permissionOS[type]);
      // console.log('checked', checked);

      const showPermissionsAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionsAlert();
            return;
          }
          await request(permissionOS[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionsAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
}

export default usePermissions;
