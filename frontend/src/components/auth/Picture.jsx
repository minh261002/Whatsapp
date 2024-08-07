import React, { useRef, useState } from 'react'

const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
    const inputRef = useRef();
    const [error, setError] = useState();
    const handlePicture = (e) => {
        let pic = e.target.files[0];

        if (pic.type !== "image/jpeg" && pic.type !== "image/jpg" && pic.type !== "image/png" && pic.type !== "image/webp") {
            setError('Invalid image format');
            return;
        } else if (pic.size > 1024 * 1024 * 5) {
            setError('Image size too large');
            return;
        } else {
            setError(null);
            setPicture(pic);
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onloadend = (e) => {
                setReadablePicture(e.target.result);
            }
        }
    };

    const handleChangePic = () => {
        setPicture(null);
        setReadablePicture(null);
        inputRef.current.click();
    }

    return (
        <div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
            <label htmlFor="picture" className='text-sm font-bold tracking-wide'>
                Picture
            </label>

            {
                readablePicture ? (
                    <div>
                        <img src={readablePicture} alt='profile' className='w-20 h-20 object-cover rounded-full' />

                        <div
                            onClick={handleChangePic}
                            className='mt-2 w-20 h-10 dark:bg-dark_bg_3 rounded-md text-sm flex items-center justify-center cursor-pointer'>
                            Change
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => inputRef.current.click()}
                        className='w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer'>
                        Upload a picture
                    </div>
                )
            }

            <input type='file' name='picture' id='picture' hidden ref={inputRef} onChange={handlePicture}
                accept='image/png, image/jpeg, image/jpg, image/webp'
            />

            <div className="mt-2">
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
        </div>
    )
}

export default Picture