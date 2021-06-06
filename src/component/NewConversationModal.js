import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationsProvider'


export default function NewConversationModal({closeModal}) {

  const { contacts } = useContacts()
  const { createConversation } = useConversations()
  const [selectedContactsIds, setSelectedContactsIds] = useState([])
  

  function handlesubmit(e){
    e.preventDefault()
    createConversation(selectedContactsIds)
    closeModal()
  }

  function handleCheckboxChange(contactId){
    setSelectedContactsIds(prev => {
      if(prev.includes(contactId)){
        return prev.filter(prevId => prevId !==contactId)
      }else{
        return [...prev, contactId]
      }
    })
  }

  return (
    <div>
      <Modal.Header >
        Create Conversation
        <Button className='btn-close' onClick={()=>closeModal()}/>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlesubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={()=>handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type='submit' className='mt-2'>Create</Button>
        </Form>
      </Modal.Body>
      
    </div>
  )
}
