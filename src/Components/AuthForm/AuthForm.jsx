import { useForm } from 'react-hook-form';
import style from './AuthForm.module.scss';

const AuthForm = ({ typeRegistration = false, handler }) => {
  const { register, handleSubmit, reset } = useForm();
  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(data => {
        handler(data);
        reset();
      })}
    >
      {typeRegistration && (
        <input
          className={style.input}
          placeholder="Введите Ваше имя"
          type="text"
          required
          {...register('name')}
        />
      )}
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
      <button
        className={style.button}
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default AuthForm;
