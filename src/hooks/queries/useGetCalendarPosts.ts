import {getCaledarPosts, ResponseCalendarPost} from '@/api';
import {queryKeys} from '@/constants';
import {useQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: useQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCaledarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
