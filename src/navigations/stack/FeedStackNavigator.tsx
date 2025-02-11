import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {colors, feedNavigations} from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {LatLng} from 'react-native-maps';
import EditPostScreen from '@/screens/feed/EditPostScreen';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number; isModal?: boolean};
  [feedNavigations.EDIT_POST]: {location: LatLng};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'red',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
        headerMode: 'screen',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={() => ({
          headerTitle: '피드',
          headerLeft: FeedHomeHeaderLeft,
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={() => ({
          headerTitle: ' ',
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
          // cardStyleInterpolator:
          //   CardStyleInterpolators.forFadeFromBottomAndroid, // 페이드 인 효과 적용
        })}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
    </Stack.Navigator>
  );
}
export default FeedStackNavigator;
