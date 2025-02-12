import {updateFavoritePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {useMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateFavoritePost(mutationOption?: useMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
    },
    ...mutationOption,
  });
}

export default useMutateFavoritePost;
