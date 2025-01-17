import {createPost} from '@/api';
import {useMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: useMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
