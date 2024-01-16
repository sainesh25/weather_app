import React from 'react'
import './AppHeading.css'

export default function AppHeading(props) {
    return (
        <>
            <h1>{props.children}</h1>
        </>
    )
}
