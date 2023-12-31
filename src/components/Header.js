import React from 'react';
import '../styles/header.scss';
import {Link} from 'react-router-dom';

export default function Header({title}) {
  return (
    <div 
        className="header"
        data-cy="header-background"
    >
        <div className='container'>
          <Link to={'/'} data-cy="header-title">
            {title}
          </Link>
        </div>
    </div>
  )
}
