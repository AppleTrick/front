import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030',
  withCredentials: true,
});

export default axiosInstance;

// 'http://10.0.2.2:3030', 안드로이드의 경우 localhost가 먹히지 않을 수도 있기 때문에 10.0.2.2:3030 로 설정
