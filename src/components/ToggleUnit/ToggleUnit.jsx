import React from 'react'
import '../SearchButton/SearchButton.css'


export default function ToggleUnit(props) {
  return (
    <>
        <button className='search-btn' style={{width:'max-content'}} onClick={props.toggleFunc}>{props.children} </button>
    </>
    )
}
