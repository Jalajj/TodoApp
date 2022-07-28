import React, {useContext} from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [mobileScreen, setMobileScreen] = React.useState(window.matchMedia("(max-width: 500px)").matches)
    const [localData, setLocalData] = React.useState(JSON.parse(localStorage.getItem('auth')))
    const [showModal, updateShowModal] = React.useState(false);
    const [change, setChange] = React.useState(null)
    const [priority , setPriority] = React.useState(false)

  const toggleModal = () => updateShowModal(state => !state);

    React.useEffect(() => {
        const handler = e => setMobileScreen( e.matches);
        window.matchMedia("(max-width: 500px)").addEventListener('change', handler);
        console.log(mobileScreen, 'Mobile')
       }, [mobileScreen]);

       return (
        <AppContext.Provider value={{mobileScreen, localData, setLocalData, showModal, 
        updateShowModal, toggleModal, change, setChange, priority, setPriority}}>
            {children}
        </AppContext.Provider>
         )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
  }
  
  export { AppContext, AppProvider }