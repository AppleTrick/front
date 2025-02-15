import {FlatList, StyleSheet, Text, View} from 'react-native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import {useState} from 'react';
import FeedItem from './FeedItem';
import useGetInfinteFavoritePosts from '@/hooks/queries/useGetInfinteFavoritePosts';

function FeedFavoriteList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinteFavoritePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    // console.log('hasNextPage:', hasNextPage);
    // console.log('isFetchingNextPage:', isFetchingNextPage);

    if (hasNextPage && !isFetchingNextPage) {
      //   console.log('추가 패치 작동');
      fetchNextPage();
    }
  };

  const emptyComponent = () => {
    return (
      <View>
        <Text style={styles.emptyStyle}>
          즐겨찾기한 컴포넌트가 존재하지 않습니다
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      ListEmptyComponent={emptyComponent}
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
  emptyStyle: {
    textAlign: 'center',
  },
});

export default FeedFavoriteList;
