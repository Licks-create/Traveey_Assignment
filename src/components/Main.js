import React from 'react'
import "../styles/Main.css"
import { Link, Outlet } from 'react-router-dom'


const Main = () => {
  return (
    <div className='parent'>
        <header className='header'>
            <Link to="/" className='logo'>
                Home
            </Link>
            <div className='about'>
            <Link to="https://funny-truffle-75736f.netlify.app/" target='_blank'>
                developer
            </Link>
            </div>
            <nav className="navbar">
               <h2>Traveey Quiz Demo</h2>
            </nav>
        </header>
        <Outlet/>
    </div>
  )
}

export default Main
