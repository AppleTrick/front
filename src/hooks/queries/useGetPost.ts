import {useQuery, useSuspenseQuery} from '@tanstack/react-query';

import {getPost, ResponseSinglePost} from '@/api';
import {queryKeys} from '@/constants';
import {useQueryCustomOptions} from '@/types';

function useGetPost(
  id: number | null,
  queryOptions?: useQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;
