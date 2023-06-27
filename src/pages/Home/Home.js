import React from 'react';
import '../../styles/general.scss';
import Header from '../../components/Header';
import { Button } from 'react-bootstrap';
import {HiPlus} from 'react-icons/hi';
import EmptyState from '../../static/activity-empty-state.svg';
import Card from '../../components/Card';
import ContentLayout from '../../components/Content';

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
      <div className="title" data-cy="header-background">Activity</div>
      <Button data-cy="activity-add-button"><HiPlus />Tambah</Button>
    </div>
  )
}

const generateActivityCard = () => {
  return (
    <div className="row py-4">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default function Home() {
  return (
    <ContentLayout>
      {generateTitleBar()}
      {generateActivityCard()}
      {/* {emptyState()} */}
    </ContentLayout>
  )
}
