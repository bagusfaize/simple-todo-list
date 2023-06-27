import React from 'react';
import '../styles/header.scss';
import {Link} from 'react-router-dom';

export default function Navbar({title}) {
  return (
    <div 
        className="header"
        data-cy="header-background"
    >
        <div className='container'>
          <Link to={'/'}>
            {title}
          </Link>
        </div>
    </div>
  )
}
