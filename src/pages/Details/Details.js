import React, { useEffect, useState } from 'react'
import ContentLayout from '../../components/Content'
import { Button, Form } from 'react-bootstrap';
import { HiPlus, HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import EmptyState from '../../static/todo-empty-state.svg';
import EditIcon from '../../static/todo-title-edit-button.svg';
import SortIcon from '../../static/tabler_arrows-sort.svg';
import DeleteIcon from '../../static/modal-delete-icon.svg';
import ModalComponent from '../../components/Modal';
import axios from 'axios';
import { BASE_URL, priorityOptions } from '../../utils/Constant';
import {useParams} from 'react-router-dom';
import List from '../../components/List';
import Select from 'react-select';

export default function Details() {
  const {id} = useParams()
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [activityDetails, setActivityDetails] = useState({
    todo_items: []
  });
  const [showModal, setShowModal] = useState(false);
  const [titleActivity, setTitleActivity] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEditItem, setisEditItem] = useState(false);


  useEffect(() => {
    getActivityDetails()
  }, [])
  
  const getActivityDetails = () => {
    axios.get(`${BASE_URL}/activity-groups/${id}`, { params: { email: "bagus.faize@gmail.com" } })
    .then(res => {
      const { status, data } = res;
      if (status === 200) {
        setActivityDetails(data);
        setTitleActivity(data.title)
      }
    })
  }

  const emptyState = () => {
    return (
      <div className="d-flex justify-content-center py-5">
        <img src={EmptyState} alt='empty-state' width={500} />
      </div>
    )
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleChangeOption = (e) => {
    setSelectedOption(e)
  }

  const handleSubmitTodo = () => {
    const body = {
      activity_group_id: id,
      priority: selectedOption.value,
      title: itemName
    }
    axios.post(`${BASE_URL}/todo-items`, body)
    .then(res => {
      const { status } = res;
      if (status === 201) {
        getActivityDetails()
        handleClose()
        setItemName('')
        setSelectedOption('')
        }
    })
  }

  console.log('clg selected', selectedItem);

  const handleUpdateItem = () => {
    const body = {
      is_active: selectedItem.is_active,
      priority: selectedOption.value,
      title: itemName
    }
    axios.patch(`${BASE_URL}/todo-items/${selectedItem.id}`, body)
    .then(res => {
      const { status } = res;
      if (status === 200) {
        getActivityDetails()
        handleClose()
        setItemName('')
        setSelectedOption('')
        }
    })
  }

  const generateModal = () => {
    return (
      <ModalComponent 
      show={showModal} 
      modalTitle={isEditItem ? "Edit Item" : "Tambah List Item"}
      onClose={handleClose}
      header
      footer
      isEdit={isEditItem}
      onUpdate={handleUpdateItem}
      onSubmit={handleSubmitTodo}
      >
        <div className='add-modal'>
          <Form.Label data-cy="modal-add-name-title">NAMA LIST ITEM</Form.Label>
          <Form.Control
            data-cy="modal-add-name-input"
            type="text"
            value={itemName}
            placeholder="Tambahkan nama list item"
            onChange={(e) => setItemName(e.target.value)}
          />
          <Form.Label className="mt-3" data-cy="modal-add-priority-title">PRIORITY</Form.Label>
          <div className="col-4">
            <Select
              className="custom-select-option"
              placeholder="Pilih priority"
              value={selectedOption}
              options={priorityOptions}
              getOptionLabel={e => {
                return(
                <div>
                  <span>{e.icon}</span>
                  <span>{e.label}</span>
                </div>
                )
              }}
              onChange={handleChangeOption}
              isSearchable={false}
            />
          </div>
        </div>
      </ModalComponent>
    )
  }

  const handleEditTitle = () => {
    setIsEditTitle(!isEditTitle)
  }

  const handleOnBlur = () => {
    axios.patch(`${BASE_URL}/activity-groups/${id}`, { title: titleActivity })
    .then(res => {
      const { status, data } = res;
      if (status === 200) {
        setIsEditTitle(false);
        setTitleActivity(data.title)
      }
    })
  }

  const generateTitleBar = () => {
    return (
      <div className="d-flex justify-content-between my-3">
        <div
          className="title"
          data-cy="header-background"
        >
          <Link to={'/'} data-cy="todo-back-button">
            <HiChevronLeft />
          </Link>
            {
              isEditTitle ?
                <Form.Control 
                  onBlur={handleOnBlur}
                  type="text" 
                  className={`editableTitle`}
                  value={titleActivity}
                  onChange={(e) => setTitleActivity(e.target.value)}
                  />
              :
                <div data-cy="todo-title">{titleActivity}</div>
            }
          <div className='edit-title-button' onClick={handleEditTitle} data-cy="todo-title-edit-button">
            <img src={EditIcon} alt='edit-title-button'/>
          </div>
        </div>
        <div>
          <span className='sort-button' data-cy="todo-sort-button">
            <img src={SortIcon} alt='sort-icon' />
          </span>
          <Button data-cy="todo-add-button" onClick={handleShowModal}><HiPlus />Tambah</Button>
        </div>
      </div>
    )
  }

  const generateTodoList = () => {
    return(
      <div className='py-3'>
        {
          activityDetails && activityDetails.todo_items.map((item) => {
            return(
              <List 
                item={item}
                key={item.id}
                onEdit={handleEditItem}
                onChecklist={handleChecklist}
                onDeleteClick={() => handleDeleteItem(item)}
              />
            )
          })
        }
      </div>
    )
  }

  const handleEditItem = (detail) => {
    const selectedOpt = priorityOptions.find(item => item.value === detail.priority)
    setisEditItem(true)
    setSelectedItem(detail)
    setItemName(detail.title)
    setSelectedOption(selectedOpt)
    setShowModal(true)
  }

  const handleChecklist = (detail) => {
    const {id, is_active, priority} = detail;
    const body = {
      is_active: is_active === 1 ? 0 : 1,
      priority: priority
    };
    axios.patch(`${BASE_URL}/todo-items/${id}`, body)
    .then(res => {
      const { status } = res;
      if (status === 200) {
        getActivityDetails()
        }
    })
  }

  const handleCloseDeleteModal = () => {
    setSelectedItem({})
    setShowDeleteModal(false);
  }

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  }

  const deleteItem = () => {
    const id = selectedItem.id;
    axios.delete(`${BASE_URL}/todo-items/${id}`, { email: "bagus.faize@gmail.com" })
      .then(res => {
        const { status } = res;
        if (status === 200) {
          getActivityDetails()
          handleCloseDeleteModal()
        }
      })
  }

  const generateDeleteConfirmation = () => {
    return (
      <ModalComponent show={showDeleteModal} onClose={handleCloseDeleteModal}>
        <div className="delete-modal-body">
          <div>
            <img src={DeleteIcon} alt="delete-icon" />
            <div>Apakah anda yakin menghapus item</div>
            <div><b>{`"${selectedItem.title || ''}"?`}</b></div>
          </div>
          <div className='footer'>
            <Button onClick={handleCloseDeleteModal} className="cancel-btn" data-cy="cancel-delete-button" variant="light">Cancel</Button>
            <Button onClick={deleteItem} className="delete-btn" data-cy="activity-delete-button" variant="danger">Hapus</Button>
          </div>
        </div>
      </ModalComponent>
    )
  }

  return (
    <ContentLayout>
      {generateTitleBar()}
      { !activityDetails && activityDetails.todo_items && emptyState()}
      {generateTodoList()}
      {generateModal()}
      {generateDeleteConfirmation()}
    </ContentLayout>
  )
}
