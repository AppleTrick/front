import FeedList from '@/components/feed/FeedList';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Feed</Text> */}
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
