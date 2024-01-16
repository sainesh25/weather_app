import React from 'react'
import './Message.css'
export default function Message(props) {
    return (
        <>
            <h1 className='no-data-error'>{props.children}</h1>
        </>
    );
}
