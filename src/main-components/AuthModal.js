import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from './Button';
import './modal.css'

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

function AuthModal({ type, modalOpen, setModalOpen }) {

  const [email, setEmail] = useState('');
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (email === '' || password==='') {
      toast.error('Please enter details');
      return;
    }
        const data =  {
            email,
            username,
            password
          }
          const res = await fetch('http://localhost:4000/'+ type, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
          })
          const response = await res.json();
          console.log(response)
          if(response.error){
            toast.error(response.error);
          }else{
            if(type==='signin'){
              localStorage.setItem('auth', JSON.stringify(response))
            }
          
            toast.success('Authentication successful');
          }
         
    //     } else {
    //       toast.error('No changes made');
    //       return;
    //     }
    //   }
      setModalOpen(false);
    window.location.reload(true)
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

            <form className={'form'} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={'formTitle'}>
                {type === 'signup' ? 'Register' : 'Login'}
              </h1>
              <label htmlFor="title">
                Email
                <input
                  type="email"
                  id="name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
             {type === 'signup' && <label htmlFor="username">
                Name
                <input
                  type="text"
                  id="name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>}
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="title"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
             
              <div className={'buttonContainer'}>
                <Button type="submit" variant="primary">
                  {type === 'signup' ? 'Register' : 'Login'}
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

export default AuthModal;
