import React from 'react';
import '../styles/list.scss';
import { FiTrash2 } from 'react-icons/fi';
import EditIcon from '../static/todo-title-edit-button.svg';

export default function List({ item, onChecklist, onEdit, onDeleteClick}) {
  const {title, priority, is_active} = item;
  return (
    <div className='col-12'>
      <div className='todo-list' data-cy="todo-item">
        <div className='body'>
          <input 
            type='checkbox' 
            onClick={() => onChecklist(item)} 
            defaultChecked={is_active === 0}
            data-cy="todo-item-checkbox"
          />
          <div 
            className={`priority ${priority}`}
            data-cy="todo-item-priority-indicator"
          ></div>
          <div 
            className={`title ${is_active === 0 ? 'non-active' : '' }`}
            data-cy="todo-item-title"
          >
              {title}
          </div>
          <div 
            className='edit-button' 
            data-cy="todo-item-edit-button"
            onClick={() => onEdit(item)}
          >
            <img src={EditIcon} alt='edit-todo-icon'/>
          </div>
        </div>
        <div 
          className='delete-button'
          onClick={() => onDeleteClick(item)}
          data-cy="todo-item-delete-button"
        >
          <FiTrash2 />  
        </div>
      </div>
    </div>
  )
}
