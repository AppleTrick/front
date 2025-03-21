import {StyleSheet} from 'react-native';
import HeaderButton from '../common/HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useThemeStore from '@/store/useThemeStore';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeaderLeft() {
  const navigation = useNavigation<FeedHomeHeaderLeftProps>();
  const {theme} = useThemeStore();

  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors[theme].BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

const styles = StyleSheet.create({});

export default FeedHomeHeaderLeft;
