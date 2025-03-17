import {StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import {authNavigations, colors} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import appleAuth, {
//   AppleButton,
// } from '@invertase/react-native-apple-authentication';
import {SCREEN_WIDTH} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const {appleLoginMutation} = useAuth();
  const {theme} = useThemeStore();
  const styles = styling(theme);

  // const handlePressAppleLogin = async () => {
  //   try {
  //     const {identityToken, fullName} = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });

  //     // console.log('identityToken , fullName', identityToken, fullName);
  //     if (identityToken) {
  //       appleLoginMutation.mutate({
  //         identityToken,
  //         appId: 'org.reactjs.native.example.MatzipApp',
  //         nickname: fullName?.givenName ?? null,
  //       });
  //     }
  //   } catch (error: any) {
  //     if (error.code !== appleAuth.Error.CANCELED) {
  //       Toast.show({
  //         type: 'error',
  //         text1: '애플 로그인이 실패했습니다.',
  //         text2: '나중에 다시 시도해 주세요',
  //       });
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/logo.png')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="카카오로 로그인하기"
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={<Ionicons name={'chatbubble-sharp'} color={'#181500'} />}
        />
        <CustomButton
          label="이메일로 로그인하기"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
        {/* <CustomButton
          label="회원가입하기"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1.5,
      width: Dimensions.get('screen').width / 2,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      flex: 1,
      gap: 10,
      alignItems: 'center',
    },
    kakaoButtonContainer: {
      backgroundColor: '#FEE503',
    },
    kakaoButtonText: {
      color: '#181600',
    },
    emailText: {
      textDecorationLine: 'underline',
      fontWeight: '500',
      padding: 10,
      color: colors[theme].BLACK,
    },
    appleButton: {
      width: SCREEN_WIDTH - 60,
      height: 45,
      paddingVertical: 25,
    },
  });

export default AuthHomeScreen;

// {Platform.OS === 'ios' && (
//   <AppleButton
//     buttonStyle={AppleButton.Style.BLACK}
//     buttonType={AppleButton.Type.SIGN_IN}
//     style={styles.appleButton}
//     cornerRadius={3}
//     onPress={handlePressAppleLogin}
//   />
// )}
