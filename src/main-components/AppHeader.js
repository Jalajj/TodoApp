import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import TodoModal from './TodoModal';
import './app-content.css'
import { useGlobalContext } from '../context';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const { setChange, setPriority} = useGlobalContext()

  const updateFilter = (e) => {
     setPriority(e.target.value)
     setChange(e.target.value)
  };

  return (
    <div className={'appHeader'}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <select
      style={{width:'auto'}}
      className='button button__select' onChange={(e) => updateFilter(e)}>
        <option value={false}>All</option>
        <option value={true}>Priority</option>
    </select>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
