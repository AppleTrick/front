import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import {colors} from '@/constants';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface FeedFavoriteScreenProps {}

function FeedFavoriteScreen({}: FeedFavoriteScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
