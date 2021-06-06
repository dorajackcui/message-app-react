import React from 'react'
import {ListGroup } from 'react-bootstrap'
import {useContacts} from '../context/ContactsProvider'

export default function Contacts() {
  let { contacts } = useContacts()
  // console.log(typeof(contacts))

  return (
  
    <ListGroup variant='flush'>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  
  )
}
