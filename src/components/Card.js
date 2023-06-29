import React from 'react';
import '../styles/card.scss';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

export default function Card({ item, onDeleteClick}) {
  const {title, date, id} = item;
  return (
    <div className="col-3">
      <div
        className="activity-card"
        data-cy="activity-item"
      >
        <Link to={`/details/${id}`}>
          <div className="title" data-cy="activity-item-title">{title}</div>
        </Link>
        <div className="footer">
          <span className="date" data-cy="activity-item-date">{moment(date).format('DD MMMM YYYY')}</span>
          <span
            onClick={onDeleteClick}
            className="delete"
            data-cy="activity-item-delete-button"
          >
            <FiTrash2 />
          </span>
        </div>
      </div>
    </div>
  )
}
