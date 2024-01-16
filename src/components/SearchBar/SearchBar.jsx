
import './SearchBar.css';
import React, { useState } from 'react'

export default function SearchBar(props) {

    
    return (
        <>

            <div className="search-bar-area">
                <input className='search-bar' type="text" onChange={(e) => {
                    props.onchangeEvent(e)
                }} placeholder={props.placeholder} value={props.val}/>
            </div>
        </>
    );
}
