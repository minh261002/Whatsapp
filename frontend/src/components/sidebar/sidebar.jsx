import React, { useState } from 'react'
import SidebarHeader from './sidebar-header'
import SidebarNotification from './sidebar-notification'
import Search from './search'
import Conversations from './conversations'
import SearchResults from './search-results'

const SideBar = () => {
    const [searchResutls, setSearchResults] = useState([]);

    return (
        <div className='w-[40%] h-full select-none'>
            <SidebarHeader />
            <SidebarNotification />
            <Search searchLength={searchResutls.length} setSearchResults={setSearchResults} />
            {/* <Conversations /> */}

            {
                searchResutls.length > 0 ? (
                    <>
                        <SearchResults results={searchResutls} />
                    </>
                ) : (
                    <>
                        <Conversations />
                    </>
                )
            }
        </div>
    )
}

export default SideBar