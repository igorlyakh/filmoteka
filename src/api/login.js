import axiosInstance from './axios';

const login = async data => {
  const res = await axiosInstance.post('/auth/login', data);
  const { accessToken, name, email } = res.data;
  return { token: accessToken, name, email };
};

export default login;
