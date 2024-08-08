import { useSelector } from 'react-redux';
import { FaHistory } from "react-icons/fa";
import { BsChatDots, BsThreeDotsVertical } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

const SidebarHeader = () => {
    const { user } = useSelector((state) => state.user)
    return (
        <div className='h-[50px] dark:bg-dark_bg_2 flex items-center p16'>
            <div className="w-full flex items-center justify-between">
                <button className='btn'>
                    <img src={user.picture} alt="avatar" className='w-full h-full rounded-full object-cover' />
                </button>

                <ul className='flex items-center gap-x-2.5'>
                    <li>
                        <button className="btn">
                            <HiUserGroup className='dark:fill-dark_svg_1' size={24} />
                        </button>
                    </li>

                    <li>
                        <button className="btn">
                            <FaHistory className='dark:fill-dark_svg_1' size={24} />
                        </button>
                    </li>

                    <li>
                        <button className="btn">
                            <BsChatDots className='dark:fill-dark_svg_1' size={24} />
                        </button>
                    </li>

                    <li>
                        <button className="btn">
                            <BsThreeDotsVertical className='dark:fill-dark_svg_1' size={24} />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarHeader