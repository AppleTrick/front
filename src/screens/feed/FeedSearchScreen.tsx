import FeedSearchList from '@/components/feed/FeedSearchList';
import {colors} from '@/constants';
import {SafeAreaView, StyleSheet, View} from 'react-native';

interface FeedSearchScreenProps {}

function FeedSearchScreen({}: FeedSearchScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <FeedSearchList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedSearchScreen;
