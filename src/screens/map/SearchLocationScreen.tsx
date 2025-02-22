import SearchInput from '@/components/common/SearchInput';
import SearchRegionResult from '@/components/map/SearchRegionResult';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

interface SearchLocationScreenProps {}

function SearchLocationScreen({}: SearchLocationScreenProps) {
  const [keyword, setKeyword] = useState<string>('');
  const {userLocation} = useUserLocation();

  // 페이징 기능
  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    // 디바운스 적용하기
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 장소를 입력해주세요"
        onSubmit={() => Keyboard.dismiss()}
      />
      <SearchRegionResult regionInfo={regionInfo} />
      {/* 페이지네이션 구현하기 */}
      {/* <PageNation/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;
