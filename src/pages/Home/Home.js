import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/general.scss';
import { Button } from 'react-bootstrap';
import {HiPlus} from 'react-icons/hi';
import EmptyState from '../../static/activity-empty-state.svg';
import Card from '../../components/Card';
import ContentLayout from '../../components/Content';
import {BASE_URL} from '../../utils/Constant';

export default function Home() {
  const [activityList, setActivityList] = useState([])

  useEffect(() => {
    getActivity()
  }, [])

  const getActivity = () => {
    axios.get(`${BASE_URL}/activity-groups?`, { params: {email: "bagus.faize@gmail.com"} })
    .then(res => {
      const {status, data} = res;
      if (status === 200) {
        setActivityList(data.data)
      }
    })
  }

  const addActivity = () => {
    axios.post(`${BASE_URL}/activity-groups?`, { email: "bagus.faize@gmail.com", title: "New Activity" })
    .then(res => {
      const {status} = res;
      if (status === 201) {
        getActivity()
      }
    })
  }

  const generateActivityCard = () => {
    return (
      <div className="row py-4">
        {
          activityList.map((item) => {
            const {title, created_at} = item;
            return (
              <Card title={title} date={created_at}/>
            )
          }) 
        }
      </div>
    )
  }

  const generateTitleBar = () => {
    return(
      <div className="d-flex justify-content-between my-3">
        <div className="title" data-cy="header-background">Activity</div>
        <Button onClick={addActivity} data-cy="activity-add-button"><HiPlus />Tambah</Button>
      </div>
    )
  }

  const emptyState = () => {
    return (
      <div className="d-flex justify-content-center py-5">
        <img src={EmptyState} alt='empty-state' width={500}/>
      </div>
    )
  }

  return (
    <ContentLayout>
      {generateTitleBar()}
      {generateActivityCard()}
      { !activityList.length && emptyState()}
    </ContentLayout>
  )
}
