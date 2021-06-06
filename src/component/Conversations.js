import React from 'react'
import {useConversations} from '../context/ConversationsProvider'
import {ListGroup} from 'react-bootstrap'

export default function Conversations() {
  const {conversations, selectConversationByIndex} = useConversations()
  
  
  return (
    <>
    
    <ListGroup variant='flush'>
      {conversations.map((conversation, index) => (
        <ListGroup.Item 
          key={index}
          action
          onClick={()=> selectConversationByIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map(r => r.name).join(',')}
        </ListGroup.Item>
      ))}
    </ListGroup>
    </>

  )
}
