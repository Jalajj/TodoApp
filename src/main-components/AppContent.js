import { AnimatePresence, motion } from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {getAllTodos} from '../api/api'
import TodoItem from './TodoItem';
import './app-content.css'
import { useGlobalContext } from '../context';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const [todos, setTodos] = useState([])
  const {change, priority} = useGlobalContext()


useEffect(() => {
    getAllTodos('http://localhost:4000/tasks?priority=' + priority).then((data) => {
      setTodos(data)
    }).catch((err) => {
      console.log(err)
    })
}, [change])

  return (
    <motion.div
      className={'content__wrapper'}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
      {todos.length && todos.map((todo, i) => {
        return (
          <motion.div key={i} variants={child}>
            <TodoItem todo={todo} />
         </motion.div>
        )
      })}
     
        {/* {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            // <motion.div key={todo.id} variants={child}>
            <TodoItem key={todo.id} todo={todo} />
            // </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )} */}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
