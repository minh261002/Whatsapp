import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Search = ({ searchLength, setSearchResults }) => {
    const [show, setShow] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { token } = user;

    const handleSearch = async (e) => {
        if (e.target.value && e.key === 'Enter') {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/user?search=${e.target.value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setSearchResults(data);
            } catch (error) {
                console.log(error.response.data.error.message);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleCloseSearch = (e) => {
        setSearchResults([]);
        document.querySelector('.input').value = '';
    };

    return (
        <div className='h-[49px] py-1.5 '>
            <div className='px-[10px]'>
                <div className="flex items-center gap-x-2">
                    <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
                        {show || searchLength > 0 ?
                            (
                                <span className='w-8 flex items-center justify-center rotateAnimation cursor-pointer'
                                    onClick={handleCloseSearch}
                                >
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