import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login'
import Dashboard from './Dashboard'
import { ContactsProvider } from '../context/ContactsProvider'
import { ConversationsProvider } from '../context/ConversationsProvider'
import { SocketProvider } from '../context/SocketProvider'



function App() {
  const [id, setId] = useLocalStorage('id')

  const dashbord = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashbord : <Login onIdSubmit={setId} />
  )
}

export default App;
