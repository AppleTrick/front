import uploadImage from '@/api/image';
import {useMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateImages(mutationOptions?: useMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImage,
    ...mutationOptions,
  });
}

export default useMutateImages;
