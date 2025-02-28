import {colors, mainNavigations, settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {platformCheck} from '@/utils/platformCheck';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};

  // const handleLogout = () => {
  //   logoutMutation.mutate(null);
  // };

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {imageUri === null && kakaoImageUri === null && (
              <Image
                source={require('@/assets/user-default.png')}
                style={styles.userImage}
              />
            )}
            {imageUri === null && !!kakaoImageUri && (
              <Image source={{uri: `${platformCheck()}/${kakaoImageUri}`}} />
            )}
            {imageUri !== null && (
              <Image
                source={{uri: `${platformCheck()}/${imageUri}`}}
                style={styles.userImage}
              />
            )}
          </View>
          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* <Pressable
        onPress={handleLogout}
        style={{alignItems: 'flex-end', padding: 10}}>
        <Text>로그아웃</Text>
      </Pressable> */}
      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons name="settings" color={colors.GRAY_700} size={19} />
          <Text style={styles.bottomText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  nameText: {
    color: colors.BLACK,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 14,
  },

  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bottomText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.GRAY_700,
  },
});

export default CustomDrawerContent;
