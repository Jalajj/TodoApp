
import { Toaster } from 'react-hot-toast';
// import AddButton from './components/AddButton';
// import AddInput from './components/AddInput';
// import TaskTable from './components/TaskTable';
// import TasksLayout from './layouts/TasksLayout';
import AppContent from './main-components/AppContent';
import AppHeader from './main-components/AppHeader';
import './main-components/app-content.css'
import { useGlobalContext } from './context';
import Button from './main-components/Button';
import AuthModal from './main-components/AuthModal';
import { useState } from 'react';

function App() {
  const [type, setType] = useState('')
  const {mobileScreen, localData} = useGlobalContext()
  const [modalOpen, setModalOpen] = useState(false)
  

  const handleSign = () => {
   setType('signup')
   setModalOpen(true)
  }

  const handleLog = () => {
    setType('signin')
    setModalOpen(true)
   }

  return (
    <>
    <div style={{display:'flex', flexDirection : 'column' ,justifyContent:'center', alignItems:'center', padding:20}}>
    <h2 className='title'>TODO LIST APP</h2>
    {localData ? 
    <h2 className='formTitle' style={{textAlign:'center'}}>Welcome to the todo list app {localData.user.username}!</h2>
     : <div style={{flexDirection:'row'}}>
      <Button variant="secondary" onClick={handleLog}>
                  Login
                </Button>
                <Button variant="secondary" onClick={handleSign}>
                  Register
                </Button>
                </div>  
      }
    
      </div>
    <div className= "container"style={mobileScreen ? {marginTop:30, width:'95vw'} : {marginTop:20}}>
      {/* <PageTitle>TODO List</PageTitle> */}
      
      <div className={'app__wrapper'}>
        <AppHeader />
        <AppContent />
      </div>
    </div>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontSize: '1.4rem',
        },
      }}
    />
     <AuthModal
        type={type}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
  </>
  );
}

export default App;
