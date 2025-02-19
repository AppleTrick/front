import {getCaledarPosts, ResponseCalendarPost} from '@/api';
import {queryKeys} from '@/constants';
import {useQueryCustomOptions} from '@/types';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: useQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCaledarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    placeholderData: keepPreviousData,

    ...queryOptions,
  });
}

// v4 버젼에서는
// keepPreviousData  : true  로 하면 될것

export default useGetCalendarPosts;
