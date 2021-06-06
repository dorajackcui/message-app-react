import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid' 

export default function Login({onIdSubmit}) {
  const idRef = useRef()

  function handleSubmit(e){
    e.preventDefault()

    onIdSubmit(idRef.current.value)
  }

  function createNewId(){
    onIdSubmit(uuidv4())
  }

  return (
    <Container className='align-items-center d-flex' style={{ height:'80vh' }}>
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label> Enter Your ID </Form.Label>
          <Form.Control type='text' ref={idRef} required />
        </Form.Group>
        <Button type='submit' className='me-1 mt-1'>Login</Button>
        <Button onClick={createNewId} variant='secondary' className='ms-1 mt-1'>Create A New ID</Button>
      </Form>
    </Container>
  )
}
