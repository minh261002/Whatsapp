import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { changeStatus, createUser } from '../../store/features/userSlice';
import { useState } from 'react';
import Picture from './Picture';
import axios from 'axios';

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloud_secret = import.meta.env.VITE_CLOUDINARY_CLOUD_SECRET;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector(state => state.user);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(signUpSchema) });

  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState();

  const onSubmit = async (data) => {
    dispatch(changeStatus('loading'));
    if (picture) {
      await uploadImage().then(async (response) => {
        let res = await dispatch(createUser({ ...data, picture: response.secure_url }));
        if (res?.payload?.user) {
          navigate('/');
        }
      });
    } else {
      let res = await dispatch(createUser({ ...data }));
      if (res?.payload?.user) {
        navigate('/');
      }
    }
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append('upload_preset', cloud_secret);
    formData.append('file', picture);
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
    return data;
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center overflow-hidden'>
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign Up</p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name='name'
            type='text'
            placeholder='Name'
            register={register}
            error={errors?.name?.message}
          />

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

          <AuthInput
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            register={register}
            error={errors?.confirmPassword?.message}
          />

          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
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
            {status == 'loading' ? <PulseLoader color='#fff' size={16} /> : 'Sign Up'}
          </button>

          <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='hover:underline cursor-pointer transition ease-in duration-300'>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm