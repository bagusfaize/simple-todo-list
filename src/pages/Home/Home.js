import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/general.scss';
import { Button } from 'react-bootstrap';
import { HiPlus } from 'react-icons/hi';
import EmptyState from '../../static/activity-empty-state.svg';
import DeleteIcon from '../../static/modal-delete-icon.svg';
import InfoIcon from '../../static/modal-information-icon.svg';
import Card from '../../components/Card';
import ContentLayout from '../../components/Content';
import { BASE_URL } from '../../utils/Constant';
import ModalComponent from '../../components/Modal';

export default function Home() {
  const [activityList, setActivityList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getActivity()
  }, [])

  const getActivity = () => {
    axios.get(`${BASE_URL}/activity-groups?`, { params: { email: "bagus.faize@gmail.com" } })
      .then(res => {
        const { status, data } = res;
        if (status === 200) {
          setActivityList(data.data)
        }
      })
  }

  const addActivity = () => {
    axios.post(`${BASE_URL}/activity-groups?`, { email: "bagus.faize@gmail.com", title: "New Activity" })
      .then(res => {
        const { status } = res;
        if (status === 201) {
          getActivity()
        }
      })
  }

  const deleteActivity = () => {
    const id = selectedActivity.id;
    axios.delete(`${BASE_URL}/activity-groups/${id}`, { email: "bagus.faize@gmail.com" })
      .then(res => {
        const { status } = res;
        if (status === 200) {
          getActivity()
          handleCloseDeleteModal()
          handleShowAlertTemporary()
        }
      })
  }

  const generateActivityCard = () => {
    return (
      <div className="row py-4">
        {
          activityList.map((item, i) => {
            const { title, created_at } = item;
            return (
              <Card
                title={title}
                date={created_at}
                key={title + created_at}
                onDeleteClick={() => handleDeleteActivity(item)}
              />
            )
          })
        }
      </div>
    )
  }

  const handleDeleteActivity = (item) => {
    setSelectedActivity(item)
    setShowDeleteModal(true)
  }

  const generateTitleBar = () => {
    return (
      <div className="d-flex justify-content-between my-3">
        <div className="title" data-cy="header-background">Activity</div>
        <Button onClick={addActivity} data-cy="activity-add-button"><HiPlus />Tambah</Button>
      </div>
    )
  }

  const emptyState = () => {
    return (
      <div className="d-flex justify-content-center py-5">
        <img src={EmptyState} alt='empty-state' width={500} />
      </div>
    )
  }

  const handleCloseDeleteModal = () => {
    setSelectedActivity({});
    setShowDeleteModal(false);
  }

  const handleShowAlertTemporary = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 2500);
  }

  const generateDeleteConfirmation = () => {
    return (
      <ModalComponent show={showDeleteModal} onClose={handleCloseDeleteModal}>
        <div className="delete-modal-body">
          <div>
            <img src={DeleteIcon} alt="delete-icon" />
            <div>Apakah anda yakin menghapus activity</div>
            <div><b>{`"${selectedActivity.title || ''}"?`}</b></div>
          </div>
          <div className='footer'>
            <Button onClick={handleCloseDeleteModal} className="cancel-btn" data-cy="cancel-delete-button" variant="light">Cancel</Button>
            <Button onClick={deleteActivity} className="delete-btn" data-cy="activity-delete-button" variant="danger">Hapus</Button>
          </div>
        </div>
      </ModalComponent>
    )
  }

  const generateAlert = () => {
    return (
      <ModalComponent show={showAlert} onClose={()=> setShowAlert(false)}>
        <div className="info-alert">
          <span><img src={InfoIcon} alt="info-icon" /></span>
          <span>Activity berhasil dihapus</span>
        </div>
      </ModalComponent>
    )
  }

  return (
    <ContentLayout>
      {generateTitleBar()}
      {generateActivityCard()}
      {!activityList.length && emptyState()}
      {generateDeleteConfirmation()}
      {generateAlert()}
    </ContentLayout>
  )
}
