import React from 'react'
import ContentLayout from '../../components/Content'
import { Button } from 'react-bootstrap';
import {HiPlus, HiChevronLeft} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import EmptyState from '../../static/todo-empty-state.svg';

const emptyState = () => {
  return (
    <div className="d-flex justify-content-center py-5">
      <img src={EmptyState} alt='empty-state' width={500}/>
    </div>
  )
}

const generateTitleBar = () => {
  return(
    <div className="d-flex justify-content-between my-3">
      <div 
        className="title" 
        data-cy="header-background"
      >
        <Link to={'/'}>
          <HiChevronLeft />
        </Link>
        Activity Details
      </div>
      <Button data-cy="activity-add-button"><HiPlus />Tambah</Button>
    </div>
  )
}

export default function Details() {
  return (
    <ContentLayout>
      {generateTitleBar()}
      {emptyState()}
    </ContentLayout>
  )
}
