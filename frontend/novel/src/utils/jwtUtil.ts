import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { getCookie } from './cookieUtil';

const jwtAxios = axios.create();

const requestFail = (err: AxiosError) => {
  console.log('request error');
  return Promise.reject(err);
};
const responseFail = (err: AxiosError) => {
  console.log('response error');
  return Promise.reject(err);
};

const beforeReq = (config: InternalAxiosRequestConfig) => {
  console.log('before Request');

  const member = getCookie('member');
  if (!member) {
    return Promise.reject({
      response: {
        data: { error: '실패' },
      },
    });
  }

  // 쿠키가 있다면 쿠키에서 accessToken 만 가져오기
  const { accessToken } = member;

  console.log('accessToken ', accessToken);
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

const beforeRes = async (
  res: AxiosResponse<unknown>,
): Promise<AxiosResponse<unknown>> => {
  console.log('before return response...');
  return res;
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
