import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AppRoutes } from '../../const';

type FormData = {
  email: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await dispatch(loginAction(data));
      if (response.meta.requestStatus === 'fulfilled') {
        navigate(AppRoutes.Main);
      }
    } catch (error) {
      // Handle error, for example, display error message
    }
  };

  return (
    <main className="decorated-page login">
      <Helmet>
        <title>
          Escape Room. Login
        </title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-size-m.jpg"
            srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
            width={1366}
            height={768}
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
            }}
            className="login-form"
            action="https://echo.htmlacademy.ru/"
            method="post"
          >
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">
                    E&nbsp;–&nbsp;mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Адрес электронной почты"
                    {...register('email', { required: 'Это поле обязательно' })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: 'Это поле обязательно',
                      pattern: {
                        value: /^.*(?=.*[a-zA-Z])(?=.*\d).*$/,
                        message: 'Пароль должен состоять только из латинских букв и цифр, и быть не менее 2 символов в длину'
                      },
                      minLength: {
                        value: 3,
                        message: 'Пароль должен состоять минимум из 3 символов'
                      },
                      maxLength: {
                        value: 15,
                        message: 'Пароль должен состоять максимум из 15 символов'
                      }
                    })}
                    placeholder="Пароль"
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
              <button
                className="btn btn--accent btn--general login-form__submit"
                type="submit"
              >
                Войти
              </button>
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input
                type="checkbox"
                id="id-order-agreement"
                name="user-agreement"
                required
              />
              <span className="custom-checkbox__icon">
                <svg width={20} height={17} aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Я&nbsp;согласен с
                <a className="link link--active-silver link--underlined" href="#">
                  правилами обработки персональных данных
                </a>
                &nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
