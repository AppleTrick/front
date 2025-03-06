import {StyleSheet, View} from 'react-native';
import HeaderButton from '../common/HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useThemeStore from '@/store/useThemeStore';

type SettingHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHeaderLeft() {
  const navigation = useNavigation<SettingHeaderLeftProps>();
  const {theme} = useThemeStore();

  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors[theme].BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

const styles = StyleSheet.create({});

export default SettingHeaderLeft;
