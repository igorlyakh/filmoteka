import AuthForm from '@/components/AuthForm/AuthForm';
import useAuthStore from '@/store/store';

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
