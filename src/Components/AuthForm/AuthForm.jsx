import { useForm } from 'react-hook-form';

const AuthForm = () => {
  const { register, handleSubmit, reset } = useForm();
  return (
    <form
      onSubmit={handleSubmit(data => {
        console.log(data);
        reset();
      })}
    >
      <input
        placeholder="Введите Ваше имя"
        type="text"
        required
        {...register('name')}
      />
      <input
        placeholder="Введите Ваш email"
        type="email"
        required
        {...register('email')}
      />
      <input
        placeholder="Введите Ваш пароль"
        type="password"
        required
        {...register('password')}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default AuthForm;
