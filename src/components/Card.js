import React from 'react';
import '../styles/card.scss';
import {FiTrash2} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import moment from 'moment/moment';

export default function Card({title, date}) {
  return (
    <Link to={'/detail'} className="col-3">
      <div 
          className="activity-card"
          // data-cy="header-background"
          >
        <div className="title">{title}</div>
        <div className="footer">
          <span className="date">{moment(date).format('DD MMMM YYYY')}</span>
          <span className="delete"><FiTrash2 /></span>
        </div>
      </div>
    </Link>
  )
}
