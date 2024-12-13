import AuthForm from '@/components/AuthForm';
import useAuthStore from '@/store';

const RegistrationPage = () => {
  const { registration } = useAuthStore();
  return (
    <AuthForm
      typeRegistration={true}
      handler={registration}
    />
  );
};

export default RegistrationPage;
