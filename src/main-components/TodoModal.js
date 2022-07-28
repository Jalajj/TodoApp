import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from './Button';
import './modal.css'
import { useGlobalContext } from '../context';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState('todo');
  const {localData, setChange} = useGlobalContext()

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setPriority(todo.priority);
    } else {
      setTitle('');
      setPriority('low');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && priority) {
      const data =  {
        title,
        priority
      }
      if(type === 'add'){
      const res = await fetch('http://localhost:4000/create/' + localData.user._id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
      })
      const response = await res.json();
      console.log(response)
      if (response.error) {
        toast.error(response.error);
      }else{
        
        toast.success('Task added successfully');
        setChange(10)
      }
    }
      if (type === 'update') {
        if (todo.title !== title || todo.priority !== priority) {
          const res = await fetch(`http://localhost:4000/task/${todo._id}/${localData.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({title, priority,status})
      })
      const response = await res.json();
      if (response.error) {
        toast.error(response.error);
      }else{
        setChange(7)
        toast.success('Task updated successfully');
      }
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
      setChange(11)
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={'wrapper'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={'container'}
            style={{width:'auto'}}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={'closeButton'}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            {/* onSubmit={(e) => handleSubmit(e)} */}
            <form className={'form'} onSubmit={(e) => handleSubmit(e)} >
              <h1 className={'formTitle'}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Priority
                <select
                  id="type"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                 <option value={0}>Low</option>
                  <option value={100}>High</option>
                </select>
              </label>
            
                {/* <label htmlFor="type">
                Status
                <select
                  id="type"
                  // value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                 <option value="todo">Incomplete</option>
                  <option value="done">Complete</option>
                </select>
              </label>
              */}
              <div className={'buttonContainer'}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
