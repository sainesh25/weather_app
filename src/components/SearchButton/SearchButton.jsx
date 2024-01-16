import React from 'react'
import './SearchButton.css'

export default function SearchButton(props) {

    return (
        <>
        <div className="button-wrapper">
            <button className='search-btn' onClick={(e) => {
                props.onclickEvent();
            }}>{props.children}</button>
        </div>
        </>
    )
}
