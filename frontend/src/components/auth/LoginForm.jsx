import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/features/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector(state => state.user);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (values) => {
    let res = await dispatch(loginUser({ ...values }));
    if (res?.payload?.user) {
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center overflow-hidden'>
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign In</p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name='email'
            type='email'
            placeholder='Email address'
            register={register}
            error={errors?.email?.message}
          />

          <AuthInput
            name='password'
            type='password'
            placeholder='Password'
            register={register}
            error={errors?.password?.message}
          />
          {
            status == 'failed' && (
              <div className='text-red-500 text-xs italic'>
                {error}
              </div>
            )
          }

          <button
            className='flex justify-center w-full bg-green_1 text-gray-100 p-2 rounded-lg tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
            type="submit">
            {status == 'loading' ? <PulseLoader color='#fff' size={16} /> : 'Sign In'}
          </button>

          <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
            <span>Don't have an account?</span>
            <Link to='/register' className='hover:underline cursor-pointer transition ease-in duration-300'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm