import {getFavoritePosts, getPosts, ResponsePost} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

function useGetInfinteFavoritePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>, // ResponsePost[][],
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getFavoritePosts(pageParam),
    queryKey: [
      queryKeys.POST,
      queryKeys.FAVORITE,
      queryKeys.GET_FAVORITE_POSTS,
    ],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPage.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinteFavoritePosts;
