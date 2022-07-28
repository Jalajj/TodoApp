// import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';
import './todo-item.css'
import { useGlobalContext } from '../context';
import { getAllTodos } from '../api/api';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo}) {
  const {localData, setChange} = useGlobalContext();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === 'done') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = async () => {
    const res = await fetch(`http://localhost:4000/task/${todo._id}/${localData.user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({status: 'done'})
    })
    const response = await res.json();
    if (response.error) {
      toast.error(response.error);
    }else{
     
      toast.success('Updated Successfully!');
    }
    setChecked(!checked);

  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:4000/task/${todo._id}/${localData.user._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({status: 'done'})
    })
    const response = await res.json();
    if (response.error) {
      toast.error(response.error);
    }else{
     setChange(3)
      toast.success('Todo deleted successfully!');
    }
     
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={'item'} variants={child}>
        <div className={'todoDetails'}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={'texts'}>
            <p
            className='todoText'
            >
              {todo.title}
            </p>
            <p className={'time'}>
            </p>
          </div>
        </div>
        <div className={'todoActions'}>
          <div
            className={'icon'}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={'icon'}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
       setChange={setChange}
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
