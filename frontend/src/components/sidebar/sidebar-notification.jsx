import React from 'react'
import { IoNotificationsOffCircleSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const SidebarNotification = () => {
    return (
        <div className='h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px]'>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <IoNotificationsOffCircleSharp className='dark:fill-blue_1' size={48} />
                    <div className="flex flex-col">
                        <span className="textPrimary">Get notified of new message</span>
                        <span className="textSecondary mt-0.5 flex items-center gap-0.5">
                            <span>Turn on desktop notification</span>
                            <span className="text-blue_1">Learn more</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className='cursor-pointer'>
                <IoMdClose className='dark:fill-dark_svg_2' size={28} />
            </div>
        </div>
    )
}

export default SidebarNotification