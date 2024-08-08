import React, { useState } from 'react'
import SidebarHeader from './sidebar-header'
import SidebarNotification from './sidebar-notification'
import Search from './search'

const SideBar = () => {
    const [searchResutls, setSearchResults] = useState([]);
    return (
        <div className='w-[40%] h-full select-none'>
            <SidebarHeader />
            <SidebarNotification />
            <Search searchLength={searchResutls.length} />
        </div>
    )
}

export default SideBar