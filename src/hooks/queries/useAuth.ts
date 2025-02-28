import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {
  appleLogin,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogion,
  logout,
  postLogin,
  postSignup,
  ResponseProfile,
  ResponseToken,
} from '@/api/auth';
import {useMutationCustomOptions, useQueryCustomOptions} from '@/types/common';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils/header';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';

// v5 5버젼 부터는 객체로 전달
function useSignup(mutationOptions?: useMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

// 로그인
// function useLogin(mutationOptions?: useMutationCustomOptions) {
//   return useMutation({
//     mutationFn: postLogin,
//     onSuccess: ({accessToken, refreshToken}) => {
//       setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
//       setHeader('Authorization', `Bearer ${accessToken}`);
//     },
//     onSettled: () => {
//       //
//       queryClient.refetchQueries({
//         queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
//       });
//     },
//     ...mutationOptions,
//   });
// }

function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: useMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      //
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: useMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: useMutationCustomOptions) {
  return useLogin(kakaoLogion, mutationOptions);
}

function useAppleLogin(mutationOptions?: useMutationCustomOptions) {
  return useLogin(appleLogin, mutationOptions);
}

// Refresh 토큰으로 AccessToken을 갱신
function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: useQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useUpdateProfile(mutationOptions?: useMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: useMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
    kakoLoginMutation,
    appleLoginMutation,
    profileMutation,
  };
}

//v4 4버젼에서는 바로 호출해서 전달
// function useSignup() {
//   return useMutation(postSignup, {
//     onSuccess : () =>
//   });
// }

export default useAuth;
