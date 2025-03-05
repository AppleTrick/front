import {createDrawerNavigator} from '@react-navigation/drawer';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import {colors, mainNavigations} from '@/constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomDrawerContent from './CustomDrawerContent';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import FeedTabNavigator, {FeedTabParamList} from '../tab/FeedTabNavigator';
import SettingStackNavigator, {
  SettingStackParamList,
} from '../stack/SettingStackNavigator';
import {SCREEN_WIDTH} from '@/utils';
import useThemeStore from '@/store/useThemeStore';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(route: RouteProp<MainDrawerParamList>, focused: boolean) {
  const {theme} = useThemeStore();
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME:
      iconName = 'location-on';
      break;
    case mainNavigations.FEED:
      iconName = 'book';
      break;
    case mainNavigations.CALENDAR:
      iconName = 'event-note';
      break;
    case mainNavigations.SETTING:
      iconName = 'settings';
      break;
  }

  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? colors[theme].BLACK : colors[theme].GRAY_500}
    />
  );
}

const MainDrawerNavigator = () => {
  const {theme} = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: SCREEN_WIDTH * 0.6,
          backgroundColor: colors[theme].WHITE,
        },
        drawerActiveTintColor: colors[theme].BLACK,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        drawerActiveBackgroundColor: colors[theme].PINK_200,
        drawerInactiveBackgroundColor: colors[theme].GRAY_200,
        drawerItemStyle: {
          marginVertical: 3,
          borderRadius: 12,
          height: 50,
        },
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{title: '홈', swipeEnabled: false}}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedTabNavigator}
        options={{title: '피드'}}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
          headerShown: true,
          headerLeft: () => FeedHomeHeaderLeft(),
        }}
      />
      <Drawer.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={{
          title: '설정',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
