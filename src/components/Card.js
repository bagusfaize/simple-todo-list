import React from 'react';
import '../styles/card.scss';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

export default function Card({ item, onDeleteClick }) {
  const { title, date, id } = item;
  const navigate = useNavigate()

  const goToDetails = () => {
    navigate(`/details/${id}`)
  }

  return (
    <div className="col-3">
      <div
        onClick={goToDetails}
        className="activity-card"
        data-cy="activity-item"
      >
        <div className="title" data-cy="activity-item-title">{title}</div>
        <div className="footer">
          <span className="date" data-cy="activity-item-date">{moment(date).format('DD MMMM YYYY')}</span>
          <span
            onClick={(e) => onDeleteClick(e, item)}
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
