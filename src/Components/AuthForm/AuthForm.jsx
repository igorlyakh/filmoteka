import { useForm } from 'react-hook-form';
import useAuthStore from '../../store/store';
import style from './AuthForm.module.scss';

const AuthForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { login, token } = useAuthStore();
  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(data => {
        login(data);
        reset();
      })}
    >
      <input
        className={style.input}
        placeholder="Введите Ваше имя"
        type="text"
        required
        {...register('name')}
      />
      <input
        className={style.input}
        placeholder="Введите Ваш email"
        type="email"
        required
        {...register('email')}
      />
      <input
        className={style.input}
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
