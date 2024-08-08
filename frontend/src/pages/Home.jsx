import React, { useEffect } from 'react'
import SideBar from '../components/sidebar/sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../store/features/chatSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  return (
    <div className='min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
      <div className="container min-h-screen flex">
        <SideBar />
      </div>
    </div>
  )
}

export default Home