const registration = async data => {
  const res = await axiosInstance.post('/auth/registration', data);
  const { accessToken, name, email } = res.data;
  return { token: accessToken, name, email };
};

export default registration;
