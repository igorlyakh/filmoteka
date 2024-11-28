import AuthForm from '@/components/AuthForm';
import useAuthStore from '@/store/store';

const LoginPage = () => {
  const { login } = useAuthStore();

  return <AuthForm handler={login} />;
};

export default LoginPage;
