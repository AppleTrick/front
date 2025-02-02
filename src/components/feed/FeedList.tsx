import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedItem from './FeedItem';

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    console.log('hasNextPage:', hasNextPage);
    console.log('isFetchingNextPage:', isFetchingNextPage);

    if (hasNextPage && !isFetchingNextPage) {
      //   console.log('추가 패치 작동');
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached} // 스크롤이 마지막이 닿았을때 작동하는 함수
      onEndReachedThreshold={0.5} // 스크롤이 완전 닿기 전에 호출
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedList;
