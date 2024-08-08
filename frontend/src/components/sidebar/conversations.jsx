import React from 'react'
import { useSelector } from 'react-redux';
import Conversation from './conversation';

const Conversations = () => {
    const { conversations } = useSelector((state) => state.chat);

    return (
        <div className='convos scrollbar'>
            <ul>
                {
                    conversations && conversations.map((convo) => (
                        <Conversation convo={convo} key={convo._id} />
                    ))
                }
            </ul>
        </div>
    )
}

export default Conversations