import React, { useEffect, useRef, useState } from 'react'
import ContentLayout from '../../components/Content'
import { Button, Dropdown, Form } from 'react-bootstrap';
import { HiPlus, HiChevronLeft, HiCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import EmptyState from '../../static/todo-empty-state.svg';
import EditIcon from '../../static/todo-title-edit-button.svg';
import SortIcon from '../../static/tabler_arrows-sort.svg';
import DeleteIcon from '../../static/modal-delete-icon.svg';
import InfoIcon from '../../static/modal-information-icon.svg';
import ModalComponent from '../../components/Modal';
import axios from 'axios';
import { BASE_URL, priorityOptions, sortOptions } from '../../utils/Constant';
import {useParams} from 'react-router-dom';
import List from '../../components/List';
import Select from 'react-select';

export default function Details() {
  const titleRef = useRef(null)
  const {id} = useParams()
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [todoItems, setTodoItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleActivity, setTitleActivity] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEditItem, setisEditItem] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedSort, setSelectedSort] = useState('sort-latest')

  useEffect(() => {
    getActivityDetails()
  }, [])

  useEffect(() => {
      isEditTitle && titleRef && titleRef.current.focus()
  }, [isEditTitle])
  
  
  const getActivityDetails = () => {
    axios.get(`${BASE_URL}/activity-groups/${id}`, { params: { email: "bagus.faize@gmail.com" } })
    .then(res => {
      const { status, data } = res;
      if (status === 200) {
        setTodoItems(data.todo_items);
        setTitleActivity(data.title)
      }
    })
  }

  const emptyState = () => {
    return (
      <div className="d-flex justify-content-center py-5">
        <img data-cy="todo-empty-state" src={EmptyState} alt='empty-state' width={500} />
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
        modalCy="modal-add"
        show={showModal} 
        modalTitle={isEditItem ? "Edit Item" : "Tambah List Item"}
        onClose={handleClose}
        header
        footer
        isEdit={isEditItem}
        disableButton={!itemName || !selectedOption}
        onUpdate={handleUpdateItem}
        onSubmit={handleSubmitTodo}
        btnCy="modal-add-save-button"
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
            <div data-cy="modal-add-priority-dropdown" htmlFor="modal-add-priority-dropdown">
              <Select
                id='modal-add-priority-dropdown'
                className="custom-select-option"
                placeholder="Pilih priority"
                value={selectedOption}
                options={priorityOptions}
                getOptionLabel={e => {
                  return(
                  <div data-cy={`modal-add-priority-item`}>
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
        </div>
      </ModalComponent>
    )
  }

  const handleEditTitle = () => {
    setIsEditTitle(true)
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
            ref={titleRef}
            onBlur={handleOnBlur}
            type="text"
            className={`editableTitle ${isEditTitle ? 'isEdit' : ''}`}
            value={titleActivity}
            onClick={handleEditTitle}
            onChange={(e) => setTitleActivity(e.target.value)}
          />
            :
              <div
                data-cy="todo-title"
                onClick={handleEditTitle}
              >
                {titleActivity}
              </div>
          }
          <div className='edit-title-button' onClick={handleEditTitle} data-cy="todo-title-edit-button">
            <img src={EditIcon} alt='edit-title-button'/>
          </div>
        </div>
        <div>
          <Dropdown style={{display:'inline-block'}}>
            <Dropdown.Toggle className='sort-button' variant='light' data-cy="todo-sort-button">
              <img src={SortIcon} alt='sort-icon' />
            </Dropdown.Toggle>
            <Dropdown.Menu data-cy="sort-parent" >
              {
                sortOptions.map((item) => {
                  return(
                    <Dropdown.Item
                      className='sort-item'
                      onClick={() => handleSort(item.value)}
                      data-cy="sort-selection"
                    >
                      <span>
                        <img src={require(`../../static/${item.value}.svg`)} alt={item.value} />
                        {item.label}
                      </span>
                      { selectedSort === item.value && <HiCheck/> }
                    </Dropdown.Item>
                  )
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          <Button data-cy="todo-add-button" onClick={handleShowModal}><HiPlus />Tambah</Button>
        </div>
      </div>
    )
  }

  const handleSort = (selected) => {
    setSelectedSort(selected);
    const temp = [...todoItems]
    if (selected === 'sort-latest') {
      temp.sort((a,b) => b.id - a.id);
    } else if (selected === 'sort-oldest') {
      temp.sort((a,b) => a.id - b.id);
    } else if (selected === 'sort-az') {
      temp.sort((a,b) => a.title.localeCompare(b.title))
    } else if (selected === 'sort-za') {
      temp.sort((a,b) => b.title.localeCompare(a.title))
    } else if (selected === 'sort-unfinished') {
      temp.sort((a,b) => b.is_active - a.is_active);
    }
    setTodoItems(temp);
  }

  const generateTodoList = () => {
    return(
      <div className='py-3'>
        {
          todoItems.map((item) => {
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
        handleSort(selectedSort)
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
          handleShowAlertTemporary()
        }
      })
  }

  const generateDeleteConfirmation = () => {
    return (
      <ModalComponent 
        show={showDeleteModal} 
        onClose={handleCloseDeleteModal}
        modalCy="modal-delete"  
      >
        <div className="delete-modal-body">
          <div>
            <img src={DeleteIcon} alt="delete-icon" />
            <div>Apakah anda yakin menghapus item</div>
            <div><b>{`"${selectedItem.title || ''}"?`}</b></div>
          </div>
          <div className='footer'>
            <Button onClick={handleCloseDeleteModal} className="cancel-btn" data-cy="modal-delete-cancel-button" variant="light">Cancel</Button>
            <Button onClick={deleteItem} className="delete-btn" data-cy="modal-delete-confirm-button" variant="danger">Hapus</Button>
          </div>
        </div>
      </ModalComponent>
    )
  }

  const generateAlert = () => {
    return (
      <ModalComponent show={showAlert} onClose={()=> setShowAlert(false)} modalCy="modal-information">
        <div className="info-alert">
          <span><img src={InfoIcon} alt="info-icon" /></span>
          <span>Item berhasil dihapus</span>
        </div>
      </ModalComponent>
    )
  }

  const handleShowAlertTemporary = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000);
  }

  return (
    <ContentLayout>
      {generateTitleBar()}
      { todoItems.length === 0 && emptyState()}
      {generateTodoList()}
      {generateModal()}
      {generateDeleteConfirmation()}
      {generateAlert()}
    </ContentLayout>
  )
}
