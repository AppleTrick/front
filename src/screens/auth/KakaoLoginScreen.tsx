import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {SCREEN_HEIGHT} from '@/utils';
import axios from 'axios';
import {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Config from 'react-native-config';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';

const REDIRECT_URI = `${
  Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:3030'
}/auth/oauth/kakao`;

interface KakaoLoginScreenProps {}

function KakaoLoginScreen({}: KakaoLoginScreenProps) {
  const {kakoLoginMutation} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);

  // 코드 추출
  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      console.log(code);
      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    kakoLoginMutation.mutate(response.data.access_token);

    // console.log('response.data', response.data);
  };

  const handleNavigationChangeState = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator
            size={'small'}
            color={colors.light.UNCHANGE_BLACK}
          />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationChangeState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaoLoadingContainer: {
    backgroundColor: colors.light.UNCHANGE_WHITE,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default KakaoLoginScreen;
