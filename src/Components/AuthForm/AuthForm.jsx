import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import style from './AuthForm.module.scss';

const AuthForm = ({ typeRegistration = false, handler }) => {
  const { register, handleSubmit, reset } = useForm();

  const onError = errors => {
    Object.values(errors).forEach(errors => {
      toast.error(errors.message);
    });
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(data => {
        handler(data);
        reset();
      }, onError)}
    >
      {typeRegistration && (
        <input
          className={style.input}
          placeholder="Введите Ваше имя"
          type="text"
          required
          {...register('name', {
            required: 'Имя обязательно для заполнения!',
          })}
        />
      )}
      <input
        className={style.input}
        placeholder="Введите Ваш email"
        type="email"
        required
        {...register('email', {
          required: 'Email обязателен для заполнения!',
          pattern: {
            value: /^[a-zA-z0-9_.+-]+@[a-zA-z0-9-]+\.[a-zA-z0-9-.]+$/,
            message: 'Введите корректный email!',
          },
        })}
      />
      <input
        className={style.input}
        placeholder="Введите Ваш пароль"
        type="password"
        required
        {...register('password', {
          required: 'Пароль обязателен для заполнения!',
          minLength: {
            value: 6,
            message: 'Пароль должен быть не менее 6 символов!',
          },
        })}
      />
      <button
        className={style.button}
        type="submit"
      >
        {typeRegistration ? 'Зарегистрироваться' : 'Войти'}
      </button>
    </form>
  );
};

export default AuthForm;
