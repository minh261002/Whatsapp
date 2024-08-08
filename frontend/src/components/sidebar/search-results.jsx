import Contact from './contact';
const SearchResults = ({ results }) => {
    console.log(results)
    return (
        <div className='convos scrollbar'>
            <div>
                <div className='flex flex-col pt-8 px-8'>
                    <h1 className="font-extralight text-md text-green_2">Contacts</h1>
                    <span className='w-full mt-4 ml-10 border-b dark:border-b-dark_border_1' />
                </div>

                <ul>
                    {
                        results && results.map((user) => (
                            <Contact contact={user} key={user._id} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchResults