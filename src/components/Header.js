import { useLocation } from 'react-router'
import React from 'react'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation()

    return (
        <header className="header">
           <h1>{title}</h1>
            {location.pathname === "/" && <Button onClick={onAdd} text={showAdd? "Close" : "Add"} color={showAdd? "red" : "black"}/>}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
}
export default Header

