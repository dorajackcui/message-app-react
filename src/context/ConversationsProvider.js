import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from '../context/ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations(){
  return useContext(ConversationsContext)
}

export function ConversationsProvider({id, children}) {
  
  const {contacts} = useContacts()
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setselectedConversationIndex] = useState(0)
  const socket = useSocket()

  function createConversation(recipients){
    setConversations(prevConversations => {
      return[...prevConversations, { recipients, messages:[]}]
    })
  }

  
  const addMessagesToConversation  = useCallback( ({ recipients, text, sender }) => {
    setConversations(prevConversations => {
      // same conversation or not
      let sameConversation = false 
      const newMessage = {sender, text}
      const newConversations = prevConversations.map
      (
        conversation => {
          if(sameArray(conversation.recipients, recipients))
          {
            sameConversation = true
            return {...conversation, messages:[...conversation.messages,newMessage]}
          }
          return conversation
        }
      ) 
      if(sameConversation){
        return newConversations
      }else{
        return [...prevConversations, {recipients, messages:[newMessage]}]
      }
    })
  }, [setConversations])

  function sendMessage(recipients, text){
    socket.emit('send-message', { recipients, text })
    addMessagesToConversation({recipients, text, sender:id})
  }

  useEffect( () => {
    if (socket == null) return 

    socket.on('receive-message', addMessagesToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessagesToConversation])
  

  const formattedConversations = conversations.map((conversation, index) => {
    
    const recipients = conversation.recipients.map(recipient => {
      const IdIncontact = contacts.find(contact => contact.id === recipient)
      const name = (IdIncontact && IdIncontact.name) || recipient
      return {id:recipient, name}
    }) 

    const messages = conversation.messages.map(message => {
      const IdIncontact = contacts.find(contact => contact.id === message.sender)
      const name = (IdIncontact && IdIncontact.name) || message.sender
      const fromMe = id === message.sender
      return {...message, senderName:name, fromMe}
      })

    const selected = index === selectedConversationIndex

    return {...conversation, recipients, messages, selected}
  })
   
  const value = {
    conversations:formattedConversations,
    createConversation,
    sendMessage,
    selectConversationByIndex: setselectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex]
    
  }

  return (
    <ConversationsContext.Provider value={ value }>
      {children}
    </ConversationsContext.Provider>
  )
}

function sameArray(arrayA, arrayB){
  if(arrayA.length !== arrayB.length) return false 

  arrayA.sort() 
  arrayB.sort()

  return arrayA.every((element, index) => {
    return element === arrayB[index]
  })
}