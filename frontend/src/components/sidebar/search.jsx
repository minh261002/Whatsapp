import React, { useState } from 'react'
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

const Search = ({ searchLength }) => {
    const [show, setShow] = useState(false);
    const handleSearch = (e) => { };

    return (
        <div className='h-[49px] py-1.5 '>
            <div className='px-[10px]'>
                <div className="flex items-center gap-x-2">
                    <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
                        {show || searchLength > 0 ?
                            (
                                <span className='w-8 flex items-center justify-center rotateAnimation'>
                                    <FaArrowLeft className='fill-green_1 w-5' size={28} />
                                </span>
                            ) : (
                                <span className='w-8 flex items-center justify-center rotateAnimation'>
                                    <FaSearch className='dark:fill-dark_svg_2 w-5' size={28} />
                                </span>
                            )
                        }

                        <input type='text'
                            placeholder='Search or start new chat'
                            className='input'
                            onFocus={() => setShow(true)}
                            onBlur={() => searchLength == 0 && setShow(false)}
                            onKeyDown={(e) => handleSearch(e)}
                        />
                    </div>

                    <button className='btn'>
                        <IoFilter className='dark:fill-dark_svg_2' size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search