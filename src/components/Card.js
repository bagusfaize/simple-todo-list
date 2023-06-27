import React from 'react';
import '../styles/card.scss';
import {FiTrash2} from 'react-icons/fi';

export default function Card({title}) {
  return (
    <div className="col-3">
      <div 
          className="activity-card"
          // data-cy="header-background"
      >
        <div className="title">New Activity</div>
        <div className="footer">
          <span className="date">10 Juni 2023</span>
          <span className="delete"><FiTrash2 /></span>
        </div>
      </div>
    </div>
  )
}
