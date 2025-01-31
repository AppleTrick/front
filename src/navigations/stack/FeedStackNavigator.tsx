import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {feedNavigations} from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  //   [feedNavigations.FEED_DETAIL]: undefined;
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
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={() => ({
          headerTitle: '피드',
          headerLeft: FeedHomeHeaderLeft,
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default FeedStackNavigator;
