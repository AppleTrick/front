import axiosInstance from '../api/axios';

function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  // default 키의 존재 여부 확인

  // 존재하지 않으면 Return
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  // 존재할 경우 삭제
  delete axiosInstance.defaults.headers.common[key];
}

export {setHeader, removeHeader};
