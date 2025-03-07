import {getPosts, ResponsePost} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>, // ResponsePost[][],
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  // Suspense 사용
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPage.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;

// useQuery 와 동일하지만 paging 기능이 추가됨
// return useInfiniteQuery({
//   queryFn: ({pageParam}) => getPosts(pageParam),
//   queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
//   initialPageParam: 1, // 4버전에서는 pageParam 에 값을 1 로 넣어주는 형식으로 구현됨,
//   getNextPageParam: (lastPage, allPage) => {
//     const lastPost = lastPage[lastPage.length - 1];
//     return lastPost ? allPage.length + 1 : undefined;
//   },
//   ...queryOptions,
// });
