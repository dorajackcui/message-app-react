import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import {useConversations} from '../context/ConversationsProvider'

export default function Dashboard({id}) {
  const {selectedConversation} = useConversations()

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
