import React from 'react';
import '../styles/list.scss';
import { FiTrash2 } from 'react-icons/fi';
import EditIcon from '../static/todo-title-edit-button.svg';

export default function List({ item, onChecklist, onEdit, onDeleteClick}) {
  const {title, priority, is_active} = item;
  return (
    <div className='col-12'>
      <div className='todo-list'>
        <div className='body'>
          <input type='checkbox' onClick={() => onChecklist(item)} defaultChecked={is_active === 0}/>
          <div className={`priority ${priority}`}></div>
          <div className={`title ${is_active === 0 ? 'non-active' : '' }`}>{title}</div>
          <div className='edit-button' onClick={() => onEdit(item)}>
            <img src={EditIcon} alt='edit-todo-icon'/>
          </div>
        </div>
        <div className='delete-button' onClick={() => onDeleteClick(item)}>
          <FiTrash2 />  
        </div>
      </div>
    </div>
  )
}
